import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userLogIn, loginError, loginErrorText, redirect } from '../../features/user/userSlice';

import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const logInError = useSelector(loginError);
  const logInErrorText = useSelector(loginErrorText);
  const redirectHome = useSelector(redirect);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogIn(values));
  }

  const handleUsernameInputChange = (e) => {
    setValues({ ...values, username: e.target.value })
  }

  const handlePasswordInputChange = (e) => {
    setValues({ ...values, password: e.target.value })
  }

  const goHome = () => navigate('/', { replace: true });

  useEffect(() => {
    if (redirectHome) {
      goHome();
    }
  }, [redirectHome]);

  return <section className="login">
    <div className="login_window">
      <h2 className="login__header">Login</h2>
      <p className="login__text">Enter your name and password.</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          onChange={handleUsernameInputChange}
          value={values.username}
          className="login__input"
          type="text"
          placeholder="Username"
          required />
        <input
          onChange={handlePasswordInputChange}
          value={values.password}
          className="login__input"
          type="password"
          placeholder="Password"
          required />
        <button className="login__btn" type="submit">Login</button>
      </form>
      <p className="login__suggest">Don't have an account yet?
        <Link to="/signup" className="login__link">Sign Up</Link>
      </p>
      {logInError ? <div className="login__error">{logInErrorText}</div> : null}
    </div>
  </section>
}


