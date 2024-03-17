import { axios } from '@/lib/axios';

class AuthServices {
  constructor() {}

  signup(userData: object) {
    return axios.post('/auth/signup', userData);
  }

  async login(userData: object) {
    return await axios.post('/auth/login', userData);
  }

  verify(token: string) {
    return axios.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } });
  }
}

const authservices = new AuthServices();
export default authservices;
