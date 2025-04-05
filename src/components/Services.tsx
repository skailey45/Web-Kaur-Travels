import React from 'react';
import { 
  Plane, 
  Hotel, 
  Umbrella, 
  Map, 
  Clock, 
  CreditCard, 
  Shield, 
  Heart, 
  Star, 
  Globe2, 
  Headphones, 
  Wallet, 
  Users, 
  Award, 
  CheckCircle, 
  Briefcase,
  ArrowRight,
  Sparkles,
  Target,
  Compass,
  Phone
} from 'lucide-react';

const Services = () => {
  const stats = [
    { icon: <Globe2 className="h-6 w-6" />, value: "50+", label: "Destinations" },
    { icon: <Star className="h-6 w-6" />, value: "1000+", label: "Happy Clients" },
    { icon: <Headphones className="h-6 w-6" />, value: "24/7", label: "Support" },
    { icon: <Award className="h-6 w-6" />, value: "Best", label: "Price Guarantee" }
  ];

  const mainServices = [
    {
      icon: <Plane className="h-8 w-8" />,
      title: "Flight Bookings",
      description: "Best deals on domestic and international flights with flexible booking options.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: [
        "Multiple airlines comparison",
        "Price match guarantee",
        "24/7 booking support",
        "Free cancellation options"
      ],
      color: "blue"
    },
    {
      icon: <Hotel className="h-8 w-8" />,
      title: "Hotel Reservations",
      description: "Handpicked accommodations from luxury resorts to boutique hotels worldwide.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: [
        "Best rate guarantee",
        "Free cancellation options",
        "Verified guest reviews",
        "Luxury amenities"
      ],
      color: "purple"
    },
    {
      icon: <Umbrella className="h-8 w-8" />,
      title: "Holiday Packages",
      description: "Curated vacation packages tailored to your preferences and budget.",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: [
        "All-inclusive options",
        "Customizable itineraries",
        "Group discounts",
        "Expert planning"
      ],
      color: "green"
    }
  ];

  const additionalFeatures = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Expert Planning",
      description: "Professional travel advisors to help plan your perfect trip"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Booking",
      description: "Safe and encrypted payment processing for peace of mind"
    },
    {
      icon: <Compass className="h-6 w-6" />,
      title: "Travel Insurance",
      description: "Comprehensive coverage for worry-free adventures"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your travel needs"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-blue-50/50 to-purple-50/50 blur-3xl transform rotate-12" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-green-50/50 to-blue-50/50 blur-3xl transform -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header with Stats */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Comprehensive Travel Solutions
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            Experience seamless travel planning with our comprehensive range of services designed to make your journey extraordinary.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="bg-blue-50 rounded-xl p-4 inline-flex mb-4 transition-transform duration-300 group-hover:scale-110">
                    <div className="text-blue-600">{stat.icon}</div>
                  </div>
                  <div className="font-bold text-2xl text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <div key={index} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h4 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -right-40 -top-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Let us help you plan your perfect trip today. Our travel experts are ready to assist you.
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl group"
            >
              Contact Us Now
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;