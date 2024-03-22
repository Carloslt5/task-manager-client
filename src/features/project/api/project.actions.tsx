import { axios } from '@/lib/axios';

class ProjectServices {
  constructor() {}

  async getProject(): Promise<Project[]> {
    const {
      data: { data },
    } = await axios.get(`/project/getAllProject`);
    return data;
  }
}

const projectservices = new ProjectServices();
export default projectservices;
