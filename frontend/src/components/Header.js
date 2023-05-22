import React from 'react';
import headerLogotip from '../images/Vector.png';
import { Link } from 'react-router-dom';

function Header({headerText, linkTo, userEmail, signOut}) {
  return (
    <header  className="header">
      <img  className="header__logotip" src={headerLogotip} alt="Логотип-Место Россия"/>
      <div className="header__info">
        <p className="header__email">{userEmail}</p>
        <button className="header__button" onClick={signOut}>
          <Link className="header__nav" to={linkTo} >{headerText}</Link>
        </button>
      </div>
    </header>
  );
}

export default Header;
