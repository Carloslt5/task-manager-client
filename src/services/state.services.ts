import axios, { AxiosInstance, AxiosResponse } from 'axios'

class StateServices {

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
  getStates(projectId: string) {
    return this.instance.get(`/state/getStates/${projectId}`)
  }

  createState(projectId: string, newProjectData: object) {
    return this.instance.post(`/state/createState/${projectId}`, newProjectData)
  }
}

const stateservices = new StateServices()
export default stateservices

