import ApiSerive from './ApiService';

export const fetchUser = (userId, callback) => {
  try {
    ApiSerive.getUser(userId, callback);
  } catch (err) {
    if (err.response.status === 401) {
      console.log('Пользователь не авторизован!');
    }
  }
};

export const fetchWords = (userId, groupNum, pageNum, limit, callback) => {
  try {
    ApiSerive.getWords(userId, groupNum, pageNum, limit, callback);
  } catch (err) {
    throw err.response;
  }
};

export const fetchAddUserWord = (userId, wordId, difficulty, options) => {
  try {
    ApiSerive.addUserWord(userId, wordId, difficulty, options);
  } catch (err) {
    throw err.response;
  }
};

export const fetchUpdateUserWord = (userId, wordId, difficulty, options) => {
  try {
    ApiSerive.updateUserWord(userId, wordId, difficulty, options);
  } catch (err) {
    throw err.response;
  }
};

export const fetchHardWords = (userId, callback) => {
  try {
    ApiSerive.getHardWords(userId, callback);
  } catch (err) {
    throw err.response;
  }
};
