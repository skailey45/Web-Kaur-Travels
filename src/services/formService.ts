import axios from 'axios';
import { sendMail } from './mailService';
import { generateAirTicketEmail, generateAirClaimEmail, generateContactEmail } from '../emailTemplates';
import { Airport } from './amadeusService';

interface FormResponse {
  success: boolean;
  error?: string;
  errors?: Array<{msg: string, param: string}>;
  data?: any;
}

// API endpoint configuration
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || '/api/forms';

export const submitContactForm = async (formData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<FormResponse> => {
  try {
    console.log("Processing contact form for:", formData.email);
    
    const response = await axios.post(`${API_ENDPOINT}/contact`, formData);
    
    if (response.data && response.data.success) {
      // Generate email HTML
      const emailHtml = generateContactEmail(formData);
      
      // Send confirmation email to user
      const emailResult = await sendMail({
        to: formData.email,
        subject: "Contact Form Submission Confirmation", 
        html: emailHtml
      });

      if (emailResult.mockResponse) {
        console.log('Using mock email response due to service issues');
      }
      
      return { success: true };
    } else {
      return { 
        success: false, 
        error: response.data?.error || 'An error occurred while processing your request'
      };
    }
  } catch (error: any) {
    console.error("Error submitting contact form:", error);
    return { 
      success: false, 
      error: error.message || 'An error occurred while processing your request'
    };
  }
}

export const submitAirTicketForm = async (formData: {
  tripType: 'roundTrip' | 'oneWay' | 'multiCity';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fromAirport?: Airport;
  toAirport?: Airport;
  departureDate?: Date | null;
  returnDate?: Date | null;
  flightSegments?: Array<{
    from: Airport;
    to: Airport;
    date: Date;
  }>;
  passengerCounts: {
    adult: number;
    child: number;
    infant: number;
  };
  baggage: string;
}): Promise<FormResponse> => {
  try {
    console.log("Processing air ticket form for:", formData.email);
    
    const response = await axios.post(`${API_ENDPOINT}/air-ticket`, formData);
    
    if (response.data && response.data.success) {
      // Generate email HTML
      const emailHtml = generateAirTicketEmail(formData);
      
      // Send confirmation email to user
      const emailResult = await sendMail({
        to: formData.email,
        subject: "Flight Quote Request Confirmation", 
        html: emailHtml
      });

      if (emailResult.mockResponse) {
        console.log('Using mock email response due to service issues');
      }
      
      return { success: true };
    } else {
      return { 
        success: false, 
        error: response.data?.error || 'An error occurred while processing your request'
      };
    }
  } catch (error: any) {
    console.error("Error submitting air ticket form:", error);
    return { 
      success: false, 
      error: error.message || 'An error occurred while processing your request'
    };
  }
}

export const submitAirClaimForm = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  flightDate: Date | null;
  issueType: string;
  description: string;
  bookingReference: string;
}): Promise<FormResponse> => {
  try {
    console.log("Processing air claim form for:", formData.email);
    
    const response = await axios.post(`${API_ENDPOINT}/air-claim`, formData);
    
    if (response.data && response.data.success) {
      // Generate email HTML
      const emailHtml = generateAirClaimEmail(formData);
      
      // Send confirmation email to user
      const emailResult = await sendMail({
        to: formData.email,
        subject: "Flight Claim Request Confirmation", 
        html: emailHtml
      });

      if (emailResult.mockResponse) {
        console.log('Using mock email response due to service issues');
      }
      
      return { success: true };
    } else {
      return { 
        success: false, 
        error: response.data?.error || 'An error occurred while processing your request'
      };
    }
  } catch (error: any) {
    console.error("Error submitting air claim form:", error);
    return { 
      success: false, 
      error: error.message || 'An error occurred while processing your request'
    };
  }
}