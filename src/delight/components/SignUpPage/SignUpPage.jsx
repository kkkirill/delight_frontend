import React, {useState} from 'react';
import classnames from 'classnames';

import './SignUpPage.css';
import {FileDrop} from 'react-file-drop';
import NavigationPanel from '../../containers/NavigationPanel';
import {Redirect} from 'react-router-dom';

function SignUpPage({register, authentication}) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [secondPassword, setSecondPassword] = useState();

  const onUsernameChange = ({target: {value}}) => {
    setUsername(value);
  };
  const onEmailChange = ({target: {value}}) => {
    setEmail(value);
  };
  const onPasswordChange = ({target: {value}}) => {
    setPassword(value);
  };
  const onSecondPasswordChange = ({target: {value}}) => {
    setSecondPassword(value);
  };

  const onFormSubmit = e => {
    e.preventDefault();

    if (password === secondPassword) {
      register(username, email, password);
    }
  };

  if (authentication.get('status') === 1) {
    return <Redirect to="/"/>;
  }

  return (
    <div className="sign-up">
      <NavigationPanel/>

      <form className="sign-up__form" onSubmit={onFormSubmit}>
        {authentication.getIn(['data', 'username']) && <p
          className="sign-up__error-message">Такой пользователь уже существует</p>}
        <input type="text" placeholder="Имя пользователя" value={username}
               onChange={onUsernameChange} required/>
        {authentication.getIn(['data', 'email']) &&
        <p className="sign-up__error-message">Неверный email</p>}
        <input type="text" placeholder="Ваш email" value={email} onChange={onEmailChange}
               required/>
        <input type="text" placeholder="Пароль" value={password} onChange={onPasswordChange}
               required/>
        {password !== secondPassword &&
        <p className="sign-up__error-message">Пароли не совпадают</p>
        }
        <input
          className={classnames('sign-up__second-password', {'sign-up__wrong-input': password !== secondPassword})}
          type="text"
          placeholder="Пароль ещё раз"
          value={secondPassword}
          onChange={onSecondPasswordChange}
          required/>
        <input className="sign-up__submit" type="submit"/>
      </form>
    </div>
  );
}

export default SignUpPage;