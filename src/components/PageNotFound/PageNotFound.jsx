import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

export const PageNotFound = () => {
  return (
    <div className='page-not-found'>
      <h1 className="page-not-found__title">Page not found. Please, return
        <Link to="/" className="page-not-found__link">Home</Link>
      </h1>
    </div>
  );
};

