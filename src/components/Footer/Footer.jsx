import React from 'react';

// styles
import cl from './Footer.module.scss';

import githubLogo from '../../assets/footer/github.svg';
import rssLogo from '../../assets/footer/rss.svg';

function Footer() {
  return (
    <div className={cl.footer}>
      <div className={cl.content}>
        <a href="https://github.com/h4rb4rd" className={cl.github}>
          <img src={githubLogo} alt="github" />
        </a>
        <div>&copy; 2022</div>
        <a href="https://rs.school/js/" className={cl.rss}>
          <img src={rssLogo} alt="Rolling Scopes School" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
