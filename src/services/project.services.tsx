import { axios } from '@/lib/axios';

class ProjectServices {
  constructor() {}

  async getProject() {
    return axios.get(`/project/getAllProject`);
  }
}

const projectservices = new ProjectServices();
export default projectservices;
