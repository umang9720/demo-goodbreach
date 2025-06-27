import { getData } from '../utils/AsyncStorage';

export const BASE_URL = 'http://3.8.94.61:8080/api';

export const apiCall = async (endpoint, method = 'GET', data = null, token = null) => {
  // 🔁 Automatically fetch token from AsyncStorage if not provided
  if (!token) {
    token = await getData('token');
  }

  // ❗Guard: Prevent sending protected requests if user not logged in
  if (!token && endpoint !== '/user/login' && endpoint !== '/user/register') {
    return { error: 'Unauthorized', status: 401 };
  }

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // ✅ Only attach Authorization header if token is present
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    console.log(`🔍 API Call: ${method} ${BASE_URL}${endpoint}`, config);
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const result = await response.json();
    console.log(`📡 API Response: ${response.status} ${endpoint}`, result);
    return { data: result, status: response.status };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};
