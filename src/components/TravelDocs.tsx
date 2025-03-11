import React from 'react';
import { FileText, CheckCircle, Clock, Globe, AlertCircle, Import as Passport, FileCheck, User, ArrowRight, Shield, Search, Send, ExternalLink } from 'lucide-react';

const visaServices = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Application Assistance",
    description: "Expert guidance throughout your visa application process"
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Document Verification",
    description: "Thorough review of all required documentation"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Express Processing",
    description: "Fast-track options for urgent applications"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Multi-Country Expertise",
    description: "Specialized knowledge for various destinations"
  }
];

const documentTypes = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Tourist Visa",
    description: "For leisure travel and tourism purposes",
    requirements: ["Valid passport", "Bank statements", "Travel itinerary", "Accommodation proof"],
    processingTime: "5-15 working days"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Business Visa",
    description: "For business meetings and conferences",
    requirements: ["Company letter", "Business registration", "Bank statements", "Invitation letter"],
    processingTime: "7-20 working days"
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "E-Visa",
    description: "Electronic visa for faster processing",
    requirements: ["Valid passport scan", "Digital photo", "Online application form", "Payment method"],
    processingTime: "24h to 4 working days"
  }
];

const process = [
  {
    icon: <User />,
    title: "Initial Consultation",
    description: "Free consultation to understand your requirements"
  },
  {
    icon: <FileText />,
    title: "Document Collection",
    description: "Guidance on required documentation"
  },
  {
    icon: <FileCheck />,
    title: "Application Review",
    description: "Thorough checking of all documents"
  },
  {
    icon: <Send />,
    title: "Submission",
    description: "Handle submission and tracking"
  }
];

const TravelDocs = () => {
  return (
    <section id="travel-docs" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">Travel Documentation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your Gateway to Global Travel
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8">
            Navigate the complexities of international travel with our comprehensive documentation services.
          </p>
          <a 
            href="http://www.traveldoc.aero"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            Check Travel Requirements
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>

        {/* Process Timeline - Improved */}
        <div className="mb-16 md:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col items-center bg-white p-4 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className="bg-blue-600 text-white rounded-2xl p-3 md:p-4 shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold mb-2 text-center">{step.title}</h4>
                  <p className="text-gray-600 text-sm md:text-base text-center">{step.description}</p>
                  {index < process.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-4 top-1/3 text-blue-600 h-8 w-8" />
                  )}
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Visa Types - Improved */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {documentTypes.map((type, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 inline-block text-white mb-4 relative z-10">
                  {type.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 relative z-10">{type.title}</h3>
                <p className="text-white/80 text-sm md:text-base relative z-10">{type.description}</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 text-sm md:text-base">Processing Time</span>
                    <span className="font-semibold text-sm md:text-base bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{type.processingTime}</span>
                  </div>
                </div>
                <h4 className="font-bold mb-4 flex items-center gap-2 text-base md:text-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Required Documents
                </h4>
                <ul className="space-y-3">
                  {type.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 text-sm md:text-base">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action - Improved */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 -top-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Help with Your Travel Documents?</h3>
            <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">Our expert team is here to assist you every step of the way, ensuring a smooth and hassle-free travel experience.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact"
                className="bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a 
                href="http://www.traveldoc.aero"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700/50 backdrop-blur-sm text-white border border-white/20 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-blue-800/50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Check Requirements
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelDocs;