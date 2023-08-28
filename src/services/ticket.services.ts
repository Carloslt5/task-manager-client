import axios, { AxiosInstance, AxiosResponse } from 'axios'

class TicketServices {

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
  getTicket(projectId: string) {
    return this.instance.get(`/ticket/getTicket/${projectId}`)
  }

}

const ticketservices = new TicketServices()
export default ticketservices

