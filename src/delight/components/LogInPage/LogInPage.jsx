import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import './LogInPage.css';
import NavigationPanel from '../../containers/NavigationPanel';

function LogInPage({authentication, authenticate, requestToken}) {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    requestToken();
  }, [1]);

  const onLoginInputChange = ({target: {value}}) => {
    setLogin(value);
  };

  const onPasswordInputChange = ({target: {value}}) => {
    setPassword(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    authenticate(login, password);
  };

  if (authentication.get('status') === 1) {
    return <Redirect to="/" />
  }

  const wrongCred = authentication.get('status')+'' === '2';

  return (
    <div className="log-in">
      <NavigationPanel />

      <form className="log-in__form" onSubmit={onSubmit}>
        {wrongCred && <p className="log-in__wrong-cred">Неверно введены данные</p>}
        <input type="text" placeholder="Логин" onChange={onLoginInputChange}/>
        <input type="text" placeholder="Пароль" onChange={onPasswordInputChange}/>
        <input className="log-in__submit" type="submit" />
      </form>
    </div>
  );
}

export default LogInPage;