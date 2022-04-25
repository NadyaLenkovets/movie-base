import React, { useState } from "react";
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';

import { MovieCard } from '../MovieCard/MovieCard';
import { useFetch } from "../../common/useFetch";

import './SearchList.css';


export const SearchList = () => {
	const [type, setType] = useState('');
	const [query, setQuery] = useState('');
	const { name } = useParams();
	const { movies } = useFetch(name, type);
	const navigate = useNavigate();

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
					<button className="search__btn">Search</button>
				</Link>
			</div>
			<div className="search-list__filters">
				<button className="search-list__button" onClick={() => setType('')}>All</button>
				<button className="search-list__button" onClick={() => setType('movie')}>Movies</button>
				<button className="search-list__button" onClick={() => setType('series')}>Series</button>
			</div>
			<div className="search-list__cards">
				{
					movies.length ?
						movies.map(movie => {
							return <MovieCard key={movie.imdbID} {...movie} />
						}) :
						<div className="spinner" />
				}
			</div>
		</section>
	);
};
