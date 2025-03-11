import React from 'react';
import { Users, Award, Globe2, Star, TrendingUp, Building2, Briefcase, MapPin, Clock, Shield } from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: '2023',
      title: 'Foundation',
      description: 'Established in Barcelona as a boutique travel agency with a vision to revolutionize travel services.'
    },
    {
      year: '2023',
      title: 'Digital Transformation',
      description: 'Launched our innovative website to connect easy with our clients across the Europe.'
    },
    {
      year: '2024',
      title: 'Market Expansion',
      description: 'Expanded operations to cover major European destinations .'
    },
    {
      year: '2025',
      title: 'Exceptional Service',
      description: 'Consistently praised by clients for outstanding travel experiences and personalized itineraries.'
    }
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "1,000+", label: "Happy Clients" },
    { icon: <Globe2 className="h-6 w-6" />, value: "50+", label: "Destinations" },
    { icon: <Shield className="h-6 w-6" />, value: "2+years", label: "Experience" },
    { icon: <Star className="h-6 w-6" />, value: "4.9/5", label: "Client Rating" }
  ];

  const values = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Trust & Reliability",
      description: "Building lasting relationships through transparent and dependable service."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      title: "Innovation",
      description: "Continuously evolving our services with cutting-edge technology."
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Customer-Centric",
      description: "Putting our clients' needs and satisfaction at the heart of everything we do."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-64 top-40 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-3xl"></div>
        <div className="absolute -left-64 bottom-40 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4 md:mb-6">
            <Building2 className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">About Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Our Journey of Excellence
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            Since 2023, Kaur Travels has been transforming the travel industry with innovative solutions 
            and exceptional service. Our journey is marked by continuous growth, technological advancement, 
            and unwavering commitment to customer satisfaction.
          </p>
        </div>

        {/* Stats Overview - Improved */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 flex flex-col items-center text-center">
                <div className="bg-blue-50 rounded-xl p-3 inline-flex mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="font-bold text-xl md:text-2xl text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Company Story - Enhanced with Better Layout and Visual Elements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-20">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Our Story</h3>
            
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 mb-6 md:mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 opacity-70"></div>
              
              <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base relative z-10">
                <span className="font-semibold text-blue-600">Founded in 2023</span> in the heart of Barcelona, Kaur Travels emerged with a vision to redefine 
                the travel experience. What started as a boutique agency has grown into a leading name 
                in the travel industry, known for innovative solutions and personalized service.
              </p>
              
              <p className="text-gray-700 mb-6 md:mb-8 text-sm md:text-base relative z-10">
                Our journey has been marked by significant milestones, from the launch of our 
                online services to expanding our services across Europe. We've 
                built strong bond to ours clients to offer 
                exclusive deals and premium experiences.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl group hover:from-blue-100 hover:to-blue-200 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-semibold text-sm md:text-base text-gray-800">Headquarter</span>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm">Barcelona, Spain</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl group hover:from-purple-100 hover:to-purple-200 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="h-5 w-5 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-semibold text-sm md:text-base text-gray-800">Business</span>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm">All of our service are Professionals</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main Image with Floating Elements */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="relative group">
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Team Meeting" 
                      className="w-full h-64 md:h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 md:p-6 text-white">
                      <p className="font-semibold text-lg">Our Team</p>
                      <p className="text-sm text-white/80">Passionate travel experts</p>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-blue-600/10 rounded-full blur-md"></div>
                </div>
                
                <div className="relative group mt-12">
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Office" 
                      className="w-full h-64 md:h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 md:p-6 text-white">
                      <p className="font-semibold text-lg">Barcelona Office</p>
                      <p className="text-sm text-white/80">Our headquarters</p>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-3 -right-3 w-16 h-16 bg-indigo-600/10 rounded-full blur-md"></div>
                </div>
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-3/4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Since 2023</p>
                    <p className="text-xs text-gray-500">Transforming travel experiences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline - Improved */}
        <div className="mb-12 md:mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Our Journey</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative group">
                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full">
                  <div className="bg-blue-50 rounded-xl p-3 inline-flex mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                  </div>
                  <div className="text-blue-600 font-bold mb-2 text-sm md:text-base">{milestone.year}</div>
                  <h4 className="text-lg md:text-xl font-bold mb-2">{milestone.title}</h4>
                  <p className="text-gray-600 text-sm md:text-base">{milestone.description}</p>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                {index < milestones.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Company Values - Improved */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="group relative">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className="bg-gray-50 rounded-xl p-4 inline-flex mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110">
                    {value.icon}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{value.title}</h4>
                  <p className="text-gray-600 text-sm md:text-base">{value.description}</p>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;