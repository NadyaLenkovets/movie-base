import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './MovieCard.css';

export const MovieCard = (props) => {
  const {
    poster,
    imdbID
  } = props;

  return (
    <div className='movie__item' >
      <div className='movie__image'>
        <img src={poster} alt='No poster'></img>
      </div>
      <Link to={`/movie/${imdbID}`} >
        <button className='btn more-button'>More</button>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.string),
  imdbID: PropTypes.string,
  Poster: PropTypes.string,
}