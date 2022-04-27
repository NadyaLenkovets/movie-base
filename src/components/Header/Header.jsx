import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { isUserAuth, getUsername, userLogOut } from '../../features/user/userSlice';

import './Header.css';


export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isUserAuth);
  const username = useSelector(getUsername);

  return (
    <header className="header container">
      <div className="headerLogo">
        <Link to="/" className="logoLink">Movie Base</Link>
      </div>

      {
        isAuth
          ? <>
            <div className="header__username">{username}</div>
            <div className="headerButtons">
              <Link to="/favorites" className="header__btn ">Favorites</Link>
              <Link to="/history" className="header__btn ">History</Link>
              <Link to="/" className="header__btn" onClick={dispatch(userLogOut)}>Log Out</Link>
            </div>
          </>
          : <div className="headerButtons">
            <Link to="/login" className="header__btn">Login</Link>
            <Link to="/signup" className="header__btn">Sign Up</Link>
          </div>
      }
    </header>
  );
};
