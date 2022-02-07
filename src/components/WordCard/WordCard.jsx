import React, { useContext, useEffect, useRef, useState } from 'react';

import ApiService from '../../services/ApiService';
import AuthContext from '../../context';

// styles
import cl from './WordCard.module.scss';

// icons
import iconPlay from '../../assets/wordcard/play.svg';
import iconDifficult from '../../assets/wordcard/difficult.svg';
import iconInDifficult from '../../assets/wordcard/indifficult.svg';
import iconDone from '../../assets/wordcard/done.svg';
import iconInDone from '../../assets/wordcard/indone.svg';
import iconFolder from '../../assets/navigation/folder.svg';

function WordCard({
  word,
  wordId,
  wordTranslate,
  transcription,
  textExample,
  textExampleTranslate,
  textMeaning,
  textMeaningTranslate,
  image,
  audio,
  audioExample,
  audioMeaning,
  userWord,
  isTranslate,
  pageNum,
  groupNum,
  wordsLimit,
  setWords,
}) {
  const { isAuth } = useContext(AuthContext);
  const userId = localStorage.getItem('userId');
  const [options, setOptions] = useState(userWord?.optional || {});
  const [isHardLoading, setIsHardLoading] = useState(false);
  const [isEasyWord, setIsEasyWord] = useState(false);

  const $textExample = useRef();
  const $textMeaning = useRef();

  const removeBtnClasses = [cl.difficult];

  useEffect(() => {
    if ($textExample.current) {
      $textExample.current.innerHTML = textExample;
    }
  }, [$textExample.current]);

  useEffect(() => {
    if ($textMeaning.current) {
      $textMeaning.current.innerHTML = textMeaning;
    }
  }, [$textMeaning.current]);

  const playWordAudio = () => {
    const wordAudio = new Audio();
    wordAudio.src = `${ApiService.API_URL}/${audio}`;
    wordAudio.play();
  };

  const playExampleAudio = () => {
    const exampleAudio = new Audio();
    exampleAudio.src = `${ApiService.API_URL}/${audioExample}`;
    exampleAudio.play();
  };

  const playMeaningAudion = () => {
    const meaningAudio = new Audio();
    meaningAudio.src = `${ApiService.API_URL}/${audioMeaning}`;
    meaningAudio.play();
  };

  const handleAddHardWord = () => {
    setIsHardLoading(true);
    const optional = { ...options, isHard: true };

    ApiService.addUserWord(userId, wordId, 'easy', optional)
      .then(() => {
        ApiService.getWords(userId, groupNum, pageNum, wordsLimit, setWords);
        setOptions(optional);
      })
      .catch((err) => {
        throw err.response;
      })
      .finally(() => {
        setIsHardLoading(false);
      });
  };

  const handleAddEasyWord = () => {
    setIsEasyWord(true);
    const optional = { ...options, isEasy: true };

    ApiService.addUserWord(userId, wordId, 'easy', optional)
      .then(() => {
        ApiService.getWords(userId, groupNum, pageNum, wordsLimit, setWords);
        setOptions(optional);
      })
      .catch((err) => {
        throw err.response;
      })
      .finally(() => {
        setIsEasyWord(false);
      });
  };

  const handleUpdateHardWord = () => {
    setIsHardLoading(true);
    const value = userWord?.optional?.isHard;
    const optional = { ...options, isHard: !value };

    ApiService.updateUserWord(userId, wordId, 'easy', optional)
      .then(() => {
        ApiService.getWords(userId, groupNum, pageNum, wordsLimit, setWords);
        setOptions(optional);
      })
      .catch((err) => {
        throw err.response;
      })
      .finally(() => {
        setIsHardLoading(false);
      });
  };

  const handleUpdateEasyWord = () => {
    setIsEasyWord(true);

    const value = userWord?.optional?.isEasy;
    const optional = { ...options, isEasy: !value };
    ApiService.updateUserWord(userId, wordId, 'easy', optional)
      .then(() => {
        ApiService.getWords(userId, groupNum, pageNum, wordsLimit, setWords);
        setOptions(optional);
      })
      .catch((err) => {
        throw err.response;
      })
      .finally(() => {
        setIsEasyWord(false);
      });
  };

  const handleUpdateHardWordInHardChapter = () => {
    setIsHardLoading(true);
    const value = userWord?.optional?.isHard;
    const optional = { ...options, isHard: !value };

    ApiService.updateUserWord(userId, wordId, 'easy', optional)
      .then(() => {
        ApiService.getHardWords(userId, setWords);
        setOptions(optional);
      })
      .catch((err) => {
        throw err.response;
      })
      .finally(() => {
        setIsHardLoading(false);
      });
  };

  const handleUpdateEasyWordInHardChapter = () => {
    setIsEasyWord(true);

    const value = userWord?.optional?.isEasy;
    const optional = { ...options, isEasy: !value };
    ApiService.updateUserWord(userId, wordId, 'easy', optional)
      .then(() => {
        ApiService.getHardWords(userId, setWords);
        setOptions(optional);
      })
      .catch((err) => {
        throw err.response;
      })
      .finally(() => {
        setIsEasyWord(false);
      });
  };

  return (
    <div className={cl.card}>
      <div className={cl.image}>
        <img src={`${ApiService.API_URL}/${image}`} alt={word} />
      </div>
      <div className={cl.content}>
        <div className={cl.word}>
          <div className={cl.title}>
            <span className={cl.folder}>
              <img src={iconFolder} alt="folder" title={`Раздел ${groupNum + 1}`} />
              <span>{groupNum + 1}</span>
            </span>
            <p className={cl.text}>
              {word}- {transcription}
            </p>
            <button className={cl.play} onClick={playWordAudio}>
              <img src={iconPlay} alt="play" />
            </button>
          </div>
          {isTranslate && <p className={cl.translate}>{wordTranslate}</p>}
        </div>
        <div className={cl.sentence}>
          <div className={cl.text}>
            <p ref={$textExample}>{textExample}</p>
            <button className={cl.play} onClick={playExampleAudio}>
              <img src={iconPlay} alt="play" />
            </button>
          </div>
          {isTranslate && <p className={cl.translate}>{textExampleTranslate}</p>}
        </div>
        <div className={cl.sentence}>
          <div className={cl.text}>
            <p ref={$textMeaning}>{textMeaning}</p>
            <button className={cl.play} onClick={playMeaningAudion}>
              <img src={iconPlay} alt="play" />
            </button>
          </div>
          {isTranslate && <p className={cl.translate}>{textMeaningTranslate}</p>}
        </div>
      </div>
      {isAuth && (
        <div className={cl.buttons}>
          {groupNum === 6 ? (
            <button
              className={removeBtnClasses.join(' ')}
              onClick={handleUpdateHardWordInHardChapter}
              disabled={isHardLoading}
            >
              <img
                src={userWord?.optional?.isHard ? iconInDifficult : iconDifficult}
                alt="difficult"
                title='Добавить в "Cложные слова"'
              />
            </button>
          ) : (
            <button
              className={cl.difficult}
              onClick={userWord?.optional ? handleUpdateHardWord : handleAddHardWord}
              disabled={isHardLoading}
            >
              <img
                src={userWord?.optional?.isHard ? iconInDifficult : iconDifficult}
                alt="difficult"
                title='Добавить в "Cложные слова"'
              />
            </button>
          )}

          {groupNum === 6 ? (
            <button
              className={cl.done}
              onClick={handleUpdateEasyWordInHardChapter}
              disabled={isEasyWord}
            >
              <img
                src={userWord?.optional?.isEasy ? iconInDone : iconDone}
                alt="done"
                title="Отметить как изученное"
              />
            </button>
          ) : (
            <button
              className={cl.done}
              onClick={userWord?.optional ? handleUpdateEasyWord : handleAddEasyWord}
              disabled={isEasyWord}
            >
              <img
                src={userWord?.optional?.isEasy ? iconInDone : iconDone}
                alt="done"
                title="Отметить как изученное"
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default WordCard;
