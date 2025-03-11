exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { firstName, lastName, email, flightNumber } = data;

    if (!firstName || !lastName || !email || !flightNumber) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields'
        })
      };
    }

    console.log('Air claim form submission received:', { firstName, lastName, email, flightNumber });

    // In a real implementation, you would save this to a database
    // For now, we'll just return a success response

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Air claim form processed successfully'
      })
    };
  } catch (error) {
    console.error('Air claim form error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'An error occurred'
      })
    };
  }
};