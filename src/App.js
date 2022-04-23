import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { Favorites } from './components/Favorites/Favorites';
import { History } from './components/History/History';
import { MovieDetails } from './components/MovieDetails/MovieDetails';
import { Login } from './components/Login/Login';
import { SignUp } from './components/Sign-Up/Sign-Up';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

import './App.css';

export const App = () => {
  const [userIsAuth, setUserIsAuth] = useState(false);
  const [username, setUsername] = useState('');

  const userLogOut = () => {
    setUserIsAuth(false);
  }

  const userLogIn = () => {
    setUserIsAuth(true);
  }

  const setUserName = (name) => {
    setUsername(name);
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <Header userIsAuth={userIsAuth} userLogOut={userLogOut} username={username} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login userLogIn={userLogIn} setUserName={setUserName} />} />
          <Route path="/signup" element={<SignUp userLogIn={userLogIn} setUserName={setUserName} />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

