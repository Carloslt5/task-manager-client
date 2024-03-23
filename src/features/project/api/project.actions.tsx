import { sleep } from '@/helpers/sleep';
import { axios } from '@/lib/axios';

class ProjectServices {
  constructor() {}

  async getProjects(): Promise<Project[]> {
    await sleep(3);
    const {
      data: { data },
    } = await axios.get<{ data: Project[] }>(`/project/getAllProject`);
    return data;
  }

  async createProject(projectData: ProjectNotID): Promise<Project[]> {
    const {
      data: { data },
    } = await axios.post<{ data: Project[] }>(`/project/createProject`, projectData);
    return data;
  }
}

const projectservices = new ProjectServices();
export default projectservices;
