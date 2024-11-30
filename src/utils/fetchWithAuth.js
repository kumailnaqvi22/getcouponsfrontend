const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}${endpoint}`;

  if (!options.headers) {
    options.headers = {};
  }

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    // console.log(`Token included in request: ${token}`);
  } else {
    console.log('No token found');
  }

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchWithAuth;
