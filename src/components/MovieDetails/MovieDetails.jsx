import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { GoBack } from '../GoBack';

import { ThemeContext } from '../../App';
import { toUserFavorites, isUserAuth } from '../../features/user/userSlice';
import { moviesAPI } from '../../common/apis/moviesAPI';

import './MovieDetails.css';

export const MovieDetails = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isUserAuth);
  const { imdbID } = useParams();
  const { theme, setTheme } = useContext(ThemeContext);
  const { data, isLoading } = moviesAPI.useFetchOneMovieQuery(`${imdbID}`);
  const [removeActive, setRemoveActive] = useState(true);

  const themeToggle = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }

  if (isLoading) {
    return <div className='spinner' style={{
      top: '50px',
      position: 'relative',
      zIndex: '1'
    }} />;
  }

  const {
    actors,
    boxOffice,
    country,
    director,
    genre,
    plot,
    poster,
    released,
    title,
    year,
    imdbRating,
    runtime
  } = data;

  const handleClick = () => {
    dispatch(toUserFavorites(`${imdbID}`));
    setRemoveActive(() => !removeActive);
  }


  return (
    <section className='details'
      style={{ backgroundImage: `url(${poster})` }}>
      <div className='container details-container'>
        <div className=
          {theme === 'dark' ? 'details__card dark' : 'details__card light'}>
          <div className='details__info'>
            <div className='details__controls'>
              <GoBack />
              <div className='details__buttons'>
                <button
                  className='theme-toggler'
                  onClick={themeToggle}>
                  {theme === 'dark' ? 'Light' : 'Dark'} mode
                </button>
                {isAuth
                  ? <button className=
                    {
                      removeActive
                        ? 'to-favorites'
                        : 'to-favorites active'
                    }
                    onClick={handleClick}></button>
                  : <Link to={`/login`} >
                    <button className='to-favorites'></button>
                  </Link>
                }
              </div>
            </div>
            <h2 className='details__title'>{title}</h2>
            <div className='details__describe'>
              <i>{runtime} / {genre}</i>
            </div>
            <div className='details__block'><span>Cast:</span> {actors}</div>
            <div className='details__block'><span>Country:</span> {country}</div>
            <div className='details__block'><span>Director:</span> {director}</div>
            <div className='details__block'><span>Year:</span> {year}</div>
            <div className='details__block'><span>Released:</span> {released}</div>
            <div className='details__block'><span>BoxOffice:</span> {boxOffice}</div>
            <div className='details__block'><span>imdbRating:</span> {imdbRating}</div>
            <div className='details__block'><span>Plot:</span> {plot}</div>
          </div>
          <div className='details__image'>
            <img src={poster} alt={title} />
          </div>
        </div>
      </div>
    </section >
  );
};
