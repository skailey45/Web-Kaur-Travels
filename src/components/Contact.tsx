import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  Globe, 
  MessageSquare, 
  CheckCircle, 
  Loader2, 
  AlertCircle, 
  Building, 
  Shield 
} from 'lucide-react';
import { submitContactForm } from '../services/formService';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormError {
  field: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<FormError[]>([]);

  const validateForm = (): boolean => {
    const newErrors: FormError[] = [];
    
    if (!formData.name.trim()) {
      newErrors.push({ field: 'name', message: 'Name is required' });
    }
    
    if (!formData.email.trim()) {
      newErrors.push({ field: 'email', message: 'Email is required' });
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.push({ field: 'email', message: 'Email is invalid' });
    }
    
    if (!formData.subject.trim()) {
      newErrors.push({ field: 'subject', message: 'Subject is required' });
    }
    
    if (!formData.message.trim()) {
      newErrors.push({ field: 'message', message: 'Message is required' });
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    setErrors(prev => prev.filter(error => error.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Client-side validation
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await submitContactForm({
        ...formData
      });
      
      if (response.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        
        // Handle validation errors from the server
        if (response.errors) {
          const serverErrors = response.errors.map(err => ({
            field: err.param,
            message: err.msg
          }));
          setErrors(serverErrors);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        if (submitStatus === 'success') {
          setSubmitStatus(null);
        }
      }, 5000);
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    const error = errors.find(err => err.field === fieldName);
    return error?.message;
  };

  const hasFieldError = (fieldName: string): boolean => {
    return errors.some(err => err.field === fieldName);
  };

  const officeLocations = [
    {
      city: 'Barcelona',
      address: 'Calle Martorell 19',
      postal: '08904 Barcelona, Spain',
      phone: '+34 663 462 268',
      email: 'bookings@kaurtravels.es',
      hours: 'Mon-Fri: 9:00 AM - 23:00 PM'
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Have questions about our services? Ready to plan your next adventure? 
            Our team is here to help make your travel dreams a reality.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="bg-blue-50 rounded-xl p-3 md:p-4 inline-flex mb-4 md:mb-6">
              <Phone className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">24/7 Travel Support</p>
            <a href="tel:+34663462268" className="text-blue-600 hover:text-blue-700 font-semibold text-sm md:text-base">
              +34 663 462 268
            </a>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="bg-purple-50 rounded-xl p-3 md:p-4 inline-flex mb-4 md:mb-6">
              <Mail className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">Quick Response Time</p>
            <a href="mailto:info@kaurtravels.es" className="text-purple-600 hover:text-purple-700 font-semibold text-sm md:text-base">
              info@kaurtravels.es
            </a>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all sm:col-span-2 md:col-span-1">
            <div className="bg-green-50 rounded-xl p-3 md:p-4 inline-flex mb-4 md:mb-6">
              <Globe className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">Office Locations</p>
            <span className="text-green-600 font-semibold text-sm md:text-base">Spain, Barcelona </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6">Send Us a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 bg-green-50 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm md:text-base">Thank you for your message! We'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm md:text-base">Something went wrong. Please check the form and try again.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border ${
                        hasFieldError('name') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      } focus:border-transparent text-sm md:text-base`}
                      placeholder="John Doe"
                    />
                    {hasFieldError('name') && (
                      <p className="mt-1 text-red-500 text-xs">{getFieldError('name')}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border ${
                        hasFieldError('email') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      } focus:border-transparent text-sm md:text-base`}
                      placeholder="john@example.com"
                    />
                    {hasFieldError('email') && (
                      <p className="mt-1 text-red-500 text-xs">{getFieldError('email')}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border ${
                        hasFieldError('phone') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      } focus:border-transparent text-sm md:text-base`}
                      placeholder="+34 XXX XXX XXX"
                    />
                    {hasFieldError('phone') && (
                      <p className="mt-1 text-red-500 text-xs">{getFieldError('phone')}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border ${
                        hasFieldError('subject') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      } focus:border-transparent text-sm md:text-base`}
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">New Booking</option>
                      <option value="support">Travel Support</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                    {hasFieldError('subject') && (
                      <p className="mt-1 text-red-500 text-xs">{getFieldError('subject')}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border ${
                      hasFieldError('message') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    } focus:border-transparent text-sm md:text-base`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {hasFieldError('message') && (
                    <p className="mt-1 text-red-500 text-xs">{getFieldError('message')}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 md:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 md:h-5 md:w-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 md:h-5 md:w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Office Locations */}
          <div className="space-y-4 md:space-y-6">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-lg md:text-xl font-bold mb-4">{office.city} Office</h4>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600 text-sm md:text-base">{office.address}</p>
                      <p className="text-gray-600 text-sm md:text-base">{office.postal}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-blue-600 text-sm md:text-base">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-blue-600 text-sm md:text-base">
                      {office.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <p className="text-gray-600 text-sm md:text-base">{office.hours}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Company Information */}
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <h4 className="text-lg md:text-xl font-bold mb-4">Company Information</h4>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 text-sm md:text-base font-medium">Kaur Travels S.L</p>
                    <p className="text-gray-600 text-sm md:text-base">B7584534</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 text-sm md:text-base font-medium">Tourism License</p>
                    <p className="text-gray-600 text-sm md:text-base">FUE-2025-04349245</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 md:p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 md:p-3 rounded-xl shadow-sm">
                  <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-base md:text-lg">Have Questions?</h4>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">
                    Check our frequently asked questions for quick answers.
                  </p>
                  <a 
                    href="#faq"
                    className="text-purple-600 hover:text-purple-700 font-semibold text-xs md:text-sm inline-flex items-center gap-2"
                  >
                    View FAQ
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;