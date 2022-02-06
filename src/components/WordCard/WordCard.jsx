import React, { useContext, useEffect, useRef, useState } from 'react';

import ApiSerives from '../../services/ApiService';
import AuthContext from '../../context';

import { fetchAddUserWord, fetchUpdateUserWord } from '../../services/fetchService';
// styles
import cl from './WordCard.module.scss';

// icons
import iconPlay from '../../assets/wordcard/play.svg';
import iconDifficult from '../../assets/wordcard/difficult.svg';
import iconInDifficult from '../../assets/wordcard/indifficult.svg';
import iconDone from '../../assets/wordcard/done.svg';
import iconInDone from '../../assets/wordcard/indone.svg';
import iconFolder from '../../assets/navigation/folder.svg';
import iconRemove from '../../assets/wordcard/remove.svg';

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
  groupNum,
}) {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const userId = localStorage.getItem('userId');
  const [isHard, setIsHard] = useState(userWord?.optional?.isHard);
  const [isEasy, setIsEasy] = useState(userWord?.optional?.isEasy);
  const [options, setOptions] = useState(userWord?.optional || {});

  const $textExample = useRef();
  const $textMeaning = useRef();

  const removeBtnClasses = [cl.difficult];
  if (!isHard) {
    removeBtnClasses.push(cl.gray);
  }

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
    wordAudio.src = `${ApiSerives.API_URL}/${audio}`;
    wordAudio.play();
  };

  const playExampleAudio = () => {
    const exampleAudio = new Audio();
    exampleAudio.src = `${ApiSerives.API_URL}/${audioExample}`;
    exampleAudio.play();
  };

  const playMeaningAudion = () => {
    const meaningAudio = new Audio();
    meaningAudio.src = `${ApiSerives.API_URL}/${audioMeaning}`;
    meaningAudio.play();
  };

  const handleAddHardWord = () => {
    const optional = { ...options, isHard: true };
    fetchAddUserWord(userId, wordId, 'hard', optional);
    setIsHard(true);
    setOptions(optional);
  };

  const handleAddEasyWord = () => {
    const optional = { ...options, isEasy: true };
    fetchAddUserWord(userId, wordId, 'easy', optional);
    setIsEasy(true);
    setOptions(optional);
  };

  const handleUpdateHardWord = () => {
    const value = userWord?.optional?.isHard;
    const optional = { ...options, isHard: !value };
    fetchUpdateUserWord(userId, wordId, 'hard', optional);
    setIsHard(true);
    setOptions(optional);
  };

  const handleUpdateEasyWord = () => {
    const value = userWord?.optional?.isEasy;
    const optional = { ...options, isEasy: !value };
    fetchUpdateUserWord(userId, wordId, 'easy', optional);
    setIsEasy(true);
    setOptions(optional);
  };

  const handleRemoveHardWord = async () => {
    const optional = { ...options, isHard: false };
    await fetchUpdateUserWord(userId, wordId, 'easy', optional);
    setIsHard(false);
    setOptions(optional);
  };

  return (
    <div className={cl.card}>
      <div className={cl.image}>
        <img src={`${ApiSerives.API_URL}/${image}`} alt={word} />
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
              onClick={handleRemoveHardWord}
              disabled={!isHard}
            >
              <img src={iconRemove} alt="difficult" title='Удалить из раздела "Cложные слова"' />
            </button>
          ) : (
            <button
              className={cl.difficult}
              onClick={isEasy || isHard ? handleUpdateHardWord : handleAddHardWord}
              disabled={isHard}
            >
              <img
                src={isHard ? iconInDifficult : iconDifficult}
                alt="difficult"
                title='Добавить в "Cложные слова"'
              />
            </button>
          )}

          <button
            className={cl.done}
            onClick={isEasy || isHard ? handleUpdateEasyWord : handleAddEasyWord}
            disabled={isEasy}
          >
            <img src={isEasy ? iconInDone : iconDone} alt="done" title="Отметить как изученное" />
          </button>
        </div>
      )}
    </div>
  );
}

export default WordCard;
