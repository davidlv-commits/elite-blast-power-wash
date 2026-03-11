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
$email = trim((string) ($_POST['email'] ?? ''));
$service = trim((string) ($_POST['service'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $service === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please complete all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$to = 'eliteblastpowerwashllc@gmail.com';
$subject = 'New estimate request - Elite Blast Power Wash';
$safeName = preg_replace('/[\r\n]+/', ' ', $name) ?? $name;
$safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

$body = implode("\n", [
    'New website estimate request',
    '',
    'Name: ' . $safeName,
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

echo json_encode(['ok' => true, 'message' => 'Request sent successfully.']);
