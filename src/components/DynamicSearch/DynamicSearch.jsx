import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { GoBack } from '../GoBack/GoBack';
import { APIKey } from '../../common/apis/MovieApiKey';

import './DynamicSearch.css';

export const DynamicSearch = () => {
  const [movies, setMovies] = useState([]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    }
  };

  const handleChange = (value) => {
    fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=${value}`)
      .then(res => res.json())
      .then(body => setMovies(body.Search))
  };

  const movieSearch = useCallback(debounce(handleChange), []);

  return (
    <div className="dynamic-search">
      <div className='container'>
        <div className='dynamic-search__content'>
          <GoBack />
          <h3 className='dynamic-search__title'>This is dynamic search page. Type movie title to get movie cards.</h3>
          <div className="dynamic-search__input-container">
            <input
              className='dynamic-search__input'
              placeholder='Enter your query'
              type="text"
              onChange={(e) => movieSearch(e.target.value)}
            />
          </div>
          <div className="found-movies">
            {
              movies
                ? movies.map(movie => {
                  return (
                    <div className='found-movie' key={movie.imdbID}>
                      <Link to={`/movie/${movie.imdbID}`} className='found-movie__link'>
                        <div className="found-movie__image" >
                          <img src={movie.Poster} alt={movie.Title} />
                        </div>
                        <div className="found-movie__info">
                          <h3 className="found-movie__title">{movie.Title}</h3>
                          <div className="found-movie__year">{movie.Year}</div>
                        </div>
                      </Link>
                    </div>
                  )
                })
                : <div className='found-movie__suggest'>Type more letters to find</div>
            }
          </div>
        </div>
      </div >
    </div>
  );
};

