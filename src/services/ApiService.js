import axios from 'axios';

export default class ApiSerive {
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

  static async getUser(userId, callback) {
    const response = await axios.get(`/users/${userId}`, {
      baseURL: this.API_URL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    callback(response.data);
  }

  static async getWords(userId, groupNum, pageNum, limit, callback) {
    const response = await axios.get(
      `/users/${userId}/aggregatedWords?group=${groupNum}&page=${pageNum}&wordsPerPage=${limit}`,
      {
        baseURL: this.API_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data[0].paginatedResults);
    callback(response.data[0].paginatedResults);
  }

  static async getHardWords(userId, callback) {
    const response = await axios.get(
      `/users/${userId}/aggregatedWords?filter={"$and":[{ "userWord.optional.isHard":true}]}`,
      {
        baseURL: this.API_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    callback(response.data[0].paginatedResults);
  }

  static async addUserWord(userId, wordId, difficulty, options) {
    await this.dataInstance.post(`/users/${userId}/words/${wordId}`, {
      difficulty,
      optional: options,
    });
  }

  static async updateUserWord(userId, wordId, difficulty, options) {
    await this.dataInstance.put(`/users/${userId}/words/${wordId}`, {
      difficulty,
      optional: options,
    });
  }
}

// Alexand1234 Alexand1234@mail.com A@lexand1234
