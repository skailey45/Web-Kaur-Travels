import React, { useState } from 'react';
import { Plane, Clock, AlertCircle, FileText, Send, CheckCircle, Loader2, Calendar, User, Mail, Phone, MapPin, CreditCard, FileCheck, Shield, HelpCircle, ArrowRight, Award, Sparkles, Scale, BadgeCheck, Banknote } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { submitAirClaimForm } from '../services/formService';
import "react-datepicker/dist/react-datepicker.css";

interface ClaimFormData {
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
}

const AirClaim = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ClaimFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    flightNumber: '',
    departureAirport: '',
    arrivalAirport: '',
    flightDate: null,
    issueType: '',
    description: '',
    bookingReference: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      flightDate: date
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await submitAirClaimForm(formData);
      
      if (response.success) {
        setShowSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          flightNumber: '',
          departureAirport: '',
          arrivalAirport: '',
          flightDate: null,
          issueType: '',
          description: '',
          bookingReference: ''
        });
        setStep(1);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.flightNumber && formData.departureAirport && formData.arrivalAirport && formData.flightDate;
      case 3:
        return formData.issueType && formData.description && formData.bookingReference;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter first name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flight Number</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., IB3456"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flight Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <DatePicker
                    selected={formData.flightDate}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                    placeholderText="Select flight date"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure Airport</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="departureAirport"
                    value={formData.departureAirport}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., MAD"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Arrival Airport</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="arrivalAirport"
                    value={formData.arrivalAirport}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., BCN"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
              <div className="relative">
                <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  required
                >
                  <option value="">Select issue type</option>
                  <option value="delay">Flight Delay</option>
                  <option value="cancellation">Flight Cancellation</option>
                  <option value="denied-boarding">Denied Boarding</option>
                  <option value="baggage">Baggage Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Please provide details about your issue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Booking Reference</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="bookingReference"
                  value={formData.bookingReference}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter booking reference"
                  required
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="air-claim" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <Plane className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">Flight Compensation Claims</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Compensation for Your
            <span className="text-blue-600 ml-2">Flight Disruption</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our expert team will handle your claim from start to finish, ensuring you receive 
            the compensation you deserve for flight delays, cancellations, or denied boarding.
          </p>
        </div>

        {/* Compensation Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="bg-blue-50 rounded-xl p-4 inline-flex mb-6">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Flight Delay</h3>
            <p className="text-gray-600 mb-4">Compensation for delays over 3 hours</p>
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-bold">Up to €600</span>
              <Award className="h-5 w-5 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="bg-red-50 rounded-xl p-4 inline-flex mb-6">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Flight Cancellation</h3>
            <p className="text-gray-600 mb-4">Full compensation for cancelled flights</p>
            <div className="flex items-center justify-between">
              <span className="text-red-600 font-bold">Up to €600</span>
              <Award className="h-5 w-5 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="bg-purple-50 rounded-xl p-4 inline-flex mb-6">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Denied Boarding</h3>
            <p className="text-gray-600 mb-4">Compensation for overbooking</p>
            <div className="flex items-center justify-between">
              <span className="text-purple-600 font-bold">Up to €600</span>
              <Award className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Claim Form */}
        <div className="max-w-4xl mx-auto">
          {showSuccess && (
            <div className="mb-6 bg-green-50 text-green-800 px-6 py-4 rounded-2xl flex items-center justify-center gap-2 animate-fadeIn">
              <CheckCircle className="h-5 w-5" />
              Claim submitted successfully! We'll contact you shortly.
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-12">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step === stepNumber
                        ? 'bg-blue-600 text-white scale-110'
                        : step > stepNumber
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {step > stepNumber ? <CheckCircle className="h-6 w-6" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-24 h-1 mx-2 transition-all duration-300 ${
                        step > stepNumber ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
                  >
                    <ArrowRight className="h-5 w-5 rotate-180" />
                    Previous
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={!isStepComplete(step)}
                    className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !isStepComplete(step)}
                    className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Submit Claim
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-blue-50 rounded-xl p-4 inline-flex mb-4">
                <Scale className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">Legal Expertise</h4>
              <p className="text-gray-600">Expert legal team specialized in air passenger rights</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-green-50 rounded-xl p-4 inline-flex mb-4">
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">High Success Rate</h4>
              <p className="text-gray-600">97% success rate in claim processing</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-purple-50 rounded-xl p-4 inline-flex mb-4">
                <Banknote className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">No Win, No Fee</h4>
              <p className="text-gray-600">Only pay if we win your claim</p>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 flex items-start gap-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2">Need Assistance?</h4>
              <p className="text-gray-700 mb-4">
                Our support team is available 24/7 to assist you with your claim. Contact us through:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="mailto:support@kaurtravels.com" 
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Mail className="h-5 w-5" />
                  support@kaurtravels.com
                </a>
                <a 
                  href="tel:+34900123456" 
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Phone className="h-5 w-5" />
                  +34 900 123 456
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirClaim;