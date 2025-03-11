import { format } from 'date-fns';
import { emailStyles, inlineStyle } from './styles';

interface Airport {
  iataCode: string;
  name: string;
  cityName: string;
  countryName: string;
}

interface FlightSegment {
  from: Airport;
  to: Airport;
  date: Date;
}

interface PassengerCounts {
  adult: number;
  child: number;
  infant: number;
}

interface AirTicketEmailData {
  tripType: 'roundTrip' | 'oneWay' | 'multiCity';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fromAirport?: Airport;
  toAirport?: Airport;
  departureDate?: Date;
  returnDate?: Date;
  flightSegments?: FlightSegment[];
  passengerCounts: PassengerCounts;
  baggage: string;
}

export const generateAirTicketEmail = (data: AirTicketEmailData): string => {
  const formatDate = (date: Date) => format(date, 'MMMM d, yyyy');
  const formatLocation = (airport: Airport) => `${airport.cityName} (${airport.iataCode}), ${airport.countryName}`;

  const getTotalPassengers = () => {
    return data.passengerCounts.adult + data.passengerCounts.child + data.passengerCounts.infant;
  };

  const getBaggageText = () => {
    switch (data.baggage) {
      case '1': return '1 bag (23kg)';
      case '2': return '2 bags (23kg each)';
      case '3': return '3 bags (23kg each)';
      default: return 'No checked baggage';
    }
  };

  const getFlightDetailsHtml = () => {
    if (data.tripType === 'multiCity' && data.flightSegments) {
      return `
        <div style="${inlineStyle(emailStyles.section)}">
          <h3 style="${inlineStyle(emailStyles.sectionTitle)}">Flight Segments</h3>
          ${data.flightSegments.map((segment, index) => `
            <div style="${inlineStyle(emailStyles.infoBox)}">
              <div style="${inlineStyle(emailStyles.badge)}">Flight ${index + 1}</div>
              <div style="margin-top: 15px;">
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">From</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${formatLocation(segment.from)}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">To</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${formatLocation(segment.to)}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Date</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${formatDate(segment.date)}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      return `
        <div style="${inlineStyle(emailStyles.section)}">
          <h3 style="${inlineStyle(emailStyles.sectionTitle)}">Flight Details</h3>
          <div style="${inlineStyle(emailStyles.infoBox)}">
            <div style="${inlineStyle(emailStyles.badge)}">${data.tripType === 'roundTrip' ? 'Round Trip' : 'One Way'}</div>
            <div style="margin-top: 15px;">
              <div style="${inlineStyle(emailStyles.infoRow)}">
                <span style="${inlineStyle(emailStyles.infoLabel)}">From</span>
                <span style="${inlineStyle(emailStyles.infoValue)}">${formatLocation(data.fromAirport!)}</span>
              </div>
              <div style="${inlineStyle(emailStyles.infoRow)}">
                <span style="${inlineStyle(emailStyles.infoLabel)}">To</span>
                <span style="${inlineStyle(emailStyles.infoValue)}">${formatLocation(data.toAirport!)}</span>
              </div>
              <div style="${inlineStyle(emailStyles.infoRow)}">
                <span style="${inlineStyle(emailStyles.infoLabel)}">Departure</span>
                <span style="${inlineStyle(emailStyles.infoValue)}">${formatDate(data.departureDate!)}</span>
              </div>
              ${data.tripType === 'roundTrip' && data.returnDate ? `
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Return</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${formatDate(data.returnDate)}</span>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Flight Quote Request</title>
      </head>
      <body style="${inlineStyle(emailStyles.container)}">
        <div style="${inlineStyle(emailStyles.wrapper)}">
          <div style="${inlineStyle(emailStyles.header)}">
            <div style="${inlineStyle(emailStyles.logo)}">
              <img src="https://kaurtravels.es/kaur.svg" alt="Kaur Travels" style="max-width: 120px;">
            </div>
            <h1 style="${inlineStyle(emailStyles.title)}">Flight Quote Request</h1>
            <p style="${inlineStyle(emailStyles.subtitle)}">Thank you for choosing Kaur Travels</p>
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

            ${getFlightDetailsHtml()}

            <div style="${inlineStyle(emailStyles.section)}">
              <h3 style="${inlineStyle(emailStyles.sectionTitle)}">Travel Details</h3>
              <div style="${inlineStyle(emailStyles.infoBox)}">
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Total Passengers</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${getTotalPassengers()}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Adults</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.passengerCounts.adult}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Children</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.passengerCounts.child}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Infants</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${data.passengerCounts.infant}</span>
                </div>
                <div style="${inlineStyle(emailStyles.infoRow)}">
                  <span style="${inlineStyle(emailStyles.infoLabel)}">Baggage</span>
                  <span style="${inlineStyle(emailStyles.infoValue)}">${getBaggageText()}</span>
                </div>
              </div>
            </div>

            <div style="${inlineStyle(emailStyles.alert)}">
              Our team will process your request and get back to you shortly with the best available options.
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