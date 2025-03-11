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

    const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=QlW8LVC4S9cuR6e93qUciPaAnGKDW0Vr&client_secret=sM8Q4wqPj1SmH9Za'
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${encodeURIComponent(keyword)}&subType=AIRPORT&page[limit]=10&view=LIGHT`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch airports');
    }

    const data = await response.json();
    return data.data.map((airport: any) => ({
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