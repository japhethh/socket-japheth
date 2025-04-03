import axios from 'axios'

export const CoreApi = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Global error handling
CoreApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error:', error)
    return Promise.reject(error)
  }
)