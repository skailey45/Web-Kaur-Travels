import axios from 'axios';

// Create secure axios instance with base URL
const api = axios.create({
  baseURL: 'https://test.api.amadeus.com/v1',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 10000 // 10 second timeout
});

export interface Airport {
  iataCode: string;
  name: string;
  cityName: string;
  countryName: string;
  address: {
    cityName: string;
    countryName: string;
  };
}

export const searchAirports = async (keyword: string): Promise<Airport[]> => {
  try {
    if (keyword.length < 2) return [];

    const tokenResponse = await api.post('/security/oauth2/token', 
      'grant_type=client_credentials' +
      `&client_id=${import.meta.env.VITE_AMADEUS_CLIENT_ID}` +
      `&client_secret=${import.meta.env.VITE_AMADEUS_CLIENT_SECRET}`
    );

    if (!tokenResponse.data?.access_token) {
      throw new Error('Failed to get access token');
    }

    const accessToken = tokenResponse.data.access_token;

    const response = await api.get('/reference-data/locations', {
      params: {
        keyword: encodeURIComponent(keyword),
        subType: 'AIRPORT',
        'page[limit]': 10,
        view: 'LIGHT'
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.data?.data) {
      throw new Error('Failed to fetch airports');
    }

    return response.data.data.map((airport: any) => ({
      iataCode: airport.iataCode,
      name: airport.name,
      cityName: airport.address.cityName,
      countryName: airport.address.countryName,
      address: {
        cityName: airport.address.cityName,
        countryName: airport.address.countryName
      }
    }));
  } catch (error) {
    console.error('Error searching airports:', error);
    return [];
  }
};