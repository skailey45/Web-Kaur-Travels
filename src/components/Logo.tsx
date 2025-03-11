import React, { useState, useEffect, useRef } from 'react';
import { Globe, Star, MapPin, Compass, Cloud } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  autoAnimate?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
  color: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'dark',
  autoAnimate = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPlane, setShowPlane] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [stars, setStars] = useState<Array<{
    id: number;
    size: number;
    top: number;
    left: number;
    delay: number;
    duration: number;
  }>>([]);
  
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set up auto animation
  useEffect(() => {
    if (autoAnimate && !isMobile) { // Disable auto-animation on mobile to save resources
      const triggerAnimation = () => {
        setIsAnimating(true);
        setShowPlane(true);
        
        setTimeout(() => {
          setShowPlane(false);
          setTimeout(() => {
            setIsAnimating(false);
          }, 800);
        }, 2000);
      };
      
      // Initial delay before starting animations
      const initialDelay = setTimeout(() => {
        triggerAnimation();
        
        // Set up recurring animation
        animationTimerRef.current = setInterval(triggerAnimation, 15000);
      }, 5000);
      
      return () => {
        clearTimeout(initialDelay);
        if (animationTimerRef.current) {
          clearInterval(animationTimerRef.current);
        }
      };
    }
  }, [autoAnimate, isMobile]);

  // Generate stars
  useEffect(() => {
    const newStars = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: Math.random() * 0.4 + 0.3,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: Math.random() * 1 + 1.5
    }));
    setStars(newStars);
  }, []);

  // Handle hover animation state
  useEffect(() => {
    if (isHovered) {
      setIsAnimating(true);
      setShowPlane(true);
      generateParticles();
    } else {
      // Delay hiding the plane to complete animation
      setTimeout(() => {
        setShowPlane(false);
      }, 500);
      
      // Delay ending animation state
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    }
  }, [isHovered]);

  // Generate particles for burst effect
  const generateParticles = () => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const colors = variant === 'light' 
      ? ['#ffffff', '#e0e7ff', '#c7d2fe', '#a5b4fc'] 
      : ['#93c5fd', '#60a5fa', '#3b82f6', '#2563eb'];
    
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: centerX,
      y: centerY,
      size: Math.random() * 3 + 2,
      speed: Math.random() * 2 + 1,
      opacity: 1,
      angle: (Math.PI * 2 * i) / 12,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setParticles(newParticles);
    
    // Clear particles after animation
    setTimeout(() => {
      setParticles([]);
    }, 1000);
  };

  const sizes = {
    sm: {
      container: 'w-7 h-7 sm:w-8 sm:h-8',
      innerCircle: 'w-5 h-5 sm:w-6 sm:h-6',
      icon: 'h-3 w-3 sm:h-3.5 sm:w-3.5',
      text: 'text-sm sm:text-base',
      subtext: 'text-xs',
      dot1: 'w-1.5 h-1.5 sm:w-2 sm:h-2',
      dot2: 'w-1 h-1 sm:w-1.5 sm:h-1.5',
      trail: 'w-1.5 h-1.5 sm:w-2 sm:h-2',
      star: 'w-1 h-1 sm:w-1.5 sm:h-1.5',
      particle: 'w-1 h-1 sm:w-1.5 sm:h-1.5',
      svgSize: 14
    },
    md: {
      container: 'w-8 h-8 sm:w-9 sm:h-9',
      innerCircle: 'w-6 h-6 sm:w-7 sm:h-7',
      icon: 'h-3.5 w-3.5 sm:h-4 sm:w-4',
      text: 'text-base sm:text-lg',
      subtext: 'text-xs',
      dot1: 'w-1.5 h-1.5 sm:w-2 sm:h-2',
      dot2: 'w-1 h-1 sm:w-1.5 sm:h-1.5',
      trail: 'w-1.5 h-1.5 sm:w-2 sm:h-2',
      star: 'w-1 h-1 sm:w-1.5 sm:h-1.5',
      particle: 'w-1 h-1 sm:w-1.5 sm:h-1.5',
      svgSize: 16
    },
    lg: {
      container: 'w-9 h-9 sm:w-10 sm:h-10',
      innerCircle: 'w-7 h-7 sm:w-8 sm:h-8',
      icon: 'h-4 w-4 sm:h-5 sm:w-5',
      text: 'text-lg sm:text-xl',
      subtext: 'text-xs sm:text-sm',
      dot1: 'w-2 h-2 sm:w-2.5 sm:h-2.5',
      dot2: 'w-1.5 h-1.5 sm:w-2 sm:h-2',
      trail: 'w-2 h-2 sm:w-2.5 sm:h-2.5',
      star: 'w-1.5 h-1.5 sm:w-2 sm:h-2',
      particle: 'w-1.5 h-1.5 sm:w-2 sm:h-2',
      svgSize: 20
    }
  };

  const variants = {
    light: {
      outerCircle: 'from-blue-400/90 to-indigo-400/90',
      outerCircleHover: 'from-blue-500/90 to-indigo-500/90',
      innerCircle: 'from-blue-300/90 to-indigo-300/90',
      innerCircleHover: 'from-blue-400/90 to-indigo-400/90',
      text: 'from-white to-white/90',
      subtext: 'text-white/80',
      dot1: 'bg-white/70',
      dot2: 'bg-white/50',
      trail: 'bg-white/30',
      iconColor: 'text-white',
      starColor: 'text-yellow-200',
      shadow: 'shadow-[0_0_15px_rgba(255,255,255,0.3)]',
      shadowHover: 'shadow-[0_0_25px_rgba(255,255,255,0.5)]',
      svgFill: '#ffffff',
      svgStroke: '#ffffff'
    },
    dark: {
      outerCircle: 'from-blue-600/90 to-indigo-600/90',
      outerCircleHover: 'from-blue-700/90 to-indigo-700/90',
      innerCircle: 'from-blue-500/90 to-indigo-500/90',
      innerCircleHover: 'from-blue-600/90 to-indigo-600/90',
      text: 'from-blue-500 to-indigo-600',
      subtext: 'text-gray-500',
      dot1: 'bg-blue-400',
      dot2: 'bg-blue-300',
      trail: 'bg-blue-200/50',
      iconColor: 'text-white',
      starColor: 'text-yellow-300',
      shadow: 'shadow-[0_0_15px_rgba(37,99,235,0.3)]',
      shadowHover: 'shadow-[0_0_25px_rgba(37,99,235,0.5)]',
      svgFill: '#ffffff',
      svgStroke: '#ffffff'
    }
  };

  // Custom SVG Plane Icon
  const PlaneIcon = ({ size, color }: { size: number, color: string }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.6))',
        transform: 'rotate(-15deg)',
      }}
    >
      <path 
        d="M21.5 15.5L13.5 12.5V7.5C13.5 6.4 12.6 5.5 11.5 5.5C10.4 5.5 9.5 6.4 9.5 7.5V12.5L1.5 15.5L3.5 17.5L9.5 15.5V19.5L7.5 20.5L7.5 22.5L11.5 21.5L15.5 22.5L15.5 20.5L13.5 19.5V15.5L19.5 17.5L21.5 15.5Z" 
        fill={color}
        stroke={color}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M11.5 5.5C12.6046 5.5 13.5 4.60457 13.5 3.5C13.5 2.39543 12.6046 1.5 11.5 1.5C10.3954 1.5 9.5 2.39543 9.5 3.5C9.5 4.60457 10.3954 5.5 11.5 5.5Z" 
        fill={color}
        stroke={color}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="flex items-center gap-2">
      <div 
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => !isMobile && setIsHovered(true)} // Only trigger on non-mobile touch
        onTouchEnd={() => !isMobile && setIsHovered(false)}  // Only trigger on non-mobile touch
      >
        {/* Outer Circle - Logo Background */}
        <div className={`
          ${sizes[size].container}
          bg-gradient-to-br ${variants[variant].outerCircle}
          rounded-full flex items-center justify-center
          transition-all duration-500 ease-in-out
          ${isAnimating ? variants[variant].shadowHover : variants[variant].shadow}
          ${isAnimating ? 'scale-110' : ''}
          overflow-hidden
        `}>
          {/* Inner Circle */}
          <div className={`
            ${sizes[size].innerCircle}
            bg-gradient-to-br ${variants[variant].innerCircle}
            rounded-full flex items-center justify-center
            transition-all duration-500 ease-in-out
            ${isAnimating ? variants[variant].innerCircleHover : ''}
          `}>
            {/* Stars (visible when animating) */}
            {isAnimating && stars.map(star => (
              <div 
                key={star.id}
                className={`absolute ${variants[variant].starColor} opacity-0`}
                style={{ 
                  top: `${star.top}%`, 
                  left: `${star.left}%`, 
                  width: `${star.size}rem`, 
                  height: `${star.size}rem`,
                  borderRadius: '50%',
                  boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)', animation: `twinkle ${star.duration}s ease-in-out infinite`,
                  animationDelay: `${star.delay}s`
                }}
              />
            ))}
            
            {/* Earth Icon (visible when not showing plane) */}
            <div 
              className={`
                absolute transition-all duration-500 ease-in-out
                ${showPlane ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 animate-float'}
              `}
            >
              <Globe 
                size={sizes[size].svgSize}
                className={`
                  ${variants[variant].iconColor} 
                  transform transition-transform duration-500 ease-in-out
                `}
                style={{ 
                  filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.6))',
                }}
              />
            </div>
            
            {/* Custom Plane SVG (visible when showing plane) */}
            <div 
              className={`
                absolute transition-all duration-500 ease-in-out
                ${showPlane ? 'opacity-100 scale-100' : 'opacity-0 scale-0 -translate-x-full'}
              `}
              style={{
                animation: showPlane ? 'fly 2s ease-in-out' : 'none'
              }}
            >
              <PlaneIcon 
                size={sizes[size].svgSize} 
                color={variants[variant].svgFill} 
              />
            </div>
          </div>
        </div>
        
        {/* Decorative Elements - Only show on non-mobile or when animating */}
        {(!isMobile || isAnimating) && (
          <>
            <div className={`
              absolute -top-0.5 -right-0.5 ${sizes[size].dot1}
              ${variants[variant].dot1} rounded-full animate-pulse-slow
              transition-all duration-300 ease-in-out ${isAnimating ? 'scale-150 animate-ping-slow' : ''}
              filter blur-[0.5px]
            `} />
            <div className={`
              absolute -bottom-0.5 -left-0.5 ${sizes[size].dot2}
              ${variants[variant].dot2} rounded-full animate-pulse-slow delay-150
              transition-all duration-300 ease-in-out ${isAnimating ? 'scale-150 animate-ping-slow' : ''}
              filter blur-[0.5px]
            `} />
          </>
        )}
        
        {/* Compass (appears during animation) */}
        {isAnimating && !isMobile && (
          <div 
            className="absolute -bottom-1 -right-1 opacity-0 animate-fadeIn"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            <Compass 
              size={12}
              className={`${variants[variant].iconColor} opacity-70`}
              style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' }}
            />
          </div>
        )}
        
        {/* Map Pin (appears during animation) */}
        {isAnimating && !isMobile && (
          <div 
            className="absolute -top-1 -left-1 opacity-0 animate-fadeIn"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <MapPin 
              size={12}
              className={`${variants[variant].iconColor} opacity-70`}
              style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' }}
            />
          </div>
        )}
        
        {/* Cloud (appears during animation) */}
        {isAnimating && showPlane && !isMobile && (
          <div 
            className="absolute top-1/2 -left-3 transform -translate-y-1/2 opacity-0 animate-fadeIn"
            style={{ 
              animationDelay: '0.4s', 
              animationFillMode: 'forwards',
              animation: 'fadeIn 0.5s ease-out forwards, float 3s ease-in-out infinite'
            }}
          >
            <Cloud 
              size={10}
              className={`${variants[variant].iconColor} opacity-40`}
              style={{ filter: 'blur(0.5px)' }}
            />
          </div>
        )}
        
        {/* Plane Trail (only visible when showing plane) */}
        {isAnimating && showPlane && !isMobile && (
          <>
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className={`
                  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  ${sizes[size].trail} ${variants[variant].trail} rounded-full opacity-0
                  filter blur-[1px]
                `} 
                style={{ 
                  animationName: 'trail',
                  animationDuration: '0.8s',
                  animationTimingFunction: 'ease-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${i * 0.1}s`,
                  animationFillMode: 'forwards'
                }} 
              />
            ))}
          </>
        )}
        
        {/* Particle Burst Effect */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              top: `${particle.y}px`,
              left: `${particle.x}px`,
              transform: `translate(-50%, -50%)`,
              animation: 'fadeOut 1s forwards',
              transition: 'all 1s ease-out',
              boxShadow: '0 0 2px rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
      </div>
      
      <div className="flex flex-col">
        <span className={`
          ${sizes[size].text} font-bold bg-gradient-to-r 
          ${variants[variant].text} bg-clip-text text-transparent
          transition-all duration-300 ease-in-out
          ${isAnimating ? 'tracking-wide scale-105' : ''}
        `}>
          Kaur Travel
        </span>
        <span className={`
          ${sizes[size].subtext} ${variants[variant].subtext} -mt-1
          transition-all duration-300 ease-in-out
          ${isAnimating ? 'tracking-wide' : ''}
        `}>
          Your Travel Partner
        </span>
      </div>
    </div>
  );
};

export default Logo;