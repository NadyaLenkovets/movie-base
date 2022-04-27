import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userSignUp, loginError, loginErrorText, redirect } from '../../features/user/userSlice';

import './Sign-Up.css';

export const SignUp = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const logInError = useSelector(loginError);
  const logInErrorText = useSelector(loginErrorText);
  const redirectHome = useSelector(redirect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignUp(values));
  }

  const handleUsernameInputChange = (e) => {
    setValues({ ...values, username: e.target.value })
  }

  const handlePasswordInputChange = (e) => {
    setValues({ ...values, password: e.target.value })
  }

  const goHome = () => navigate('/', { replace: true });

  useEffect(() => {  // переход на Home 
    if (redirectHome) {
      goHome();
    }
  }, [redirectHome]);


  return <section className="sign-up">
    <div className="sign-up_window">
      <h2 className="sign-up__header">Sign Up</h2>
      <p className="sign-up__text">Create an account.</p>

      <form onSubmit={handleSubmit} className="sign-up__form">
        <input
          onChange={handleUsernameInputChange}
          value={values.username}
          className="sign-up__input"
          type="text"
          placeholder="Username"
          required />
        <input
          onChange={handlePasswordInputChange}
          value={values.password}
          className="sign-up__input"
          type="password"
          placeholder="Password"
          required />
        <button className="sign-up__btn" type="submit">Sign Up</button>
      </form>
      <p className="sign-up__suggest">Already have an account?
        <Link to="/login" className="sign-up__link">Login</Link>
      </p>
      {logInError ? <div className="login__error">{logInErrorText}</div> : null}
    </div>
  </section>
}


