import React from 'react';
import './Home.css'; // CSS file for styling the links
import TrendingCountries from "../countries/TrendingCountries "
import QuizLanding from '../quiz/QuizLanding';

const Home = () => {
  return (
    <div>
    <div className='image-container'>
 <div class="text-overlay">
          <h1>Wanderwise</h1>
          <p>Discover off-the-beaten-path destinations with WanderWise.</p>
          
        </div>

        </div>
                <TrendingCountries></TrendingCountries>
                <QuizLanding></QuizLanding>
                </div>

      );
};

export default Home;