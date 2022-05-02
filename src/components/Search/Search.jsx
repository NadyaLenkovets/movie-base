import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { toUserHistory } from '../../features/user/userSlice';

import './Search.css';

export const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return <div className='search'>
    <div>
      <input
        className='searchInput'
        type='text'
        placeholder='Type your movie title'
        onChange={handleChange}
      />
      <Link to={`/search/${query}`}>
        <button className='search__btn' onClick={() => dispatch(toUserHistory(`${query}`))}>Search</button>
      </Link>
    </div>
    <div>
      <Link to={`/dynamic-search`}>
        <button className='search__btn dynamic-search__btn'>Dynamic search</button>
      </Link>
    </div>
  </div>
}

