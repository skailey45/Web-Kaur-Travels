import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Loading from './components/Loading';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const Services = lazy(() => import('./components/Services'));
const TravelDocs = lazy(() => import('./components/TravelDocs'));
const AirTickets = lazy(() => import('./components/AirTickets'));
const AirClaim = lazy(() => import('./components/AirClaim'));
const About = lazy(() => import('./components/About'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const CookieBanner = lazy(() => import('./components/CookieBanner'));

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <main>
          <Home />
          <Services />
          <TravelDocs />
          <AirTickets />
          <AirClaim />
          <About />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <CookieBanner />
      </Suspense>
    </div>
  );
}

export default App;