import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './History.css';

export const History = () => {


  return (
    <section className='history'>
      <div className='history__container'>
        <div className="history__card">
          <h2 className="history__title">Your search history</h2>
          <div className="history__block">
            <Link to={`/`} >
              <span>Query</span>
            </Link>
          </div>
          <div className="history__block">
            {/* <Link to={`/search/${query}`} > */}
            <span>Query 1 </span>
            {/* </Link> */}
          </div>
          <div className="history__block">
            {/* <Link to={`/search/${query}`} > */}
            <span>Query nnnn</span>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

