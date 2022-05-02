import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { GoBack } from '../GoBack/GoBack';

import { getUsername } from '../../features/user/userSlice';

import './History.css';

export const History = () => {
  const username = useSelector(getUsername);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // получает массив запросов из ls
    const usernameInLocalStorage = JSON.parse(localStorage.getItem(username));

    if (usernameInLocalStorage) {
      setHistory(Object.keys(usernameInLocalStorage.history));
    }
  }, []);

  return (
    <section className='history'>
      <div className='history__container'>
        <div className="history__card">
          <GoBack />
          <h2 className="history__title">Your search history</h2>
          {
            history.length ?
              history.map(query => {
                return (
                  <div className="history__block" key={query}>
                    <Link to={`/search/${query}`} >
                      <span>{query}</span>
                    </Link>
                  </div>
                )
              })
              : null
          }
        </div>
      </div>
    </section >
  );
};