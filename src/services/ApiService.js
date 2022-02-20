import axios from 'axios';

export default class ApiService {
  static API_URL = 'https://react-learnwords-example.herokuapp.com';

  static authInstance = axios.create({
    baseURL: this.API_URL,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
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
    try {
      const response = await axios.get(`/users/${userId}`, {
        baseURL: this.API_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      callback(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        console.log('Пользователь не авторизован!');
      }
    }
  }

  static async getWords(userId, groupNum, pageNum, limit, callback) {
    try {
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

      callback(response.data[0].paginatedResults);
    } catch (err) {
      throw err.response;
    }
  }

  static async getNonEasyWords(userId, groupNum, pageNum, limit, callback) {
    try {
      const response = await axios.get(
        `/users/${userId}/aggregatedWords?group=${groupNum}&page=${pageNum}&wordsPerPage=${limit}&filter={"$or":[{ "userWord.optional.isEasy":false},{"userWord.optional.isEasy":null},{"userWord":null}]}`,

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
    } catch (err) {
      throw err.response;
    }
  }

  static async getUnauthorizedWords(groupNum, pageNum, callback) {
    try {
      const response = await this.authInstance.get(`/words?group=${groupNum}&page=${pageNum}`);
      callback(response.data);
    } catch (err) {
      throw err.response;
    }
  }

  static async getHardWords(userId, callback) {
    try {
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
    } catch (err) {
      throw err.response;
    }
  }

  static async getEasyWords(userId, callback) {
    try {
      const response = await axios.get(
        `/users/${userId}/aggregatedWords?filter={"$and":[{ "userWord.optional.isEasy":true}]}`,
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
    } catch (err) {
      throw err.response;
    }
  }

  static async addUserWord(userId, wordId, difficulty, options) {
    try {
      await axios.post(
        `/users/${userId}/words/${wordId}`,
        {
          difficulty,
          optional: options,
        },
        {
          baseURL: this.API_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      throw err.response;
    }
  }

  static async updateUserWord(userId, wordId, difficulty, options) {
    try {
      await axios.put(
        `/users/${userId}/words/${wordId}`,
        {
          difficulty,
          optional: options,
        },
        {
          baseURL: this.API_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      throw err.response;
    }
  }

  static async getStatistics(userId, callback) {
    try {
      const response = await axios.get(`/users/${userId}/statistics`, {
        baseURL: this.API_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      callback(response.data);
    } catch (err) {
      throw err.response;
    }
  }

  static async updateUserStatistic(userId, learnedWords, options) {
    try {
      await axios.put(
        `/users/${userId}/statistics`,
        {
          learnedWords,
          optional: options,
        },
        {
          baseURL: this.API_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      throw err.response;
    }
  }

  static async getUserSettings(userId, callback) {
    try {
      const response = await axios.get(`/users/${userId}/settings`, {
        baseURL: this.API_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      callback(response.data);
      return response;
    } catch (err) {
      throw err.response;
    }
  }

  static async updateUserSettings(userId, options) {
    try {
      await axios.put(
        `/users/${userId}/settings`,
        {
          optional: options,
        },
        {
          baseURL: this.API_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      throw err.response;
    }
  }
}

// Alexand9999 Alexand9999@mail.com A@lexand9999
