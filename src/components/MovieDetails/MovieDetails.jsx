import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { APIKey } from '../../common/apis/MovieApiKey';
import { ThemeContext } from '../../App';

import './MovieDetails.css';

export const MovieDetails = () => {
  const navigate = useNavigate();
  const { imdbID } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const { theme, setTheme } = useContext(ThemeContext);
  const {
    Actors: actors,
    BoxOffice: boxOffice,
    Country: country,
    Director: director,
    Genre: genre,
    Plot: plot,
    Poster: poster,
    Released: released,
    Title: title,
    Year: year,
    imdbRating,
    Runtime: runtime
  } = movieDetails;

  const themeToggle = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }

  const goBack = () => navigate(-1);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${APIKey}&i=${imdbID}&plot=full`)
      .then(responce => responce.json())
      .then((body) => setMovieDetails(body))
    // .then((body) => console.log(body)) //!
  }, []);

  return (
    <section className='details'
      style={{ backgroundImage: `url(${poster})` }}>
      {movieDetails.Title
        ? <div className="container details-container">
          <div className=
            {theme === 'dark' ? 'details__card dark' : 'details__card light'}
          >
            <div className="details__info">
              <div className="details__buttons">
                <div className='back' onClick={goBack}>Back</div>
                <button
                  className='theme-toggler'
                  onClick={themeToggle}>
                  {theme === 'dark' ? 'Light' : 'Dark'} mode
                </button>
              </div>
              <h2 className="details__title">{title}</h2>
              <div className="details__describe">
                <i>{runtime} / {genre}</i>
              </div>
              <div className="details__block"><span>Cast:</span> {actors}</div>
              <div className="details__block"><span>Country:</span> {country}</div>
              <div className="details__block"><span>Director:</span> {director}</div>
              <div className="details__block"><span>Year:</span> {year}</div>
              <div className="details__block"><span>Released:</span> {released}</div>
              <div className="details__block"><span>BoxOffice:</span> {boxOffice}</div>
              <div className="details__block"><span>imdbRating:</span> {imdbRating}</div>
              <div className="details__block"><span>Plot:</span> {plot}</div>
            </div>
            <div className="details__image">
              <img src={poster} alt={title} />
              <div className="to-favorites" onClick={() => console.log('Favorite')}></div>
            </div>
          </div>
        </div>
        : <div className='spinner' style={{
          top: '50px',
          position: 'relative',
          zIndex: '1'
        }} />}
    </section >
  );
};
