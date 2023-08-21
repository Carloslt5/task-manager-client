import axios, { AxiosInstance } from 'axios'

class KanbanServices {

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

  getKanbanCards(boardId: string) {
    return this.instance.get(`/kanbancards/${boardId}/getKanbanCards`)
  }
  createKanbanCards(boardId: string, newKanbanCard: object) {
    return this.instance.post(`/kanbancards/${boardId}/createKanbanCards`, newKanbanCard)
  }

}

const kanbanservices = new KanbanServices()
export default kanbanservices