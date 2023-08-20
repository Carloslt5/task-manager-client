import axios, { AxiosInstance } from 'axios'

class BoardServices {

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

  getAllBoards() {
    return this.instance.get('/boards/getAllBoards')
  }

}

const boardservices = new BoardServices()
export default boardservices