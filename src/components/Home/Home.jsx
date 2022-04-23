import React, { useState, useEffect, useCallback } from 'react';

import { Search } from "../Search/Search";
import { Movies } from "../Movies/Movies";
import { useDispatch } from 'react-redux';

import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/MovieApiKey';
import { addMovies } from '../../features/movies/movieSlice';

import "./Home.css";

export const Home = () => {
	const movieText = 'captain_america';
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchMovies = async () => {
			const response = await movieApi.get(`?apiKey=${APIKey}&s=${movieText}&type=movie`)
				.catch((err) => {
					console.log('Err:', err);
				});
			// console.log(response);
			dispatch(addMovies(response.data));
		}

		fetchMovies();
	}, []);

	return (
		<main className="main container">
			<div className="greeting">
				<span>Movie Base</span> is the world's most popular and authoritative source for movie, TV and celebrity content, designed to help fans explore the world of movies and shows and decide what to watch.
			</div>
			<div className="greeting">
				Our searchable database includes millions of movies, TV and entertainment programs and cast and crew members. Enjoy!
			</div>
			<Search />
			<Movies />
		</main>
	);
};

