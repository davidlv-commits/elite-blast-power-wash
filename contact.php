<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
    exit;
}

$honeypot = trim((string) ($_POST['company'] ?? ''));
if ($honeypot !== '') {
    echo json_encode(['ok' => true, 'message' => 'Request sent.']);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$service = trim((string) ($_POST['service'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$turnstileToken = trim((string) ($_POST['cf-turnstile-response'] ?? ''));

if ($name === '' || $phone === '' || $email === '' || $service === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please complete all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$turnstileSecret = getenv('ELITEBLAST_TURNSTILE_SECRET_KEY') ?: '';
if ($turnstileSecret !== '') {
    if ($turnstileToken === '') {
        http_response_code(422);
        echo json_encode(['ok' => false, 'message' => 'Please complete the anti-spam check.']);
        exit;
    }

    $verification = file_get_contents(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        false,
        stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => http_build_query([
                    'secret' => $turnstileSecret,
                    'response' => $turnstileToken,
                    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
                ]),
                'timeout' => 10,
            ],
        ])
    );

    $verificationData = json_decode($verification ?: '{}', true);
    if (!is_array($verificationData) || empty($verificationData['success'])) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'message' => 'Anti-spam validation failed.']);
        exit;
    }
}

$to = 'eliteblastpowerwashllc@gmail.com';
$subject = 'New estimate request - Elite Blast Power Wash';
$safeName = preg_replace('/[\r\n]+/', ' ', $name) ?? $name;
$safePhone = preg_replace('/[\r\n]+/', ' ', $phone) ?? $phone;
$safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

$body = implode("\n", [
    'New website estimate request',
    '',
    'Name: ' . $safeName,
    'Phone: ' . $safePhone,
    'Email: ' . $safeEmail,
    'Service: ' . $service,
    '',
    'Message:',
    $message,
]);

$headers = [
    'From: Elite Blast Power Wash <no-reply@eliteblast.pro>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Unable to send your request right now.']);
    exit;
}

$copySubject = 'We received your request - Elite Blast Power Wash';
$copyBody = implode("\n", [
    'Hi ' . $safeName . ',',
    '',
    'We received your estimate request for: ' . $service,
    'Phone: ' . $safePhone,
    'Email: ' . $safeEmail,
    '',
    'Your message:',
    $message,
    '',
    'We will get back to you soon.',
    'Elite Blast Power Wash',
    '(201) 589-7668',
]);

$copyHeaders = [
    'From: Elite Blast Power Wash <no-reply@eliteblast.pro>',
    'Reply-To: Elite Blast Power Wash <eliteblastpowerwashllc@gmail.com>',
    'Content-Type: text/plain; charset=UTF-8',
];

mail($safeEmail, $copySubject, $copyBody, implode("\r\n", $copyHeaders));

echo json_encode(['ok' => true, 'message' => 'Request sent successfully.']);
