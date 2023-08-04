import axios, { AxiosInstance } from 'axios'

class PostServices {

  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`
    })
  }
  getAllToDos() {
    return this.instance.get('/todos/getAllTodos')
  }

}

const postservices = new PostServices()
export default postservices