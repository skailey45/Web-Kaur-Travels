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

// Define log directory
$logDir = __DIR__ . '/logs';

// Create logs directory if it doesn't exist
if (!file_exists($logDir)) {
    mkdir($logDir, 0755, true);
}

// Set error log to the logs directory
ini_set('error_log', $logDir . '/contact_error.log');

// Function to log messages
function logMessage($level, $message) {
    global $logDir;
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$level] $message" . PHP_EOL;
    file_put_contents($logDir . '/contact.log', $logEntry, FILE_APPEND);
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
logMessage('INFO', "Contact form submission received: " . $input);

// Validate required fields
if (!isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
    logMessage('ERROR', "Missing required fields in contact form");
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required fields'
    ]);
    exit();
}

// Process the form data
logMessage('INFO', "Processing contact form for: " . $data['email']);

// Send notification email to admin
$admin_email = 'no-reply@kaurtravels.es';
$admin_subject = "[CONTACT FORM] " . $data['subject'];
$admin_message = "
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> " . htmlspecialchars($data['name']) . "</p>
    <p><strong>Email:</strong> " . htmlspecialchars($data['email']) . "</p>
    <p><strong>Phone:</strong> " . (isset($data['phone']) ? htmlspecialchars($data['phone']) : 'Not provided') . "</p>
    <p><strong>Subject:</strong> " . htmlspecialchars($data['subject']) . "</p>
									
    <p><strong>Message:</strong> " . nl2br(htmlspecialchars($data['message'])) . "</p>
";

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: Kaur Travel <no-reply@kaurtravels.es>',
    'Reply-To: ' . $data['email'],
    'X-Mailer: PHP/' . phpversion()
];

$admin_success = mail($admin_email, $admin_subject, $admin_message, implode("\r\n", $headers));

if ($admin_success) {
    logMessage('INFO', "Contact form notification sent to admin: $admin_email");
} else {
    logMessage('ERROR', "Failed to send contact form notification to admin");
}

// Return success response
echo json_encode([
    'success' => true,
    'message' => 'Contact form processed successfully'
]);
  

