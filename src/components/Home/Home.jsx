import React from 'react';

import { Search } from '../Search';
import { Movies } from '../Movies';

import { moviesAPI } from '../../common/apis/moviesAPI';

import './Home.css';

export const Home = () => {
  const { data } = moviesAPI.useFetchAllMoviesQuery('');

  return (
    <main className='main container'>
      <div className='greeting'>
        <span>Movie Base</span> is the world's most popular and authoritative source for movie, TV and celebrity content, designed to help fans explore the world of movies and shows and decide what to watch.
      </div>
      <div className='greeting'>
        Our searchable database includes millions of movies, TV and entertainment programs and cast and crew members. Enjoy!
      </div>
      <Search />
      <h2 className='recommendation'>Today's recommendation:</h2>
      <Movies movies={data} />
    </main>
  );
};

