import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { removeFromUserFavorites } from '../../features/user/userSlice';

import './FavoritesCard.css';

export const FavoritesCard = (movie) => {
  const [removeActive, setRemoveActive] = useState(true);
  const dispatch = useDispatch();
  const {
    Title: title,
    Actors: actors,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbID,
    imdbRating } = movie;

  const handleClick = () => {
    dispatch(removeFromUserFavorites(`${imdbID}`))
    setRemoveActive(false);
  }

  return (
    <div className="favorites__card-container" key={imdbID}>
      <Link to={`/movie/${imdbID}`} >
        <div className="favorites__card">
          <div className="favorites__image" style={{ backgroundImage: `url(${poster})` }}></div>
          <div className="favorites__info">
            <h2 className="favorites__block favorites__title">{title}</h2>
            <p className="favorites__block"><i>{year} / {imdbRating}</i></p>
            <p className="favorites__block">{actors}</p>
            <p className="favorites__block">{runtime}</p>
          </div>
        </div>
      </Link>
      <button
        className=
        {
          removeActive
            ? "remove-from-favorites active"
            : "remove-from-favorites"
        }
        onClick={handleClick}></button>
    </div>
  );
};


FavoritesCard.propTypes = {
  movie: PropTypes.objectOf(PropTypes.string),
  Title: PropTypes.string,
  Actors: PropTypes.string,
  Year: PropTypes.string,
  Poster: PropTypes.string,
  Runtime: PropTypes.string,
  imdbID: PropTypes.string,
  imdbRating: PropTypes.string,
}