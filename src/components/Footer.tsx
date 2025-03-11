import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  FileText, 
  Globe,
  Building2, 
  Shield, 
  Lock, 
  FileTerminal, 
  Cookie, 
  Map, 
  ChevronRight,
  Info, 
  AlertCircle, 
  CheckCircle, 
  HelpCircle,
  MapPin,
  Mail,
  Phone,
  X
} from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const Modal = ({ title, content, onClose }: { title: string; content: React.ReactNode; onClose: () => void }) => (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-gradient-to-b from-white to-gray-50 rounded-3xl max-w-4xl w-full mx-auto relative max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 sm:p-2.5 rounded-xl">
              {title.toLowerCase().includes('privacy') && <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
              {title.toLowerCase().includes('terms') && <FileTerminal className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
              {title.toLowerCase().includes('cookie') && <Cookie className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
              {title.toLowerCase().includes('map') && <Map className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors group"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-8 py-4 sm:py-6 overflow-y-auto">
          <div className="prose max-w-none prose-sm sm:prose">
            {content}
          </div>
        </div> 
        
        <div className="px-4 sm:px-8 py-4 sm:py-6 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Info className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Last updated: March 2024</span>
            </div>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
            >
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const legalContent = {
    privacy: (
      <div className="space-y-6 sm:space-y-8">
        <div className="bg-blue-50 p-4 sm:p-6 rounded-2xl border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg text-gray-900">Data Protection Information</h4>
              <p className="text-gray-600 text-sm">We take your privacy seriously</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
              <span>Secure Data Storage</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
              <span>Regular Security Audits</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Information We Collect
            </h5>
            <div className="bg-white rounded-xl border border-gray-200 divide-y">
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Personal Information</div>
                <p className="text-gray-600 text-xs sm:text-sm">Name, email address, phone number, etc.</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Booking Information</div>
                <p className="text-gray-600 text-xs sm:text-sm">Travel dates, preferences, and history</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Payment Details</div>
                <p className="text-gray-600 text-xs sm:text-sm">Securely processed payment information</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              How We Use Your Information
            </h5>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">Booking Processing</span>
                  <p className="text-gray-600 text-xs sm:text-sm">To process your travel arrangements and bookings</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">Customer Support</span>
                  <p className="text-gray-600 text-xs sm:text-sm">To provide assistance and support services</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">Service Improvement</span>
                  <p className="text-gray-600 text-xs sm:text-sm">To enhance and personalize our services</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Company Information
            </h5>
            <div className="bg-white rounded-xl border border-gray-200 divide-y">
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Legal Entity</div>
                <p className="text-gray-600 text-xs sm:text-sm">Kaur Travels S.L: B7584534</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Tourism License</div>
                <p className="text-gray-600 text-xs sm:text-sm">FUE-2025-04349245</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Registered Address</div>
                <p className="text-gray-600 text-xs sm:text-sm">C/Martorell 19, 08904 Spain, Barcelona</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    terms: (
      <div className="space-y-6 sm:space-y-8">
        <div className="bg-purple-50 p-4 sm:p-6 rounded-2xl border border-purple-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 p-2 rounded-xl text-white">
              <FileTerminal className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg text-gray-900">Terms of Service</h4>
              <p className="text-gray-600 text-sm">Please read these terms carefully</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 flex-shrink-0" />
              <span>Fair Pricing Policy</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 flex-shrink-0" />
              <span>Transparent Booking</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 flex-shrink-0" />
              <span>Secure Transactions</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 flex-shrink-0" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Service Description</h5>
            <div className="bg-white rounded-xl border border-gray-200 divide-y">
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Flight Bookings</div>
                <p className="text-gray-600 text-xs sm:text-sm">Domestic and international flight reservations</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Hotel Accommodations</div>
                <p className="text-gray-600 text-xs sm:text-sm">Wide range of accommodation options</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Travel Documentation</div>
                <p className="text-gray-600 text-xs sm:text-sm">Visa and passport assistance services</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Booking & Cancellation</h5>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">Booking Confirmation</span>
                  <p className="text-gray-600 text-xs sm:text-sm">All bookings are subject to availability and confirmation</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">Cancellation Policy</span>
                  <p className="text-gray-600 text-xs sm:text-sm">Varies by service type and provider</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">Refund Process</span>
                  <p className="text-gray-600 text-xs sm:text-sm">Processed according to our refund policy</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              Company Information
            </h5>
            <div className="bg-white rounded-xl border border-gray-200 divide-y">
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Legal Entity</div>
                <p className="text-gray-600 text-xs sm:text-sm">Kaur Travels S.L: B7584534</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Tourism License</div>
                <p className="text-gray-600 text-xs sm:text-sm">FUE-2025-04349245</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Registered Address</div>
                <p className="text-gray-600 text-xs sm:text-sm">C/Martorell 19, 08904 Spain, Barcelona</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    cookie: (
      <div className="space-y-6 sm:space-y-8">
        <div className="bg-green-50 p-4 sm:p-6 rounded-2xl border border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-600 p-2 rounded-xl text-white">
              <Cookie className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg text-gray-900">Cookie Policy</h4>
              <p className="text-gray-600 text-sm">Understanding our cookie usage</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
              <span>Essential Cookies</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
              <span>Functional Cookies</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
              <span>Analytics Cookies</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
              <span>Marketing Cookies</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Types of Cookies</h5>
            <div className="bg-white rounded-xl border border-gray-200 divide-y">
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Essential Cookies</div>
                <p className="text-gray-600 text-xs sm:text-sm">Required for basic website functionality</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Functional Cookies</div>
                <p className="text-gray-600 text-xs sm:text-sm">Remember your preferences and settings</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Analytics Cookies</div>
                <p className="text-gray-600 text-xs sm:text-sm">Help us understand website usage</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Managing Cookies</h5>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200">
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">You can manage cookie preferences through your browser settings:</p>
              <ul className="space-y-2 text-gray-600 text-xs sm:text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                  Chrome: Settings → Privacy and Security → Cookies
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                  Firefox: Options → Privacy & Security → Cookies
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                  Safari: Preferences → Privacy → Cookies
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              Company Information
            </h5>
            <div className="bg-white rounded-xl border border-gray-200 divide-y">
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Legal Entity</div>
                <p className="text-gray-600 text-xs sm:text-sm">Kaur Travels S.L: B7584534</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Tourism License</div>
                <p className="text-gray-600 text-xs sm:text-sm">FUE-2025-04349245</p>
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Registered Address</div>
                <p className="text-gray-600 text-xs sm:text-sm">C/Martorell 19, 08904 Spain, Barcelona</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    sitemap: (
      <div className="space-y-6 sm:space-y-8">
        <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-900 p-2 rounded-xl text-white">
              <Map className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg text-gray-900">Site Map</h4>
              <p className="text-gray-600 text-sm">Navigate our website easily</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h5 className="font-semibold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Main Pages</h5>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Services</h5>
            <ul className="space-y-2">
              <li>
                <a href="#travel-docs" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  Travel Documents
                </a>
              </li>
              <li>
                <a href="#air-tickets" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  Air Tickets
                </a>
              </li>
              <li>
                <a href="#air-claim" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  Air Claims
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Legal Information</h5>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveModal('privacy')}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors w-full text-left text-sm"
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('terms')}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors w-full text-left text-sm"
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('cookie')}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors w-full text-left text-sm"
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            Company Information
          </h5>
          <div className="bg-white rounded-xl border border-gray-200 divide-y">
            <div className="p-3 sm:p-4">
              <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Legal Entity</div>
              <p className="text-gray-600 text-xs sm:text-sm">Kaur Travels S.L: B7584534</p>
            </div>
            <div className="p-3 sm:p-4">
              <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Tourism License</div>
              <p className="text-gray-600 text-xs sm:text-sm">FUE-2025-04349245</p>
            </div>
            <div className="p-3 sm:p-4">
              <div className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Registered Address</div>
              <p className="text-gray-600 text-xs sm:text-sm">C/Martorell 19, 08904 Spain, Barcelona</p>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <footer className="bg-[#15191E] text-gray-400 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Company Info with Updated Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <Logo size="md" variant="light" />
            </div>
            <p className="mb-4 md:mb-6 text-sm md:text-base">Your trusted travel partner since 2023</p>
            <div className="space-y-2 md:space-y-3 text-sm">
              <a className="flex items-center gap-2 hover:text-white transition-colors">
                <Shield className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                Kaur Travels S.L: B7584534
              </a>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-blue-400 flex-shrink-0" />
                <span>Tourism License: FUE-2025-04349245</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                C/Martorell 19, 08904 Spain, Barcelona
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3 text-sm">
              <li>
                <a href="#home" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Home className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Briefcase className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  Services
                </a>
              </li>
              <li>
                <a href="#air-tickets" className="flex items-center gap-2 hover:text-white transition-colors">
                  <FileText className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  Air Tickets
                </a>
              </li>
              <li>
                <a href="#travel-docs" className="flex items-center gap-2 hover:text-white transition-colors">
                  <FileText className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  Travel Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Information */}
          <div>
            <h3 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">Legal Information</h3>
            <ul className="space-y-2 md:space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => setActiveModal('privacy')}
                  className="flex items-center gap-2 hover:text-white transition-colors w-full text-left"
                >
                  <Lock className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('terms')}
                  className="flex items-center gap-2 hover:text-white transition-colors w-full text-left"
                >
                  <FileTerminal className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('cookie')}
                  className="flex items-center gap-2 hover:text-white transition-colors w-full text-left"
                >
                  <Cookie className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  Cookie Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('sitemap')}
                  className="flex items-center gap-2 hover:text-white transition-colors w-full text-left"
                >
                  <Map className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  Site Map
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-4">
            <span>© 2024 Kaur Travels. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <Modal
          title={activeModal === 'terms' ? 'Terms & Conditions' : activeModal.charAt(0).toUpperCase() + activeModal.slice(1)}
          content={legalContent[activeModal as keyof typeof legalContent]}
          onClose={() => setActiveModal(null)}
        />
      )}
    </footer>
  );
};

export default Footer;