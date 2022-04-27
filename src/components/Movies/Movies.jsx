import React from 'react';
import { useSelector } from 'react-redux';

import { MovieCard } from '../MovieCard/MovieCard';

import { getAllMovies } from '../../features/movies/movieSlice';

import './Movies.css';

export const Movies = () => {
  const movies = useSelector(getAllMovies);

  return (
    <section className="movies">
      {
        movies.Response === 'True' ?
          movies.Search.map(movie => {
            return <MovieCard key={movie.imdbID} {...movie} />
          }) :
          <div className="spinner"></div>
      }
    </section>
  );
};

