/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'tall': { 'raw': '(min-height: 800px)' },
        'short': { 'raw': '(max-height: 600px)' },
        'landscape': { 'raw': '(orientation: landscape)' },
        'portrait': { 'raw': '(orientation: portrait)' },
        'touch': { 'raw': '(hover: none)' },
        'mouse': { 'raw': '(hover: hover)' },
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'trail': 'trail 1.5s ease-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 2s ease infinite',
        'fly': 'fly 2s ease-in-out',
        'orbit': 'orbit 8s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.6s ease-out forwards',
        'fadeOut': 'fadeOut 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.6 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'ping-slow': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '75%, 100%': { transform: 'scale(2)', opacity: 0 },
        },
        'trail': {
          '0%': { transform: 'translateX(0) translateY(0)', opacity: 0.8 },
          '100%': { transform: 'translateX(-15px) translateY(15px)', opacity: 0 },
        },
        'twinkle': {
          '0%, 100%': { opacity: 0.1, transform: 'scale(0.8)' },
          '50%': { opacity: 0.7, transform: 'scale(1.2)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fly': {
          '0%': { transform: 'translateX(-20px) translateY(10px) rotate(-15deg)' },
          '50%': { transform: 'translateX(5px) translateY(-5px) rotate(-25deg)' },
          '100%': { transform: 'translateX(0) translateY(0) rotate(-15deg)' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' },
        },
        'bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'fadeIn': {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        },
        'fadeOut': {
          'from': { opacity: 1 },
          'to': { opacity: 0 },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'transform': 'transform',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 50%',
        'pos-100': '100% 50%',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        'fluid-1': 'clamp(0.25rem, 1vw, 0.5rem)',
        'fluid-2': 'clamp(0.5rem, 2vw, 1rem)',
        'fluid-4': 'clamp(1rem, 4vw, 2rem)',
        'fluid-8': 'clamp(2rem, 8vw, 4rem)',
        'fluid-16': 'clamp(4rem, 16vw, 8rem)',
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 5vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 6vw, 2.25rem)',
        'fluid-4xl': 'clamp(2.25rem, 7vw, 3rem)',
        'fluid-5xl': 'clamp(3rem, 8vw, 3.75rem)',
      },
      maxWidth: {
        'xxs': '16rem',
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        'screen-50': '50vh',
        'screen-75': '75vh',
        'screen-90': '90vh',
      },
      aspectRatio: {
        'portrait': '3/4',
        'landscape': '4/3',
        'ultrawide': '21/9',
      },
      gridTemplateColumns: {
        'fluid-1': 'repeat(1, minmax(0, 1fr))',
        'fluid-2': 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
        'fluid-3': 'repeat(auto-fit, minmax(min(100%, 15rem), 1fr))',
        'fluid-4': 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.container-fluid': {
          width: '100%',
          paddingLeft: 'max(1rem, 5vw)',
          paddingRight: 'max(1rem, 5vw)',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      });
    },
  ],
};