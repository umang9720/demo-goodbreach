export const BASE_URL = 'http://3.8.94.61:8080/api';

export const apiCall = async (endpoint, method = 'GET', data = null, token = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const result = await response.json();
    return { data: result, status: response.status };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};
