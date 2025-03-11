import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { searchAirports, Airport } from '../services/amadeusService';
import useDebounce from '../hooks/useDebounce';

interface AirportSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (airport: Airport) => void;
  placeholder?: string;
  label: string;
  required?: boolean;
}

const AirportSearch: React.FC<AirportSearchProps> = ({
  value,
  onChange,
  onSelect,
  placeholder = "City or Airport",
  label,
  required = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(value, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchAirports = async () => {
      if (debouncedSearch.length < 2) {
        setAirports([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchAirports(debouncedSearch);
        setAirports(results);
        setIsOpen(true);
      } catch (error) {
        console.error('Error fetching airports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAirports();
  }, [debouncedSearch]);

  const handleSelect = (airport: Airport) => {
    onSelect(airport);
    onChange(`${airport.cityName} (${airport.iataCode})`);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.length >= 2 && setIsOpen(true)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={placeholder}
          required={required}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          </div>
        )}
      </div>

      {isOpen && airports.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {airports.map((airport) => (
            <button
              key={airport.iataCode}
              onClick={() => handleSelect(airport)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-start gap-3 border-b border-gray-100 last:border-0"
            >
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <div className="font-medium">
                  {airport.cityName} ({airport.iataCode})
                </div>
                <div className="text-sm text-gray-500">
                  {airport.name}, {airport.countryName}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AirportSearch;