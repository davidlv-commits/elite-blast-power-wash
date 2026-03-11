<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$siteKey = getenv('ELITEBLAST_TURNSTILE_SITE_KEY') ?: '';

echo json_encode([
    'enabled' => $siteKey !== '',
    'siteKey' => $siteKey,
]);
