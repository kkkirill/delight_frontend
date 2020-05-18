import React from 'react';
import {Link} from 'react-router-dom';

import './NavigationPanel.css';
import Dropdown from '../Dropdown/Dropdown';

function NavigationPanel({authentication, logOut}) {
  const onLogOutButtonClick = () => {
    logOut(authentication.get('data').token);
  }

  return (
    <div className="navigation">
      <div className="navigation__main-section">
        <Link to="/" className="navigation__item-container">
          <p className="navigation__item">Delight</p>
        </Link>
      </div>
      <div className="navigation__profile-section">
        {authentication.get('status') === 1 ?
          (<>
            <Link to={"/profile/" + authentication.getIn(['data', 'id'])} className="navigation__item-container">
              <p className="navigation__item">Профиль</p>
            </Link>
            <Dropdown title="Мой аккаунт" icon={authentication.getIn(['user', 'photo'])}
             className="navigation__item-container"
                      itemClassName="navigation__item">
              <Link to={"/profile/" + authentication.getIn(['data', 'id'])}>
                <button className="navigation__subitem">
                  <p className="navigation__subitem-text">Профиль</p>
                </button>
              </Link>
              <button className="navigation__subitem" onClick={onLogOutButtonClick}>
                <p className="navigation__subitem-text">Выйти</p>
              </button>
            </Dropdown>
          </>)
          :
          (<>
            <Link to="/signup" className="navigation__item-container">
              <p className="navigation__item">Регистрация</p>
            </Link>
            <Link to="/login" className="navigation__item-container">
              <p className="navigation__item">Вход</p>
            </Link>
          </>)
        }
      </div>
    </div>
  );
}

export default NavigationPanel;