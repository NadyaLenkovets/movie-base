import React from 'react';

import { MovieCard } from '../MovieCard/MovieCard';

import './Movies.css';

export const Movies = (data) => {
  const { movies } = data;

  return (
    <section className="movies">
      {
        movies ?
          movies.map(movie => {
            return <MovieCard key={movie.imdbID} {...movie} />
          })
          :
          <div className="spinner" />
      }
    </section>
  );
};

