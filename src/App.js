import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from './components/Home';
import { Header } from './components/Header';
import { Favorites } from './components/Favorites';
import { History } from './components/History';
import { MovieDetails } from './components/MovieDetails';
import { Login } from './components/Login';
import { SignUp } from './components/Sign-Up';
import { PageNotFound } from './components/PageNotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SearchList } from './components/SearchList';
import { DynamicSearch } from './components/DynamicSearch';

import './App.css';


export const App = () => {
  const [theme, setTheme] = useState('dark'); // контекст

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className='app'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/search/:name' element={<SearchList />} />
            <Route path='/dynamic-search' element={<DynamicSearch />} />
            <Route path='/movie/:imdbID' element={<MovieDetails />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/history' element={<History />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export const ThemeContext = React.createContext();