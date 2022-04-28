import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { getUsername } from '../../features/user/userSlice';

import { APIKey } from '../../common/apis/MovieApiKey';
import movieApi from '../../common/apis/movieApi';
import { FavoritesCard } from '../FavoritesCard/FavoritesCard';

import './Favorites.css';

export const Favorites = () => {
  const username = useSelector(getUsername); // username
  const [list, setList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // сначала получает массив id из ls
    if (JSON.parse(localStorage.getItem(username))) {
      setFavorites(Object.keys(JSON.parse(localStorage.getItem(username)).favorites));
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
        {
          list.length ?
            list.map(movie => {
              return (
                <FavoritesCard key={movie.imdbID} {...movie}></FavoritesCard>
              )
            })
            : <div className="spinner" />
        }
      </div>
    </section>
  );
};
