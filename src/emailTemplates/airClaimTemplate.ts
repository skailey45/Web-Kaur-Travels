import { emailStyles, inlineStyle } from './styles';

interface AirClaimEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  flightDate: Date;
  issueType: string;
  description: string;
  bookingReference: string;
}

export const generateAirClaimEmail = (data: AirClaimEmailData): string => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getIssueTypeText = () => {
    switch (data.issueType) {
      case 'delay': return 'Flight Delay';
      case 'cancellation': return 'Flight Cancellation';
      case 'denied-boarding': return 'Denied Boarding';
      case 'baggage': return 'Baggage Issue';
      default: return 'Other';
    }
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Flight Claim Request</title>
      </head>
      <body style="${inlineStyle(emailStyles.container)}">
        <div style="${inlineStyle(emailStyles.wrapper)}">
          <div style="${inlineStyle(emailStyles.header)}">
            <div style="${inlineStyle(emailStyles.logo)}">
              <img src="https://kaurtravels.es/kaur.svg" alt="Kaur Travels" style="max-width: 120px;">
            </div>
            <h1 style="${inlineStyle(emailStyles.title)}">Flight Claim Request</h1>
            <p style="${inlineStyle(emailStyles.subtitle)}">We're here to help with your claim</p>
          </div>

          <div style="${inlineStyle(emailStyles.content)}">
            <div style="${inlineStyle(emailStyles.section)}">
              <h3 style="${inlineStyle(emailStyles.sectionTitle)}">Personal Information</h3>
              <div style="${inlineStyle(emailStyles.infoBox)}">
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Name</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.firstName} ${data.lastName}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Email</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.email}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Phone</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.phone}</span>
                </div>
              </div>
            </div>

            <div style="${inlineStyle(emailStyles.section)}">
              <h3 style="${inlineStyle(emailStyles.sectionTitle)}">Flight Information</h3>
              <div style="${inlineStyle(emailStyles.infoBox)}">
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Flight Number</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.flightNumber}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">From</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.departureAirport}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">To</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.arrivalAirport}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Date</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${formatDate(data.flightDate)}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Booking Reference</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.bookingReference}</span>
                </div>
              </div>
            </div>

            <div style="${inlineStyle(emailStyles.section)}">
              <h3 style="${inlineStyle(emailStyles.sectionTitle)}">Claim Details</h3>
              <div style="${inlineStyle(emailStyles.infoBox)}">
                <div style="${inlineStyle(emailStyles.badge)}">${getIssueTypeText()}</div>
                <div style="margin-top: 15px;">
                  <strong style="color: #1f2937;">Description:</strong>
                  <p style="margin: 10px 0; color: #4b5563;">${data.description}</p>
                </div>
              </div>
            </div>

            <div style="${inlineStyle(emailStyles.success)}">
              Our claims team will review your case and contact you within 48 hours.
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