<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://kaurtravels.es');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 3600');

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Create logs directory if it doesn't exist
if (!file_exists(__DIR__ . '/logs')) {
    mkdir(__DIR__ . '/logs', 0755, true);
}

// Function to log messages
function logMessage($level, $message) {
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$level] $message" . PHP_EOL;
    error_log($logEntry, 3, __DIR__ . '/logs/air_ticket.log');
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get JSON data from request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Log the incoming request
logMessage('INFO', "Air ticket form submission received: " . $input);

// Validate required fields
if (!isset($data['firstName']) || !isset($data['lastName']) || !isset($data['email'])) {
    http_response_code(400);
    echo json_encode(array(
        'success' => false,
        'error' => 'Missing required fields'
    ));
    exit();
}

// Process the form data
logMessage('INFO', "Processing air ticket form for: " . $data['email']);

// Send notification email to admin
$admin_email = 'no-reply@kaurtravels.es';
$admin_subject = "[AIR TICKET] Request from " . $data['firstName'] . " " . $data['lastName'];
$admin_message = "
    <h2>New Air Ticket Request</h2>
    <p><strong>Name:</strong> " . $data['firstName'] . " " . $data['lastName'] . "</p>
    <p><strong>Email:</strong> " . $data['email'] . "</p>
    <p><strong>Phone:</strong> " . ($data['phone'] ?? 'Not provided') . "</p>
    <p><strong>Trip Type:</strong> " . ($data['tripType'] ?? 'Not provided') . "</p>
    <p><strong>Full Request:</strong></p>
    <pre style='background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto;'>" . json_encode($data, JSON_PRETTY_PRINT) . "</pre>
";

$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: Kaur Travels <no-reply@kaurtravels.es>',
    'Reply-To: ' . $data['email'],
    'X-Mailer: PHP/' . phpversion()
);

$admin_success = mail($admin_email, $admin_subject, $admin_message, implode("\r\n", $headers));

if ($admin_success) {
    logMessage('INFO', "Air ticket form notification sent to admin: $admin_email");
} else {
    logMessage('ERROR', "Failed to send air ticket form notification to admin");
}

// Return success response
echo json_encode(array(
    'success' => true,
    'message' => 'Air ticket form processed successfully'
));