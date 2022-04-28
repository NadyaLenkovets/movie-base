import React, { useState } from "react";
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { toUserHistory } from '../../features/user/userSlice';
import { MovieCard } from '../MovieCard/MovieCard';
import { useFetch } from "../../common/useFetch";

import './SearchList.css';


export const SearchList = () => {
  const [type, setType] = useState('');
  const [query, setQuery] = useState('');
  const { name } = useParams();
  const { data, error } = useFetch(name, type);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => navigate(-1);

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <section className="search-list container">
      <button className='back' onClick={goBack}>Back</button>
      <div className="search-list__search">
        <input
          className="searchInput"
          type="text"
          placeholder="Type your movie title"
          onChange={handleChange}
        />
        <Link to={`/search/${query}`}>
          <button className="search__btn" onClick={() => dispatch(toUserHistory(`${query}`))}>Search</button>
        </Link>
      </div>
      <div className="search-list__filters">
        <button className="search-list__button" onClick={() => setType('')}>All</button>
        <button className="search-list__button" onClick={() => setType('movie')}>Movies</button>
        <button className="search-list__button" onClick={() => setType('series')}>Series</button>
      </div>
      <div className="search-list__cards">
        {
          data ?
            data.map(movie => {
              return <MovieCard key={movie.imdbID} {...movie} />
            }) :
            <div className="spinner" />
        }
      </div>
      {error ? <div className="search-list__error">Error</div> : null}
    </section>
  );
};
