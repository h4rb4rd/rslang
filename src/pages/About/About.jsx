import React from 'react';
import { Link } from 'react-router-dom';

// styles
import cl from './About.module.scss';

// icons
import charity from '../../assets/about/charity.svg';
import gamepad from '../../assets/about/gamepad.svg';
import statstics from '../../assets/about/statistics.svg';
import book from '../../assets/about/book.svg';

// components
import Logo from '../../components/Logo';

function About() {
  return (
    <div className={cl.about}>
      <div className={cl.content}>
        <Logo />
        <h3 className={cl.offer}>
          Учите языки бесплатно, весело и <br /> эффективно!
        </h3>
        <Advantages />
      </div>
      <div className={cl.close}>
        <Link to="/">&#10006;</Link>
      </div>
    </div>
  );
}

function Advantage({ iconPath, iconAlt, title, text }) {
  return (
    <div className={cl.advantage}>
      <img className={cl.icon} src={iconPath} alt={iconAlt} />
      <h3 className={cl.title}>{title}</h3>
      <p className={cl.text}>{text}</p>
    </div>
  );
}

function Advantages() {
  return (
    <div className={cl.advantages}>
      <Advantage
        iconPath={charity}
        iconAlt="charity"
        title="Бесплатный доступ"
        text="Наша миссия — сделать обучения языкам доступным для каждого"
      />
      <Advantage
        iconPath={gamepad}
        iconAlt="gamepad"
        title="Обучение в игре"
        text="Игровая механика доказала свою эффективность для всех возрастов"
      />
      <Advantage
        iconPath={book}
        iconAlt="book"
        title="Собственный словарь"
        text="Повторяй слова, используй их почаще и старайся создавать с их помощью новые предложения."
      />
      <Advantage
        iconPath={statstics}
        iconAlt="statstics"
        title="Статистика обучения"
        text="Поставив цель, ты сможешь следить за своим прогрессом."
      />
    </div>
  );
}

export default About;
