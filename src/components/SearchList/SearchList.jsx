import React, { useState } from "react";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { GoBack } from '../GoBack/GoBack';

import { useFetch } from "../../common/useFetch";
import { toUserHistory } from '../../features/user/userSlice';

import './SearchList.css';


export const SearchList = () => {
  const [type, setType] = useState('');
  const [query, setQuery] = useState('');
  const { name } = useParams();
  const { data, error } = useFetch(name, type);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <section className="search-list container">
      <GoBack />
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
              return (
                <div className="movie__item" key={movie.imdbID}>
                  <div className="movie__image">
                    <img src={movie.Poster} alt="No poster"></img>
                  </div>
                  <Link to={`/movie/${movie.imdbID}`} >
                    <button className="btn more-button">More</button>
                  </Link>
                </div>
              )
            }) :
            <div className="spinner" />
        }
      </div>
      {error ? <div className="search-list__error">Error</div> : null}
    </section>
  );
};
