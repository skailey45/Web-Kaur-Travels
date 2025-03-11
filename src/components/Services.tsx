import React from 'react';
import { Plane, Hotel, Umbrella, Map, Clock, CreditCard, Shield, Heart, Star, Globe2, Headphones, Wallet, Users, Award, CheckCircle, Briefcase } from 'lucide-react';

const Services = () => {
  const stats = [
    { icon: <Globe2 className="h-6 w-6" />, value: "50+", label: "Destinations" },
    { icon: <Star className="h-6 w-6" />, value: "1000+", label: "Happy Clients" },
    { icon: <Headphones className="h-6 w-6" />, value: "24/7", label: "Support" },
    { icon: <Award className="h-6 w-6" />, value: "Best", label: "Price Guarantee" }
  ];

  return (
    <section id="services" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Stats - Improved */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4 md:mb-6">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Premium Travel Services
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mb-8 md:mb-12">
            Experience seamless travel planning with our comprehensive range of services designed to make your journey extraordinary.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="bg-blue-50 rounded-full p-3 md:p-4 inline-flex items-center justify-center mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110">
                    <div className="text-blue-600">{stat.icon}</div>
                  </div>
                  <div className="font-bold text-xl md:text-2xl text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {/* Flight Bookings */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative h-40 sm:h-48">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Flight Bookings"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <Plane className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">Flight Bookings</h3>
                </div>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Best deals on domestic and international flights with flexible booking options.</p>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                  <span>Multiple airlines comparison</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                  <span>Price match guarantee</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                  <span>24/7 booking support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Reservations */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative h-40 sm:h-48">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Hotel Reservations"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <Hotel className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">Hotel Reservations</h3>
                </div>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Handpicked accommodations from luxury resorts to boutique hotels worldwide.</p>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                  <span>Best rate guarantee</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                  <span>Free cancellation options</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                  <span>Verified guest reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Holiday Packages */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="relative h-40 sm:h-48">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Holiday Packages"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <Umbrella className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">Holiday Packages</h3>
                </div>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Curated vacation packages tailored to your preferences and budget.</p>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                  <span>All-inclusive options</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                  <span>Customizable itineraries</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                  <span>Group discounts available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features - Improved Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/30 opacity-80 transition-opacity group-hover:opacity-90"></div>
            <div className="relative z-10 p-4 md:p-8">
              <div className="mb-4 md:mb-6 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 group-hover:scale-110">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              </div>
              <h4 className="mb-2 md:mb-3 text-lg md:text-xl font-bold text-gray-900">Fast Booking</h4>
              <p className="text-gray-700 text-sm md:text-base">Quick and easy booking process with instant confirmation</p>
            </div>
            <div className="absolute -bottom-1 -right-1 h-24 w-24 rounded-full bg-blue-100 opacity-50 blur-xl"></div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/30 opacity-80 transition-opacity group-hover:opacity-90"></div>
            <div className="relative z-10 p-4 md:p-8">
              <div className="mb-4 md:mb-6 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 group-hover:scale-110">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
              </div>
              <h4 className="mb-2 md:mb-3 text-lg md:text-xl font-bold text-gray-900">Secure Payments</h4>
              <p className="text-gray-700 text-sm md:text-base">Safe and encrypted payment processing</p>
            </div>
            <div className="absolute -bottom-1 -right-1 h-24 w-24 rounded-full bg-purple-100 opacity-50 blur-xl"></div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/30 opacity-80 transition-opacity group-hover:opacity-90"></div>
            <div className="relative z-10 p-4 md:p-8">
              <div className="mb-4 md:mb-6 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 group-hover:scale-110">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              </div>
              <h4 className="mb-2 md:mb-3 text-lg md:text-xl font-bold text-gray-900">Expert Support</h4>
              <p className="text-gray-700 text-sm md:text-base">Professional travel advisors at your service</p>
            </div>
            <div className="absolute -bottom-1 -right-1 h-24 w-24 rounded-full bg-green-100 opacity-50 blur-xl"></div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/30 opacity-80 transition-opacity group-hover:opacity-90"></div>
            <div className="relative z-10 p-4 md:p-8">
              <div className="mb-4 md:mb-6 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 group-hover:scale-110">
                <Wallet className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
              </div>
              <h4 className="mb-2 md:mb-3 text-lg md:text-xl font-bold text-gray-900">Best Prices</h4>
              <p className="text-gray-700 text-sm md:text-base">Competitive rates and special deals</p>
            </div>
            <div className="absolute -bottom-1 -right-1 h-24 w-24 rounded-full bg-orange-100 opacity-50 blur-xl"></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 md:mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Start Your Journey?</h3>
          <p className="text-base md:text-lg mb-6 md:mb-8 opacity-90">Let us help you plan your perfect trip today</p>
          <a 
            href="#contact"
            className="bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Contact Us Now
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;