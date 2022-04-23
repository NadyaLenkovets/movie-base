import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { APIKey } from '../../common/apis/MovieApiKey';

import './MovieDetails.css';

export const MovieDetails = () => {
	const navigate = useNavigate();
	const { imdbID } = useParams();
	const [movieDetails, setMovieDetails] = useState([]);
	const {
		Actors,
		BoxOffice,
		Country,
		Director,
		Genre,
		Plot,
		Poster,
		Released,
		Title,
		Year,
		imdbRating,
		Runtime
	} = movieDetails;
	// console.log(movieDetails);

	const goBack = () => navigate(-1);

	useEffect(() => {
		fetch(`http://www.omdbapi.com/?apikey=${APIKey}&i=${imdbID}&plot=full`)
			.then(responce => responce.json())
			.then((body) => setMovieDetails(body))
		// .then((body) => console.log(body)) //!
	}, []);

	return (
		<section className='details'
			style={{ backgroundImage: `url(${Poster})` }}>
			{movieDetails.Title
				? <div className="container details-container">
					<div className="details__card">
						<div className="details__info">
							<div className='back' onClick={goBack}>Back</div>
							<h2 className="details__title">{Title}</h2>
							<div className="details__describe">
								<i>{Runtime} / {Genre}</i>
							</div>
							<div className="details__block"><span>Cast:</span> {Actors}</div>
							<div className="details__block"><span>Country:</span> {Country}</div>
							<div className="details__block"><span>Director:</span> {Director}</div>
							<div className="details__block"><span>Year:</span> {Year}</div>
							<div className="details__block"><span>Released:</span> {Released}</div>
							<div className="details__block"><span>BoxOffice:</span> {BoxOffice}</div>
							<div className="details__block"><span>imdbRating:</span> {imdbRating}</div>
							<div className="details__block"><span>Plot:</span> {Plot}</div>
						</div>
						<div className="details__image">
							<img src={Poster} alt={Title} />
							<div className="to-favorites" onClick={() => console.log('Favorite')}></div>
						</div>
					</div>
				</div>
				: <div className='spinner' style={{
					top: '50px',
					position: 'relative',
					zIndex: '1'
				}}></div>}
		</section >
	);
};
