import React from 'react';

import './Favorites.css';

export const Favorites = () => {
	return (
		<section className='favorites'>
			<div className='favorites__container'>
				<div className="favorites__card">
					<div className="favorites__image"></div>
					<div className="favorites__info">
						<h3 className="favorites__block favorites__title">Title</h3>
						<p className="favorites__block">Year</p>
						<p className="favorites__block">imdbRating</p>
						<p className="favorites__block">Actors</p>
						<p className="favorites__block">Runtime</p>
					</div>
				</div>
			</div>
		</section>
	);
};
