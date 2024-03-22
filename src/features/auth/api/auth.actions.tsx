import { axios } from '@/lib/axios';

class AuthServices {
  constructor() {}

  async signup(userData: object) {
    return await axios.post('/auth/signup', userData);
  }

  async login(userData: object) {
    return await axios.post('/auth/login', userData);
  }

  async verify(token: string) {
    return await axios.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } });
  }
}

const authservices = new AuthServices();
export default authservices;
