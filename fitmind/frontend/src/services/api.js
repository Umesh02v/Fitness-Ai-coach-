import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(res => res, err => {
  if (err.response?.status === 401) { localStorage.clear(); window.location.href = '/login' }
  return Promise.reject(err)
})

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
}
export const workoutAPI = {
  getAll: () => api.get('/workouts'),
  log: (data) => api.post('/workouts', data),
  delete: (id) => api.delete(`/workouts/${id}`),
}
export const metricsAPI = {
  getAll: () => api.get('/metrics'),
  save: (data) => api.post('/metrics', data),
}
export const aiAPI = {
  chat: (message) => api.post('/ai/chat', { message }),
  getHistory: () => api.get('/ai/history'),
}
export default api
