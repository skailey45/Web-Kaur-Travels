<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://kaurtravel.es');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 3600');

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/email_fallback_error.log');

// Create logs directory if it doesn't exist
if (!file_exists(__DIR__ . '/logs')) {
    mkdir(__DIR__ . '/logs', 0755, true);
}

// Function to log messages
function logMessage($level, $message) {
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$level] $message" . PHP_EOL;
    file_put_contents(__DIR__ . '/logs/email_fallback.log', $logEntry, FILE_APPEND);
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get JSON data from request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Log the incoming request for debugging
logMessage('INFO', "Email fallback request received: " . $input);

// Validate required fields
if (!isset($data['to']) || !isset($data['subject']) || !isset($data['html'])) {
    logMessage('ERROR', "Missing required fields in request");
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required fields'
    ]);
    exit();
}

// Configure email settings
$to = $data['to'];
$subject = $data['subject'];
$message = $data['html'];

// Always add admin email as CC to ensure receipt
$admin_email = 'web@kaurtravel.es';

// Set headers with proper line endings
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: Kaur Travel <web@kaurtravel.es>',
    'Reply-To: web@kaurtravel.es',
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 1 (Highest)',
    'X-MSMail-Priority: High',
    'Importance: High'
];

// Add CC to admin - this ensures you receive a copy
$headers[] = 'Cc: ' . $admin_email;
// Also add BCC as a backup
$headers[] = 'Bcc: ' . $admin_email;

// Additional parameters for mail function
$additional_parameters = '-f web@kaurtravel.es';

logMessage('INFO', "Attempting to send email via fallback to: $to, subject: $subject, with CC to: $admin_email");

// Try to send email using PHP's mail function with additional parameters
$success = mail($to, $subject, $message, implode("\r\n", $headers), $additional_parameters);

if ($success) {
    logMessage('INFO', "Email sent successfully via fallback to: $to with CC to admin");
    echo json_encode([
        'success' => true,
        'messageId' => md5(uniqid(time())),
        'method' => 'fallback'
    ]);
} else {
    $error = error_get_last();
    logMessage('ERROR', "Failed to send email via fallback to: $to. Error: " . ($error ? json_encode($error) : 'Unknown error'));
    
    // Try one last time directly to admin
    $admin_success = mail($admin_email, "[URGENT COPY] " . $subject, $message, implode("\r\n", $headers), $additional_parameters);
    
    if ($admin_success) {
        logMessage('INFO', "Copy of email sent directly to admin: $admin_email");
        // Return success even though the main email failed
        echo json_encode([
            'success' => true,
            'messageId' => md5(uniqid(time())),
            'method' => 'admin_only',
            'note' => 'Email sent to admin only'
        ]);
    } else {
        logMessage('ERROR', "Failed to send copy to admin email");
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to send email via all methods',
            'details' => $error ? $error['message'] : 'Unknown error'
        ]);
    }
}