import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import xss from 'xss-clean';
import getNanoId from '../src/utils/nanoid.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = join(__dirname, 'forms', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Security Middleware
app.use(helmet()); // Set security headers
app.use(xss()); // Sanitize inputs
app.use(hpp()); // Protect against HTTP Parameter Pollution attacks

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://kaurtravels.es']
    : ['http://localhost:5173'],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  credentials: true,
  maxAge: 600 // Cache preflight requests for 10 minutes
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10kb' })); // Limit body size
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

// Function to log messages
function logMessage(filename, level, message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${message}\n`;
  fs.appendFileSync(join(logsDir, filename), logEntry);
}

// CSRF Protection
app.use((req, res, next) => {
  if (req.method === 'POST') {
    const csrfToken = getNanoId();
    res.cookie('XSRF-TOKEN', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    res.locals.csrfToken = csrfToken;
  }
  next();
});

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.VITE_SMTP_HOST,
  port: parseInt(process.env.VITE_SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.VITE_SMTP_USER,
    pass: process.env.VITE_SMTP_PASS
  }
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
    logMessage('email.log', 'ERROR', `SMTP connection error: ${error.message}`);
  } else {
    console.log('SMTP server is ready to send emails');
    logMessage('email.log', 'INFO', 'SMTP server is ready to send emails');
  }
});

// Form submission validation middleware
const validateFormSubmission = (req, res, next) => {
  const { email, subject } = req.body;
  
  if (!email || !subject) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format'
    });
  }

  next();
};

// Email sending endpoint with validation
app.post('/api/forms/send-email', validateFormSubmission, async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    logMessage('email.log', 'INFO', `Email request received for: ${to}, subject: ${subject}`);

    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Always add admin email as CC to ensure receipt
    const adminEmail = process.env.VITE_SMTP_USER;

    const mailOptions = {
      from: `${process.env.VITE_SMTP_FROM_NAME} <${process.env.VITE_SMTP_USER}>`,
      to,
      cc: adminEmail,
      bcc: adminEmail,
      subject,
      html,
      replyTo: process.env.VITE_SMTP_USER,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'X-Mailer': 'Kaur Travel Mailer'
      }
    };

    const info = await transporter.sendMail(mailOptions);
    
    logMessage('email.log', 'INFO', `Email sent successfully: ${info.messageId}`);
    
    return res.json({
      success: true,
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Email sending error:', error);
    logMessage('email.log', 'ERROR', `Email sending error: ${error.message}`);
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send email'
    });
  }
});

// Form handlers with validation
app.post('/api/forms/contact', validateFormSubmission, (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    logMessage('contact.log', 'INFO', `Contact form submission received: ${email}, subject: ${subject}`);
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Additional validation can be added here
    
    return res.json({
      success: true,
      message: 'Contact form processed successfully',
      formId: getNanoId()
    });
  } catch (error) {
    console.error('Contact form error:', error);
    logMessage('contact.log', 'ERROR', `Contact form error: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred'
    });
  }
});

app.post('/api/forms/air-ticket', validateFormSubmission, (req, res) => {
  try {
    const { firstName, lastName, email, tripType } = req.body;
    
    logMessage('air_ticket.log', 'INFO', `Air ticket form submission received: ${email}, trip type: ${tripType}`);
    
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    return res.json({
      success: true,
      message: 'Air ticket form processed successfully',
      formId: getNanoId()
    });
  } catch (error) {
    console.error('Air ticket form error:', error);
    logMessage('air_ticket.log', 'ERROR', `Air ticket form error: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred'
    });
  }
});

app.post('/api/forms/air-claim', validateFormSubmission, (req, res) => {
  try {
    const { firstName, lastName, email, flightNumber } = req.body;
    
    logMessage('air_claim.log', 'INFO', `Air claim form submission received: ${email}, flight number: ${flightNumber}`);
    
    if (!firstName || !lastName || !email || !flightNumber) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    return res.json({
      success: true,
      message: 'Air claim form processed successfully',
      formId: getNanoId()
    });
  } catch (error) {
    console.error('Air claim form error:', error);
    logMessage('air_claim.log', 'ERROR', `Air claim form error: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  logMessage('server.log', 'INFO', `Server started on port ${PORT}`);
});