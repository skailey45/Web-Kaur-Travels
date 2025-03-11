# Deployment Guide for Shared Web Hosting (OVH)

This guide will help you deploy the Kaur Travel website to your OVH shared web hosting environment.

## Prerequisites

- OVH shared web hosting account
- FTP access to your hosting account
- Domain name configured to point to your hosting
- PHP 7.4 or higher with nodemailer support

## Build Process

1. First, build the React application:

```bash
npm run build
```

This will create a `dist` folder with all the static assets.

## Deployment Steps

### 1. Prepare Your Files

Make sure you have the following structure ready for upload:

```
├── dist/               # React build output (all static files)
├── api/                # Server-side code
│   ├── forms/          # Form handling scripts
│   │   ├── logs/       # Log directory (create if not exists)
│   ├── server.js       # Node.js server
│   └── .htaccess       # API routing rules
├── .htaccess           # Main .htaccess for routing
├── .env                # Environment variables (SMTP settings)
└── kaur.svg            # Logo file
```

### 2. Upload Files via FTP

1. Connect to your OVH hosting using FTP credentials
2. Upload all files to the root directory of your website (usually `www` or `public_html`)
3. Make sure to preserve the directory structure

### 3. Configure PHP and Node.js

1. Make sure your OVH hosting supports Node.js
2. If Node.js is not available, you can use the PHP fallback scripts included in the project
3. Set up environment variables in your hosting control panel or in the `.env` file

### 4. Set File Permissions

Set the correct permissions for your files:
- HTML/CSS/JS files: 644
- Directories: 755
- PHP files: 644
- Log directories: 755

```bash
# Example commands if you have SSH access
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
chmod -R 755 api/forms/logs
```

### 5. Configure the Server

#### Option 1: Using Node.js (if available on your hosting)

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run server
```

3. Set up a process manager like PM2 to keep the server running:
```bash
npm install -g pm2
pm2 start api/server.js
pm2 save
pm2 startup
```

#### Option 2: Using PHP Fallback (if Node.js is not available)

The PHP scripts in the `api/forms` directory will handle form submissions and email sending.

### 6. Test the Deployment

1. Visit your website URL to ensure the frontend loads correctly
2. Test the contact forms to verify the API endpoints are working
3. Check that emails are being sent correctly
4. Check the log files in `api/forms/logs` for any errors

## Troubleshooting

### Email Issues

If emails are not being sent:

1. Check the log files in `api/forms/logs` directory
2. Verify SMTP settings in your `.env` file match OVH's requirements
3. Make sure the `api/forms/logs` directory is writable
4. Try using the fallback email method by calling `/api/forms/send-email-fallback`

### API Endpoint Issues

If API endpoints return 404:

1. Check that the `.htaccess` files are properly uploaded
2. Verify that mod_rewrite is enabled on your hosting
3. Contact OVH support if you need to enable specific Apache modules

### CORS Issues

If you encounter CORS errors:

1. Check the `.htaccess` files to ensure CORS headers are properly set
2. Update the `Access-Control-Allow-Origin` header to match your domain

## Maintenance

- Regularly check the log files in `api/forms/logs` for any errors
- Keep your dependencies updated for security patches
- Consider setting up a backup schedule for your website files

## Support

If you encounter any issues with the deployment, please contact:
- Email: web@kaurtravels.es
- Phone: +34 663 462 268