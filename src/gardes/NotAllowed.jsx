// src/travel_1/NotAllowed.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotAllowed = () => {
  return (
    <div className="not-allowed">
      <h1>⛔ Sorry, Not Allowed to Enter Here!</h1>
      <p>You need to log in to access this page.</p>
      <Link to="/" className="home-link">Go to Home</Link>
    </div>
  );
};

export default NotAllowed;