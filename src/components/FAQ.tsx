import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Plane, Globe2, CreditCard, Clock, Shield, Mail } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      category: 'flights',
      icon: <Plane className="h-5 w-5 text-blue-600" />,
      question: "How do I book a flight through Kaur Travels?",
      answer: "You can book flights through our website by using our flight search tool, or contact our travel experts directly. We'll help you find the best routes and prices for your journey."
    },
    {
      category: 'flights',
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      question: "What is your flight cancellation policy?",
      answer: "Our cancellation policy varies depending on the airline and fare type. Generally, you can cancel within 24 hours of booking for a full refund. Contact our support team for specific details."
    },
    {
      category: 'documentation',
      icon: <Globe2 className="h-5 w-5 text-purple-600" />,
      question: "What travel documents do I need?",
      answer: "Required documents typically include a valid passport, visa (if necessary), and travel insurance. Specific requirements depend on your destination and nationality."
    },
    {
      category: 'documentation',
      icon: <Shield className="h-5 w-5 text-purple-600" />,
      question: "How long does visa processing take?",
      answer: "Visa processing times vary by country and type. Standard processing usually takes 5-15 working days, while express services may be available for urgent cases."
    },
    {
      category: 'payment',
      icon: <CreditCard className="h-5 w-5 text-green-600" />,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, bank transfers, and digital payment methods. All payments are processed securely through our encrypted payment system."
    },
    {
      category: 'payment',
      icon: <Shield className="h-5 w-5 text-green-600" />,
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard SSL encryption and comply with PCI DSS requirements to ensure your payment information is always secure."
    },
    {
      category: 'support',
      icon: <Mail className="h-5 w-5 text-orange-600" />,
      question: "How can I contact customer support?",
      answer: "You can reach our support team 24/7 via phone at +34 663 462 268, email at contact@kaurtravels.es, or through our online chat system."
    },
    {
      category: 'support',
      icon: <Clock className="h-5 w-5 text-orange-600" />,
      question: "What are your customer service hours?",
      answer: "Our customer service team is available 24/7 to assist you with any queries or concerns you may have about your travel arrangements."
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'flights', name: 'Flights', icon: <Plane className="h-5 w-5" /> },
    { id: 'documentation', name: 'Documentation', icon: <Globe2 className="h-5 w-5" /> },
    { id: 'payment', name: 'Payment', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'support', name: 'Support', icon: <Mail className="h-5 w-5" /> }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'flights': return 'bg-blue-50 text-blue-600';
      case 'documentation': return 'bg-purple-50 text-purple-600';
      case 'payment': return 'bg-green-50 text-green-600';
      case 'support': return 'bg-orange-50 text-orange-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <section id="faq" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4 md:mb-6">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Find quick answers to common questions about our services, booking process, and travel requirements.
          </p>
        </div>

        {/* Category Filters - Enhanced */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-xl transition-all text-sm md:text-base ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md transform -translate-y-1'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-blue-200'
              }`}
            >
              <span className={`${activeCategory === category.id ? 'text-white' : 'text-gray-400'} transition-colors`}>
                {category.icon}
              </span>
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Items - Enhanced */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className={`w-full px-5 md:px-6 py-4 text-left flex items-start justify-between gap-4 transition-colors ${
                  activeIndex === index ? 'bg-gray-50/70' : 'group-hover:bg-gray-50/50'
                }`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`mt-1 p-2 rounded-lg ${
                    faq.category === 'flights' ? 'bg-blue-50' :
                    faq.category === 'documentation' ? 'bg-purple-50' :
                    faq.category === 'payment' ? 'bg-green-50' : 'bg-orange-50'
                  } transition-transform duration-300 ${activeIndex === index ? 'scale-110' : ''}`}>
                    {faq.icon}
                  </div>
                  <span className={`font-semibold text-gray-900 text-sm md:text-base ${activeIndex === index ? 'text-blue-700' : ''}`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`rounded-full p-1 transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-blue-100 rotate-180' 
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <ChevronDown className={`h-5 w-5 ${activeIndex === index ? 'text-blue-600' : 'text-gray-500'}`} />
                </div>
              </button>
              {activeIndex === index && (
                <div className="px-5 md:px-6 pb-5 text-gray-600 animate-slideDown">
                  <div className="pl-9 md:pl-10 text-sm md:text-base border-l-2 border-blue-100 ml-1 mt-1">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
              <HelpCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No questions found</h3>
            <p className="text-gray-500 mb-6">There are no questions in this category yet.</p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mx-auto"
            >
              <ChevronUp className="h-4 w-4" />
              View all questions
            </button>
          </div>
        )}

        {/* Contact Section - Enhanced */}
        <div className="mt-16 md:mt-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="bg-white p-4 rounded-full shadow-md">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-3">
                  <Mail className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Still Have Questions?
                </h3>
                <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base max-w-md">
                  Our dedicated support team is ready to assist you with any inquiries you might have.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg group"
                >
                  <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="text-sm md:text-base">Contact Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;