import React from 'react';

// styles
import cl from './Team.module.scss';

// image
import developerImage from '../../assets/team/developer.jpg';

function Team() {
  const developers = [
    {
      name: 'Developer Name',
      imageUrl: developerImage,
      position: 'Developer',
      githubUrl: 'https://github.com/',
      description: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum vel illo, doloremque, a fugit',
        'unde amet consectetur temporibus maiores exercitationem numquam? Dignissimos, esse',
        'cupiditate dolores id fuga architecto rem distinctio?',
      ],
    },
    {
      name: 'Developer Name',
      imageUrl: developerImage,
      position: 'Developer',
      githubUrl: 'https://github.com/',
      description: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum vel illo, doloremque, a fugit',
        'unde amet consectetur temporibus maiores exercitationem numquam? Dignissimos, esse',
        'cupiditate dolores id fuga architecto rem distinctio?',
      ],
    },
  ];

  return (
    <div className={cl.team}>
      <h2 className={cl.title}>О команде</h2>
      <div className={cl.content}>
        {developers.map((developer) => {
          return <Developer {...developer} />;
        })}
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
        {description.map((text) => {
          return <li>{text}</li>;
        })}
      </ul>
    </div>
  );
}

export default Team;
