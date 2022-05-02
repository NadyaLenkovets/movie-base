import { useNavigate } from 'react-router-dom';
import React from 'react';

import './GoBack.css';

export const GoBack = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className='back' onClick={goBack}>Back</div>
  );
};
