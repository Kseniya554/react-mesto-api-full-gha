import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Login = ({...props}) => {
  const [userData, setUserData] = useState({
      email: '',
      password: ''
  })
  const [message, setMessage] = useState()

  const handleChange = (e) => {
      const {name, value} = e.target;
      setUserData({
          ...userData,
          [name]: value
      });
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      props.onLoginUser({ password: userData.password, email: userData.email})
  }
 
    return(
      <div className="login">
        <div className="login__form">
          <h3 className="login__title">Вход</h3>
        <form onSubmit={handleSubmit} className="login__container">
          <input className="login__input" required id="email" name="email" type="email" placeholder="Email" value={userData.email} onChange={handleChange} />
          <input className="login__input" required id="password" name="password" type="password" placeholder="Пароль" value={userData.password} onChange={handleChange} />
          <button type="submit" className="login__button">Войти</button>
        </form>
        </div>        
      </div>
    )
  }


export default Login;