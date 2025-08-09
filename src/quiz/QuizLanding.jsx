import React, { useState } from 'react';
import './QuizLanding.css';
import Quiz from '../travel_1/Quiz'; // Import your Quiz component

const QuizLanding = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const startQuiz = () => {
    setShowQuiz(true);
  };

  const closeQuiz = () => {
    setShowQuiz(false);
  };

  return (
    <div id='quiz' className="quiz-landing">
      {!showQuiz ? (
        <div className="landing-container">
          <header className="landing-header">
            <h1>Discover Your Perfect Destination</h1>
            <p className="subtitle">Answer a few questions and we'll predict where you should travel next!</p>
          </header>

          <div className="landing-content">
            <div className="features-section">
              <div className="feature-card">
                <div className="feature-icon">✈️</div>
                <h3>Personalized Results</h3>
                <p>Our algorithm matches your preferences with ideal destinations.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">⏱️</div>
                <h3>Quick & Easy</h3>
                <p>Only 10 questions - takes less than 2 minutes to complete.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🌎</div>
                <h3>Global Options</h3>
                <p>Discover destinations from all around the world.</p>
              </div>
            </div>

            <div className="quiz-info">
              <h2>How It Works</h2>
              <ol className="steps-list">
                <li>Answer simple questions about your travel preferences</li>
                <li>Our algorithm analyzes your responses</li>
                <li>Get personalized destination recommendations</li>
                <li>Explore details about each suggested location</li>
              </ol>
            </div>
          </div>

          <div className="action-section">
            <button className="start-quiz-btn" onClick={startQuiz}>
              Start the Quiz Now
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-container">
          <Quiz onClose={closeQuiz} />
        </div>
      )}
    </div>
  );
};

export default QuizLanding;