import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUsername } from '../../features/user/userSlice';

import './History.css';

export const History = () => {
  const username = useSelector(getUsername);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // получает массив запросов из ls
    if (JSON.parse(localStorage.getItem(username))) {
      setHistory(Object.keys(JSON.parse(localStorage.getItem(username)).history));
    }
  }, []);

  return (
    <section className='history'>
      <div className='history__container'>
        <div className="history__card">
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
              : <div className="spinner" />
          }
        </div>
      </div>
    </section >
  );
};