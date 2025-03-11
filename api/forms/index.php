<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://kaurtravels.es');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 3600');

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

// Create logs directory if it doesn't exist
if (!file_exists(__DIR__ . '/logs')) {
    mkdir(__DIR__ . '/logs', 0755, true);
}

// Function to log messages
function logMessage($level, $message) {
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$level] $message" . PHP_EOL;
    file_put_contents(__DIR__ . '/logs/email.log', $logEntry, FILE_APPEND);
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the request path
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = trim(str_replace('/api/forms/', '', $path), '/');

// Log the request
logMessage('INFO', "API Request: " . $path);

// Route to appropriate handler
switch ($path) {
    case 'send-email':
        include 'send-email.php';
        break;
    case 'send-email-fallback':
        include 'send-email-fallback.php';
        break;
    case 'contact':
        include 'contact.php';
        break;
    case 'air-ticket':
        include 'air-ticket.php';
        break;
    case 'air-claim':
        include 'air-claim.php';
        break;
    default:
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error' => 'Endpoint not found'
        ]);
}