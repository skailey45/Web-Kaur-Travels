import React, { useState, useRef } from 'react';
import { 
  Plane, 
  Clock, 
  AlertCircle, 
  FileText, 
  Send, 
  CheckCircle, 
  Loader2, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  FileCheck, 
  Shield, 
  HelpCircle, 
  ArrowRight, 
  Award, 
  Sparkles, 
  Scale, 
  BadgeCheck, 
  Banknote, 
  Globe, 
  Plus, 
  Minus, 
  X, 
  Briefcase 
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import { submitAirTicketForm } from '../services/formService';
import AirportSearch from './AirportSearch';
import { Airport } from '../services/amadeusService';
import "react-datepicker/dist/react-datepicker.css";

interface FlightSegment {
  from: Airport | null;
  to: Airport | null;
  date: Date | null;
  fromQuery: string;
  toQuery: string;
}

interface PassengerCounts {
  adult: number;
  child: number;
  infant: number;
}

interface FormError {
  field: string;
  message: string;
}

const AirTickets = () => {
  const [tripType, setTripType] = useState<'roundTrip' | 'oneWay' | 'multiCity'>('roundTrip');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [selectedFromAirport, setSelectedFromAirport] = useState<Airport | null>(null);
  const [selectedToAirport, setSelectedToAirport] = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [baggage, setBaggage] = useState('0');
  const [passengerCounts, setPassengerCounts] = useState<PassengerCounts>({
    adult: 1,
    child: 0,
    infant: 0
  });
  const [flightSegments, setFlightSegments] = useState<FlightSegment[]>([{
    from: null,
    to: null,
    date: null,
    fromQuery: '',
    toQuery: ''
  }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<FormError[]>([]);

  const validateForm = (): boolean => {
    const newErrors: FormError[] = [];
    
    if (!firstName.trim()) {
      newErrors.push({ field: 'firstName', message: 'First name is required' });
    }
    
    if (!lastName.trim()) {
      newErrors.push({ field: 'lastName', message: 'Last name is required' });
    }
    
    if (!email.trim()) {
      newErrors.push({ field: 'email', message: 'Email is required' });
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.push({ field: 'email', message: 'Email is invalid' });
    }
    
    if (tripType !== 'multiCity') {
      if (!selectedFromAirport) {
        newErrors.push({ field: 'fromAirport', message: 'Departure airport is required' });
      }
      
      if (!selectedToAirport) {
        newErrors.push({ field: 'toAirport', message: 'Arrival airport is required' });
      }
      
      if (!departureDate) {
        newErrors.push({ field: 'departureDate', message: 'Departure date is required' });
      }
      
      if (tripType === 'roundTrip' && !returnDate) {
        newErrors.push({ field: 'returnDate', message: 'Return date is required' });
      }
    } else {
      // Validate multi-city segments
      flightSegments.forEach((segment, index) => {
        if (!segment.from) {
          newErrors.push({ field: `segment-${index}-from`, message: `Departure airport is required for flight ${index + 1}` });
        }
        
        if (!segment.to) {
          newErrors.push({ field: `segment-${index}-to`, message: `Arrival airport is required for flight ${index + 1}` });
        }
        
        if (!segment.date) {
          newErrors.push({ field: `segment-${index}-date`, message: `Date is required for flight ${index + 1}` });
        }
      });
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const getFieldError = (fieldName: string): string | undefined => {
    const error = errors.find(err => err.field === fieldName);
    return error?.message;
  };

  const hasFieldError = (fieldName: string): boolean => {
    return errors.some(err => err.field === fieldName);
  };

  const hasSegmentError = (index: number, field: string): boolean => {
    return errors.some(err => err.field === `segment-${index}-${field}`);
  };

  const getSegmentError = (index: number, field: string): string | undefined => {
    const error = errors.find(err => err.field === `segment-${index}-${field}`);
    return error?.message;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Client-side validation
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = {
        tripType,
        firstName,
        lastName,
        email,
        phone,
        fromAirport: selectedFromAirport,
        toAirport: selectedToAirport,
        departureDate,
        returnDate,
        flightSegments: tripType === 'multiCity' ? flightSegments : undefined,
        passengerCounts,
        baggage
      };

      const response = await submitAirTicketForm(formData);
      
      if (response.success) {
        setShowSuccess(true);
        // Reset form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setBaggage('0');
        setPassengerCounts({ adult: 1, child: 0, infant: 0 });
        setTripType('roundTrip');
        setSelectedFromAirport(null);
        setSelectedToAirport(null);
        setFromQuery('');
        setToQuery('');
        setDepartureDate(null);
        setReturnDate(null);
        setFlightSegments([{
          from: null,
          to: null,
          date: null,
          fromQuery: '',
          toQuery: ''
        }]);
        setErrors([]);
      } else {
        // Handle validation errors from the server
        if (response.errors) {
          const serverErrors = response.errors.map(err => ({
            field: err.param,
            message: err.msg
          }));
          setErrors(serverErrors);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const updatePassengerCount = (type: keyof PassengerCounts, increment: boolean) => {
    setPassengerCounts(prev => {
      const newCount = increment ? prev[type] + 1 : prev[type] - 1;
      
      if (type === 'adult' && newCount < 1) return prev;
      if (newCount < 0) return prev;
      if (type === 'infant' && newCount > prev.adult) return prev;
      
      const totalPassengers = 
        (type === 'adult' ? newCount : prev.adult) +
        (type === 'child' ? newCount : prev.child) +
        (type === 'infant' ? newCount : prev.infant);
      
      if (totalPassengers > 9) return prev;
      
      return {
        ...prev,
        [type]: newCount
      };
    });
  };

  const addFlightSegment = () => {
    if (flightSegments.length < 5) {
      setFlightSegments([...flightSegments, {
        from: null,
        to: null,
        date: null,
        fromQuery: '',
        toQuery: ''
      }]);
    }
  };

  const removeFlightSegment = (index: number) => {
    if (flightSegments.length > 1) {
      setFlightSegments(flightSegments.filter((_, i) => i !== index));
      
      // Remove any errors for this segment
      setErrors(errors.filter(err => !err.field.startsWith(`segment-${index}-`)));
    }
  };

  const updateFlightSegment = (index: number, field: keyof FlightSegment, value: any) => {
    const updatedSegments = [...flightSegments];
    updatedSegments[index] = {
      ...updatedSegments[index],
      [field]: value
    };
    setFlightSegments(updatedSegments);
    
    // Clear error for this field if it exists
    if (field === 'from' || field === 'fromQuery') {
      setErrors(prev => prev.filter(error => error.field !== `segment-${index}-from`));
    } else if (field === 'to' || field === 'toQuery') {
      setErrors(prev => prev.filter(error => error.field !== `segment-${index}-to`));
    } else if (field === 'date') {
      setErrors(prev => prev.filter(error => error.field !== `segment-${index}-date`));
    }
  };

  const getTotalPassengers = () => {
    return passengerCounts.adult + passengerCounts.child + passengerCounts.infant;
  };

  const renderFlightForm = () => {
    if (tripType === 'multiCity') {
      return (
        <div className="space-y-6">
          {flightSegments.map((segment, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-3 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                Flight {index + 1}
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeFlightSegment(index)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} className="h-5 w-5" />
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div>
                  <AirportSearch
                    value={segment.fromQuery}
                    onChange={(value) => updateFlightSegment(index, 'fromQuery', value)}
                    onSelect={(airport) => updateFlightSegment(index, 'from', airport)}
                    label="From"
                    required
                  />
                  {hasSegmentError(index, 'from') && (
                    <p className="mt-1 text-red-500 text-xs">{getSegmentError(index, 'from')}</p>
                  )}
                </div>
                <div>
                  <AirportSearch
                    value={segment.toQuery}
                    onChange={(value) => updateFlightSegment(index, 'toQuery', value)}
                    onSelect={(airport) => updateFlightSegment(index, 'to', airport)}
                    label="To"
                    required
                  />
                  {hasSegmentError(index, 'to') && (
                    <p className="mt-1 text-red-500 text-xs">{getSegmentError(index, 'to')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <DatePicker
                      selected={segment.date}
                      onChange={(date) => updateFlightSegment(index, 'date', date)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        hasSegmentError(index, 'date') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      } focus:border-transparent`}
                      minDate={new Date()}
                      placeholderText="Select date"
                    />
                  </div>
                  {hasSegmentError(index, 'date') && (
                    <p className="mt-1 text-red-500 text-xs">{getSegmentError(index, 'date')}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {flightSegments.length < 5 && (
            <button
              type="button"
              onClick={addFlightSegment}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} className="h-5 w-5" />
              Add Another Flight
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <AirportSearch
            value={fromQuery}
            onChange={setFromQuery}
            onSelect={setSelectedFromAirport}
            label="From"
            required
          />
          {hasFieldError('fromAirport') && (
            <p className="mt-1 text-red-500 text-xs">{getFieldError('fromAirport')}</p>
          )}
        </div>
        <div>
          <AirportSearch
            value={toQuery}
            onChange={setToQuery}
            onSelect={setSelectedToAirport}
            label="To"
            required
          />
          {hasFieldError('toAirport') && (
            <p className="mt-1 text-red-500 text-xs">{getFieldError('toAirport')}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <DatePicker
              selected={departureDate}
              onChange={(date) => {
                setDepartureDate(date);
                setErrors(prev => prev.filter(error => error.field !== 'departureDate'));
              }}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                hasFieldError('departureDate') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } focus:border-transparent`}
              minDate={new Date()}
              placeholderText="Select departure date"
            />
          </div>
          {hasFieldError('departureDate') && (
            <p className="mt-1 text-red-500 text-xs">{getFieldError('departureDate')}</p>
          )}
        </div>
        {tripType === 'roundTrip' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <DatePicker
                selected={returnDate}
                onChange={(date) => {
                  setReturnDate(date);
                  setErrors(prev => prev.filter(error => error.field !== 'returnDate'));
                }}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  hasFieldError('returnDate') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } focus:border-transparent`}
                minDate={departureDate || new Date()}
                placeholderText="Select return date"
              />
            </div>
            {hasFieldError('returnDate') && (
              <p className="mt-1 text-red-500 text-xs">{getFieldError('returnDate')}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="air-tickets" className="py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <Plane size={20} className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">Flight Booking</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect
            <span className="text-blue-600 ml-2">Flight</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Search and compare flights from hundreds of airlines and book with confidence
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          {showSuccess && (
            <div className="mb-6 bg-green-50 text-green-700 px-6 py-4 rounded-xl flex items-center gap-2 animate-fadeIn">
              <CheckCircle size={20} className="h-5 w-5" />
              Flight quote request submitted successfully! We'll contact you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {/* Trip Type Selection */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Plane size={20} className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Trip Type</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setTripType('roundTrip')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    tripType === 'roundTrip'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-blue-600'
                  }`}
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('oneWay')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    tripType === 'oneWay'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-blue-600'
                  }`}
                >
                  One Way
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('multiCity')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    tripType === 'multiCity'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-blue-600'
                  }`}
                >
                  Multi-City
                </button>
              </div>
            </div>

            {/* Flight Details */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Globe size={20} className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Flight Details</h3>
              </div>
              {renderFlightForm()}
            </div>

            {/* Passengers & Baggage */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <User size={20} className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Passengers & Baggage</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between"
                    >
                      <span>{getTotalPassengers()} Passenger{getTotalPassengers() !== 1 ? 's' : ''}</span>
                      <User size={20} className="h-5 w-5 text-gray-400" />
                    </button>
                    {isPassengerDropdownOpen && (
                      <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Adults</div>
                              <div className="text-sm text-gray-500">Age 12+</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => updatePassengerCount('adult', false)}
                                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                                disabled={passengerCounts.adult <= 1}
                              >
                                <Minus size={16} className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center">{passengerCounts.adult}</span>
                              <button
                                type="button"
                                onClick={() => updatePassengerCount('adult', true)}
                                className="p-2 rounded-full hover:bg-gray-100"
                              >
                                <Plus size={16} className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Children</div>
                              <div className="text-sm text-gray-500">Age 2-11</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => updatePassengerCount('child', false)}
                                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                                disabled={passengerCounts.child <= 0}
                              >
                                <Minus size={16} className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center">{passengerCounts.child}</span>
                              <button
                                type="button"
                                onClick={() => updatePassengerCount('child', true)}
                                className="p-2 rounded-full hover:bg-gray-100"
                              >
                                <Plus size={16} className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Infants</div>
                              <div className="text-sm text-gray-500">Under 2</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => updatePassengerCount('infant', false)}
                                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                                disabled={passengerCounts.infant <= 0}
                              >
                                <Minus size={16} className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center">{passengerCounts.infant}</span>
                              <button
                                type="button"
                                onClick={() => updatePassengerCount('infant', true)}
                                className="p-2 rounded-full hover:bg-gray-100"
                              >
                                <Plus size={16} className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Baggage</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={baggage}
                      onChange={(e) => setBaggage(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="0">No checked baggage</option>
                      <option value="1">1 bag (23kg)</option>
                      <option value="2">2 bags (23kg each)</option>
                      <option value="3">3 bags (23kg each)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <User size={20} className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setErrors(prev => prev.filter(error => error.field !== 'firstName'));
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        hasFieldError('firstName') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      } focus:border-transparent`}
                      placeholder="Enter first name"
                    />
                  </div>
                  {hasFieldError('firstName') && (
                    <p className="mt-1 text-red-500 text-xs">{getFieldError('firstName')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setErrors(prev => prev.filter(error => error.field !== 'lastName'));
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        hasFieldError('lastName') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      } focus:border-transparent`}
                      placeholder="Enter last name"
                    />
                  </div>
                  {hasFieldError('lastName') && (
                    <p className="mt-1 text-red-500 text-xs">{getFieldError('lastName')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors(prev => prev.filter(error => error.field !== 'email'));
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        hasFieldError('email') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      } focus:border-transparent`}
                      placeholder="Enter email"
                    />
                  </div>
                  {hasFieldError('email') && (
                    <p className="mt-1 text-red-500 text-xs">{getFieldError('email')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setErrors(prev => prev.filter(error => error.field !== 'phone'));
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        hasFieldError('phone') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      } focus:border-transparent`}
                      placeholder="Enter phone number"
                    />
                  </div>
                  {hasFieldError('phone') && (
                    <p className="mt-1 text-red-500 text-xs">{getFieldError('phone')}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Get Flight Quote
                </>
              )}
            </button>

            {/* Trust Indicators */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Secure Booking</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Best Prices</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Easy Booking</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AirTickets;