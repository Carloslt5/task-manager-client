import axios, { AxiosInstance } from 'axios'

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

  createdTicket(projectId: string, stateId: string, newTicket: object) {
    return this.instance.post(`/ticket/createdTicket/${projectId}`, { stateId, newTicket })
  }

  updateStateTicket(infoupdate: object) {
    return this.instance.put('/ticket/updateStateTicket', infoupdate)
  }

}

const ticketservices = new TicketServices()
export default ticketservices

