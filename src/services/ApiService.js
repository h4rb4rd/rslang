import axios from 'axios';

export default class ApiSerives {
  static API_URL = 'https://react-learnwords-example.herokuapp.com';

  static TOKEN = localStorage.getItem('token');

  static authInstance = axios.create({
    baseURL: this.API_URL,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });

  static dataInstance = axios.create({
    baseURL: this.API_URL,
    headers: {
      Authorization: `Bearer ${this.TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  static signup = async (name, email, password) => {
    const response = await this.authInstance.post('/users', { name, email, password });
    return response;
  };

  static async login(email, password) {
    const response = await this.authInstance.post('/signin', { email, password });
    return response;
  }

  static async getUser(id) {
    const response = await this.dataInstance.get(`/users/${id}`);
    return response;
  }
}

// Alex3124 Alex3124@mail.com A@ktrc3124
