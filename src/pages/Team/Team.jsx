import React from 'react';

// styles
import cl from './Team.module.scss';

// image
import developerImage from '../../assets/team/developer.jpg';

// avatars
import tleadAva from '../../assets/team/ava-tlead.jpg';
import avaYuliya from '../../assets/team/ava-yuliya.jpg';
import avaMaks from '../../assets/team/ava-maks.jpg';

function Team() {
  const developers = [
    {
      id: 1,
      name: 'Александр Данилов',
      imageUrl: tleadAva,
      position: 'Team leader',
      githubUrl: 'https://github.com/h4rb4rd',
      description: [
        {
          id: 1,
          text: 'Авторизация',
        },
        {
          id: 2,
          text: 'Электронный учебник',
        },
        {
          id: 3,
          text: 'Статистика',
        },
        {
          id: 4,
          text: 'Общий дизайн',
        },
      ],
    },
    {
      id: 2,
      name: 'Юлия Каримова',
      imageUrl: avaYuliya,
      position: 'Developer',
      githubUrl: 'https://github.com/yuliya-karimova',
      description: [
        {
          id: 1,
          text: 'Игра "Аудиовызов"',
        },
        {
          id: 2,
          text: 'Презентация',
        },
        {
          id: 3,
          text: 'Дизайн игры "Аудиовызов"',
        },
      ],
    },
    {
      id: 3,
      name: 'Максим Романенко',
      imageUrl: avaMaks,
      position: 'Developer',
      githubUrl: 'https://github.com/Mrak9087',
      description: [
        {
          id: 1,
          text: 'Игра "Спринт"',
        },
        {
          id: 2,
          text: 'Создание копии бэкенда',
        },
        {
          id: 3,
          text: 'Дизайн игры "Спринт"',
        },
      ],
    },
  ];

  return (
    <div className={cl.team}>
      <div className={cl.wrapper}>
        <h2 className={cl.title}>О команде</h2>
        <div className={cl.content}>
          {developers.map(({ id, ...rest }) => {
            return <Developer key={id} {...rest} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Developer({ name, imageUrl, position, githubUrl, description }) {
  return (
    <div className={cl.developer}>
      <img className={cl.image} src={imageUrl} alt="developer" />
      <p className={cl.name}>{name}</p>
      <p className={cl.position}>{position}</p>
      <a className={cl.github} href={githubUrl}>
        Github
      </a>
      <ul className={cl.description}>
        {description.map(({ id, text }) => {
          return <li key={id}>{text}</li>;
        })}
      </ul>
    </div>
  );
}

export default Team;
