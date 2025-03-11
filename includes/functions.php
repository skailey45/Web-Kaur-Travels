<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Security Functions
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function generate_csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verify_csrf_token($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// Email Functions
function send_email($to, $subject, $body) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = SMTP_PORT;

        $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
        $mail->addAddress($to);
        
        // Always add no-reply@kaurtravels.es as BCC for all emails
        $mail->addBCC('no-reply@kaurtravels.es');

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Email Error: {$mail->ErrorInfo}");
        return false;
    }
}

// Amadeus API Functions
function get_amadeus_token() {
    $curl = curl_init();
    
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://test.api.amadeus.com/v1/security/oauth2/token",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'grant_type' => 'client_credentials',
            'client_id' => AMADEUS_CLIENT_ID,
            'client_secret' => AMADEUS_CLIENT_SECRET
        ]),
        CURLOPT_HTTPHEADER => [
            "Content-Type: application/x-www-form-urlencoded"
        ]
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        error_log("Amadeus Token Error: $err");
        return null;
    }

    $result = json_decode($response, true);
    return $result['access_token'] ?? null;
}

function search_airports($keyword) {
    if (strlen($keyword) < 2) {
        return [];
    }

    $token = get_amadeus_token();
    if (!$token) {
        return [];
    }

    $curl = curl_init();
    
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://test.api.amadeus.com/v1/reference-data/locations?keyword=" . urlencode($keyword) . "&subType=AIRPORT&page[limit]=10&view=LIGHT",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer $token"
        ]
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        error_log("Amadeus Search Error: $err");
        return [];
    }

    $result = json_decode($response, true);
    return $result['data'] ?? [];
}

// Form Processing Functions
function process_air_ticket_form($data) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO air_ticket_requests (
                first_name, last_name, email, phone,
                trip_type, from_airport, to_airport,
                departure_date, return_date, baggage,
                adult_count, child_count, infant_count,
                status, created_at
            ) VALUES (
                :first_name, :last_name, :email, :phone,
                :trip_type, :from_airport, :to_airport,
                :departure_date, :return_date, :baggage,
                :adult_count, :child_count, :infant_count,
                'pending', NOW()
            )
        ");

        $stmt->execute([
            'first_name' => $data['firstName'],
            'last_name' => $data['lastName'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'trip_type' => $data['tripType'],
            'from_airport' => $data['fromAirport'],
            'to_airport' => $data['toAirport'],
            'departure_date' => $data['departureDate'],
            'return_date' => $data['returnDate'],
            'baggage' => $data['baggage'],
            'adult_count' => $data['passengerCounts']['adult'],
            'child_count' => $data['passengerCounts']['child'],
            'infant_count' => $data['passengerCounts']['infant']
        ]);

        $requestId = $pdo->lastInsertId();
        
        // Send confirmation email
        $emailBody = include __DIR__ . '/../email_templates/air_ticket_confirmation.php';
        send_email($data['email'], 'Flight Quote Request Received', $emailBody);
        
        // Also send notification to admin
        send_email('no-reply@kaurtravels.es', 'New Flight Quote Request', $emailBody);
        
        return ['success' => true, 'request_id' => $requestId];
    } catch (PDOException $e) {
        error_log("Air Ticket Form Error: " . $e->getMessage());
        return ['success' => false, 'error' => 'Database error occurred'];
    }
}

function process_air_claim_form($data) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO air_claims (
                first_name, last_name, email, phone,
                flight_number, departure_airport, arrival_airport,
                flight_date, issue_type, description,
                booking_reference, status, created_at
            ) VALUES (
                :first_name, :last_name, :email, :phone,
                :flight_number, :departure_airport, :arrival_airport,
                :flight_date, :issue_type, :description,
                :booking_reference, 'pending', NOW()
            )
        ");

        $stmt->execute([
            'first_name' => $data['firstName'],
            'last_name' => $data['lastName'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'flight_number' => $data['flightNumber'],
            'departure_airport' => $data['departureAirport'],
            'arrival_airport' => $data['arrivalAirport'],
            'flight_date' => $data['flightDate'],
            'issue_type' => $data['issueType'],
            'description' => $data['description'],
            'booking_reference' => $data['bookingReference']
        ]);

        $claimId = $pdo->lastInsertId();
        
        // Send confirmation email
        $emailBody = include __DIR__ . '/../email_templates/air_claim_confirmation.php';
        send_email($data['email'], 'Flight Claim Request Received', $emailBody);
        
        // Also send notification to admin
        send_email('no-reply@kaurtravels.es', 'New Flight Claim Request', $emailBody);
        
        return ['success' => true, 'claim_id' => $claimId];
    } catch (PDOException $e) {
        error_log("Air Claim Form Error: " . $e->getMessage());
        return ['success' => false, 'error' => 'Database error occurred'];
    }
}

function process_contact_form($data) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO contact_messages (
                name, email, phone, subject,
                message, status, created_at
            ) VALUES (
                :name, :email, :phone, :subject,
                :message, 'unread', NOW()
            )
        ");

        $stmt->execute([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'subject' => $data['subject'],
            'message' => $data['message']
        ]);

        $messageId = $pdo->lastInsertId();
        
        // Send confirmation email
        $emailBody = include __DIR__ . '/../email_templates/contact_confirmation.php';
        send_email($data['email'], 'Message Received', $emailBody);
        
        // Also send notification to admin
        send_email('no-reply@kaurtravels.es', 'New Contact Form Submission', $emailBody);
        
        return ['success' => true, 'message_id' => $messageId];
    } catch (PDOException $e) {
        error_log("Contact Form Error: " . $e->getMessage());
        return ['success' => false, 'error' => 'Database error occurred'];
    }
}