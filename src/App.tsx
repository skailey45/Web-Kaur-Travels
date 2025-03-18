import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import TravelDocs from './components/TravelDocs';
import AirTickets from './components/AirTickets';
import AirClaim from './components/AirClaim';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
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
    </div>
  );
}

export default App;