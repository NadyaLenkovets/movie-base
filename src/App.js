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
import { SearchList } from './components/SearchList/SearchList';

import './App.css';

export const App = () => {
  const [isAuthUser, setisAuthUser] = useState(false);
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState('dark'); // контекст

  const userLogOut = () => {
    setisAuthUser(false);
  }

  const userLogIn = () => {
    setisAuthUser(true);
  }

  const setUserName = (name) => {
    setUsername(name);
  }

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className="app">
          <Header isAuthUser={isAuthUser} userLogOut={userLogOut} username={username} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login userLogIn={userLogIn} setUserName={setUserName} />} />
            <Route path="/signup" element={<SignUp userLogIn={userLogIn} setUserName={setUserName} />} />
            <Route path="/search/:name" element={<SearchList />} />
            <Route path="/movie/:imdbID" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export const ThemeContext = React.createContext();