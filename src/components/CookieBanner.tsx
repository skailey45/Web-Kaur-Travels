import React, { useState, useEffect } from 'react';
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      setIsVisible(true);
    } else {
      // Load saved preferences
      const savedPrefs = localStorage.getItem('cookiePreferences');
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        setPreferences(prefs);
        updateConsentState(prefs);
      }
    }
  }, []);

  const updateConsentState = (prefs: typeof preferences) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag;
      gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied',
        'ad_storage': prefs.marketing ? 'granted' : 'denied',
        'ad_user_data': prefs.marketing ? 'granted' : 'denied',
        'ad_personalization': prefs.marketing ? 'granted' : 'denied'
      });
    }
  };

  const handleAcceptAll = () => {
    const newPrefs = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setPreferences(newPrefs);
    saveCookiePreferences(newPrefs);
  };

  const handleSavePreferences = () => {
    saveCookiePreferences(preferences);
  };

  const saveCookiePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    setIsVisible(false);
    
    // Update consent state
    updateConsentState(prefs);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        {/* Main Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Cookie className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
            >
              {showDetails ? (
                <>
                  Hide Details
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show Details
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
            <button
              onClick={handleAcceptAll}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Detailed Preferences */}
        {showDetails && (
          <div className="mt-4 border-t pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Necessary Cookies</h3>
                  <p className="text-xs text-gray-500">Required for the website to function properly.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Analytics Cookies</h3>
                  <p className="text-xs text-gray-500">Help us improve our website by collecting anonymous usage data (Google Analytics).</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Marketing Cookies</h3>
                  <p className="text-xs text-gray-500">Used to deliver more relevant advertisements and track ad performance.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                />
              </div>
              <button
                onClick={handleSavePreferences}
                className="mt-4 w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;