import React from 'react';

// styles
import cl from './Team.module.scss';

// image
import developerImage from '../../assets/team/developer.jpg';

function Team() {
  const developers = [
    {
      id: 1,
      name: 'Developer Name',
      imageUrl: developerImage,
      position: 'Developer',
      githubUrl: 'https://github.com/',
      description: [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum vel illo, doloremque, a fugit',
        },
        {
          id: 2,
          text: 'unde amet consectetur temporibus maiores exercitationem numquam? Dignissimos, esse',
        },
        {
          id: 3,
          text: 'cupiditate dolores id fuga architecto rem distinctio?',
        },
      ],
    },
    {
      id: 2,
      name: 'Developer Name',
      imageUrl: developerImage,
      position: 'Developer',
      githubUrl: 'https://github.com/',
      description: [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum vel illo, doloremque, a fugit',
        },
        {
          id: 2,
          text: 'unde amet consectetur temporibus maiores exercitationem numquam? Dignissimos, esse',
        },
        {
          id: 3,
          text: 'cupiditate dolores id fuga architecto rem distinctio?',
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
