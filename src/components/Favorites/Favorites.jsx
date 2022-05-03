import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FavoritesCard } from '../FavoritesCard';
import { GoBack } from '../GoBack';

import { getUsername } from '../../features/user/userSlice';

import { APIKey } from '../../common/apis/MovieApiKey';
import movieApi from '../../common/apis/movieApi';

import './Favorites.css';

export const Favorites = () => {
  const username = useSelector(getUsername);
  const [list, setList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // сначала получает массив id из local storage
    const usernameInLocalStorage = JSON.parse(localStorage.getItem(username))

    if (usernameInLocalStorage) {
      setFavorites(Object.keys(usernameInLocalStorage.favorites));
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async (movieId) => {
      const response = await movieApi.get(`?apiKey=${APIKey}&i=${movieId}`)
        .catch((err) => {
          console.log('Err:', err);
        });
      setList((prev) => ([...prev, response.data]))
    }

    // получает объекты с инфой
    favorites.forEach(movieId => {
      fetchMovies(movieId);
    })
  }, [favorites]);


  return (
    <section className='favorites'>
      <div className='favorites__container'>
        <GoBack />
        <h2 className='favorites__main-title'>Your favorites</h2>
        <div className='favorites__cards'>
          {
            list.length ?
              list.map(movie => {
                return (
                  <FavoritesCard key={movie.imdbID} {...movie}></FavoritesCard>
                )
              })
              : null
          }
        </div>
      </div>
    </section>
  );
};
