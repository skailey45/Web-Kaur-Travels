import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { 
  Globe, 
  Star, 
  MapPin, 
  Calendar, 
  Phone, 
  Award, 
  Users, 
  Shield, 
  Plane, 
  Heart, 
  TrendingUp, 
  CheckCircle, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Mountain, 
  Sun, 
  Zap, 
  Target, 
  Search 
} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'New York City',
    subtitle: 'Where Dreams Take Flight',
    location: 'Manhattan, USA',
    description: 'Experience the vibrant energy of the city that never sleeps'
  },
  {
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Magical Turkey',
    subtitle: 'A Journey Through Time',
    location: 'Cappadocia, Turkey',
    description: 'Float above fairy chimneys in a hot air balloon paradise'
  },
  {
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Royal Jaipur',
    subtitle: 'The Pink City Beckons',
    location: 'Rajasthan, India',
    description: 'Discover the majestic palaces and rich cultural heritage'
  },
  {
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Maldives Paradise',
    subtitle: 'Escape to Paradise',
    location: 'Maldives Islands',
    description: 'Dive into crystal clear waters and overwater luxury'
  }
];

const stats = [
  { icon: <Users size={20} />, value: "5K+", label: "Happy Travelers" },
  { icon: <Globe size={20} />, value: "100+", label: "Destinations" },
  { icon: <Award size={20} />, value: "2+", label: "Years Experience" },
  { icon: <Star size={20} />, value: "4.9", label: "Average Rating" }
];

const Home = () => {
  return (
    <section id="home" className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                  style={{ backgroundImage: `url("${slide.image}")` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                </div>
                <div className="relative h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 w-full">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-2 text-white/90 mb-6 animate-fadeIn">
                        <MapPin size={20} className="h-5 w-5" />
                        <span className="text-lg font-medium">{slide.location}</span>
                      </div>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-slideUp">
                        {slide.title}
                      </h1>
                      <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 animate-slideUp delay-100">
                        {slide.subtitle}
                      </p>
                      <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 md:mb-12 animate-slideUp delay-200">
                        {slide.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 animate-slideUp delay-300">
                        <a 
                          href="#search"
                          className="bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 group"
                        >
                          <Search size={20} className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          Explore {slide.title}
                        </a>
                        <a 
                          href="#contact"
                          className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white/20 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                        >
                          <Calendar size={20} className="h-5 w-5" />
                          Plan Your Trip
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3 md:gap-4">
                  <div className="bg-white/10 p-2 md:p-3 rounded-xl">
                    {stat.icon}
                  </div>
                  <div className="text-white">
                    <div className="text-lg md:text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section - Redesigned */}
      <div className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 md:py-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-blue-600/5 -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-indigo-600/5 translate-y-1/3 -translate-x-1/4 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-blue-600/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-indigo-600/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-purple-600/10 rounded-full blur-lg"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Services Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
            {/* Content Side */}
            <div className="order-2 lg:order-1 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome to Kaur Travels
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                We craft personalized journeys that match your unique preferences, whether you're seeking 
                adventure, relaxation, cultural exploration, or a blend of experiences.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md p-3 rounded-xl">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <Target size={20} className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Expert Planning</h4>
                    <p className="text-gray-600">Our travel specialists design itineraries that maximize your time and budget while ensuring unforgettable experiences.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md p-3 rounded-xl">
                  <div className="bg-purple-50 p-3 rounded-xl">
                    <Shield size={20} className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Secure Bookings</h4>
                    <p className="text-gray-600">Enjoy peace of mind with our secure payment system and comprehensive travel protection options.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md p-3 rounded-xl">
                  <div className="bg-green-50 p-3 rounded-xl">
                    <Users size={20} className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">24/7 Support</h4>
                    <p className="text-gray-600">Our dedicated team is available around the clock to assist with any questions or unexpected situations during your journey.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="#services"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg group"
                >
                  Explore Our Services
                  <ArrowRight size={16} className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            
            {/* Image Side */}
            <div className="order-1 lg:order-2 relative animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:-translate-y-2">
                <img 
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Travel Experience" 
                  className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Review Badge */}
                <div className="absolute top-6 left-6 bg-white rounded-xl shadow-lg p-4 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Star size={20} className="h-5 w-5 text-yellow-400" />
                    <span className="font-bold text-base">4.9/5</span>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-nowrap">Customer Rating</p>
                </div>
                
                {/* Destinations Card */}
                <div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-xl p-4 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-600 p-3 rounded-xl text-white transform transition-all duration-300 hover:rotate-12">
                      <Globe size={20} className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xl">50+</p>
                      <p className="text-gray-600 text-sm">Destinations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle size={16} className="h-4 w-4 text-green-500" />
                    <span>Available Worldwide</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-full animate-pulse-slow"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-2xl animate-pulse-slow"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600/5 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-16 md:mt-24">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Why Travelers Choose Us
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: <Globe size={24} />, title: "Global Reach", value: "50+ Countries", desc: "Destinations across continents" },
                { icon: <Shield size={24} />, title: "Secure Booking", value: "100% Safe", desc: "Encrypted payment processing" },
                { icon: <Award size={24} />, title: "Top Rated", value: "4.9/5 Stars", desc: "Based on 1000+ reviews" },
                { icon: <Users size={24} />, title: "Expert Team", value: "24/7 Support", desc: "Professional travel advisors" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="bg-gray-50 p-3 md:p-4 rounded-xl inline-flex mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110">
                    <span className="text-blue-600">{stat.icon}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{stat.title}</h4>
                  <p className="text-gray-900 font-semibold mb-2 text-sm sm:text-base">{stat.value}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;