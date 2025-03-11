import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Briefcase, 
  FileText, 
  Plane, 
  ClipboardCheck, 
  Info, 
  Phone,
  Menu,
  X,
  Mail,
  Globe
} from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle scroll and resize events
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }

        // Update active section based on scroll position
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id') || '';
          
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
          }
        });
      });
    };

    // Close mobile menu on resize to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Initial call to set correct active section
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      body.style.paddingRight = `${scrollbarWidth}px`;
      body.style.overflow = 'hidden';
    } else {
      body.style.paddingRight = '';
      body.style.overflow = '';
    }
    
    return () => {
      body.style.paddingRight = '';
      body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { href: "#home", icon: <Home size={20} />, label: "Home" },
    { href: "#services", icon: <Briefcase size={20} />, label: "Services" },
    { href: "#travel-docs", icon: <FileText size={20} />, label: "Travel Docs" },
    { href: "#air-tickets", icon: <Plane size={20} />, label: "Air Tickets" },
    { href: "#air-claim", icon: <ClipboardCheck size={20} />, label: "Air Claim" },
    { href: "#about", icon: <Info size={20} />, label: "About Us" },
    { href: "#contact", icon: <Phone size={20} />, label: "Contact" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const navHeight = navRef.current?.offsetHeight || 0;
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed w-full z-[1000] transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
            : 'bg-white/90 backdrop-blur-sm shadow-md py-4'
        }`}
      >
        <div className="container-fluid max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 transition-all duration-300 hover:scale-105">
              <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>
                <Logo size="md" variant="dark" />
              </a>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {menuItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center gap-2 transition-all duration-300 py-2 text-sm lg:text-base font-medium relative group
                    ${activeSection === item.href.substring(1) 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              ref={menuButtonRef}
              onClick={() => setIsOpen(!isOpen)} 
              className={`md:hidden p-2 rounded-xl transition-all duration-300 relative z-[1001] ${
                isOpen 
                  ? 'bg-red-100 text-red-600 rotate-90' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 top-[60px] bg-white/95 backdrop-blur-md z-[999] animate-fadeIn"
        >
          <div className="container-fluid py-6 h-[calc(100vh-60px)] overflow-y-auto">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                    }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className={activeSection === item.href.substring(1) ? 'text-white' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </div>
            
            {/* Contact info in mobile menu */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <p className="text-gray-500 text-sm">Need assistance?</p>
                <a 
                  href="mailto:contact@kaurtravels.es" 
                  className="flex items-center gap-2 text-indigo-600 font-medium bg-indigo-50 p-3 rounded-xl hover:bg-indigo-100 transition-colors"
                >
                  <Mail size={20} />
                  <span>contact@kaurtravels.es</span>
                </a>
                <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 p-3 rounded-xl">
                  <Globe size={20} />
                  <span>Barcelona, Spain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;