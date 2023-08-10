import axios, { AxiosInstance } from 'axios'

class ToDoServices {

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

  getAllToDos() {
    return this.instance.get('/todos/getAllTodos')
  }

  createToDo(newTodo: object) {
    return this.instance.post('/todos/createdTodo', newTodo)
  }

  updateToDo(_id: number, completed: boolean) {
    return this.instance.put('/todos/updateTodo', { _id, completed })
  }

  deleteToDo(_id: number) {
    return this.instance.delete(`/todos/deleteTodo/${_id}`)
  }

}

const todoservices = new ToDoServices()
export default todoservices