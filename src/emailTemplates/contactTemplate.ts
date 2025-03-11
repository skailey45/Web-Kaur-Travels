import { emailStyles, inlineStyle } from './styles';

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const generateContactEmail = (data: ContactEmailData): string => {
  const getSubjectText = () => {
    switch (data.subject) {
      case 'booking': return 'New Booking';
      case 'support': return 'Travel Support';
      case 'partnership': return 'Business Partnership';
      case 'feedback': return 'Feedback';
      default: return 'Other';
    }
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
      </head>
      <body style="${inlineStyle(emailStyles.container)}">
        <div style="${inlineStyle(emailStyles.wrapper)}">
          <div style="${inlineStyle(emailStyles.header)}">
            <div style="${inlineStyle(emailStyles.logo)}">
              <img src="https://kaurtravels.es/kaur.svg" alt="Kaur Travels" style="max-width: 120px;">
            </div>
            <h1 style="${inlineStyle(emailStyles.title)}">Contact Form Submission</h1>
            <p style="${inlineStyle(emailStyles.subtitle)}">Thank you for reaching out to us</p>
          </div>

          <div style="${inlineStyle(emailStyles.content)}">
            <div style="${inlineStyle(emailStyles.section)}">
              <h3 style="${inlineStyle(emailStyles.sectionTitle)}">Contact Information</h3>
              <div style="${inlineStyle(emailStyles.infoBox)}">
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Name</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.name}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Email</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.email}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Phone</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.phone}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Subject</span>
                  <span style="${inlineStyle(emailStyles.badge)}">${getSubjectText()}</span>
                </div>
              </div>
            </div>

            <div style="${inlineStyle(emailStyles.section)}">
              <h3 style="${inlineStyle(emailStyles.sectionTitle)}">Message</h3>
              <div style="${inlineStyle(emailStyles.infoBox)}">
                <p style="margin: 0; color: #4b5563; line-height: 1.6;">${data.message}</p>
              </div>
            </div>

            <div style="${inlineStyle(emailStyles.alert)}">
              We will respond to your inquiry as soon as possible.
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="https://kaurtravels.es/contact" style="${inlineStyle(emailStyles.button)}">
                Contact Us
              </a>
            </div>
            
            <div style="${inlineStyle(emailStyles.companyInfo)}">
              <p>Kaur Travels S.L: B7584534 | Tourism License: FUE-2025-04349245</p>
              <p>C/Martorell 19, 08904 Spain, Barcelona</p>
              <p>Email: contact@kaurtravels.es | Phone: +34 663 462 268</p>
            </div>
          </div>

          <div style="${inlineStyle(emailStyles.footer)}">
            <p style="${inlineStyle(emailStyles.footerText)}">
              © ${new Date().getFullYear()} Kaur Travels. All rights reserved.
            </p>
            <p style="${inlineStyle(emailStyles.footerText)}">
              <a href="https://kaurtravels.es/privacy" style="${inlineStyle(emailStyles.footerLink)}">Privacy Policy</a> |
              <a href="https://kaurtravels.es/terms" style="${inlineStyle(emailStyles.footerLink)}">Terms of Service</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};