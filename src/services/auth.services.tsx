import axios, { AxiosInstance } from 'axios'

class AuthServices {

  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_REACT_API_URL
    })
  }

  signup(userData: object) {
    return this.instance.post('/auth/signup', userData)
  }

  login(userData: object) {
    return this.instance.post('/auth/login', userData)
  }

  verify(userData: string) {
    return this.instance.get('/auth/verify', { headers: { Authorization: `Bearer ${userData}` } })
  }
}

const authservices = new AuthServices()
export default authservices