import axios, { AxiosInstance } from 'axios'

class AuthServices {

  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_REACT_API_URL
    })

    this.instance.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken')

      if (storedToken) {
        config.headers['Authorization'] = `Bearer ${storedToken}`
      }

      return config
    }, (error) => {
      return Promise.reject(error)
    })
  }

  signup(userData: object) {
    return this.instance.post('/auth/signup', userData)
  }

  login(userData: object) {
    return this.instance.post('/auth/login', userData)
  }

  verify(token: string) {
    return this.instance.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
  }
}

const authservices = new AuthServices()
export default authservices