import axios from 'axios'

// Configure API URL to include the backend server port
const API_URL = 'http://localhost:5000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    // You can add global error handling here
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const checkApiStatus = async () => {
  const response = await api.get('/status')
  return response.data
}

export default api