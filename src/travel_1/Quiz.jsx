import React, { useState } from 'react';
import axios from 'axios';
import './Quiz.css';

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    activities: [],
    continent: '',
    budget: 1500
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Quiz data structure
  const quizData = {
    title: "WanderWise Predictor",
    questions: [
      {
        id: 1,
        text: "What type of activities do you enjoy?",
        choices: [
          { id: 1, text: "General Sightseeing" },
          { id: 2, text: "Nature & Wildlife" },
          { id: 3, text: "Historical & Cultural" },
          { id: 4, text: "Water Activities" },
          { id: 5, text: "Nightlife & Entertainment" },
          { id: 6, text: "Food & Drink" },
          { id: 7, text: "Adventure & Thrill" },
          { id: 8, text: "Luxury Experiences" },
          { id: 9, text: "Shopping & Retail" }
        ]
      },
      {
        id: 2,
        text: "Which continent would you like to visit?",
        choices: [
          { id: 10, text: "Africa" },
          { id: 11, text: "Antarctica" },
          { id: 12, text: "Asia" },
          { id: 13, text: "Europe" },
          { id: 14, text: "North America" },
          { id: 15, text: "South America" },
          { id: 16, text: "Australia/Oceania" }
        ]
      },
      {
        id: 3,
        text: "What's your travel budget range per person?",
        choices: [
          { id: 17, text: "Budget ($500 - $1,500)" },
          { id: 18, text: "Mid-Range ($1,500 - $3,500)" },
          { id: 19, text: "Luxury ($3,500 - $7,000)" },
          { id: 20, text: "Premium ($7,000+)" }
        ]
      }
    ]
  };

  // Helper function to generate CSS-safe class names
  const getCssClassName = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '');
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleActivityToggle = (activity) => {
    setAnswers(prev => {
      const newActivities = prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity];
      return { ...prev, activities: newActivities };
    });
  };

  const handleContinentSelect = (continent) => {
    setAnswers(prev => ({ ...prev, continent }));
  };

  const handleBudgetChange = (e) => {
    const newBudget = parseInt(e.target.value);
    setAnswers(prev => ({ ...prev, budget: newBudget }));
  };

  const isActivitySelected = (activity) => answers.activities.includes(activity);
  const isContinentSelected = (continent) => answers.continent === continent;

  const submitQuizResults = async () => {
    try {
      const submissionData = {
        title: quizData.title,
        questions: [
          {
            text: quizData.questions[0].text,
            choices: answers.activities.map(activity => ({
              text: activity,
              correct: true
            }))
          },
          {
            text: quizData.questions[1].text,
            choices: answers.continent ? [{
              text: answers.continent,
              correct: true
            }] : []
          },
          {
            text: quizData.questions[2].text,
            choices: [{
              text: getBudgetRangeText(answers.budget),
              correct: true
            }]
          },
          {
            text: "Exact budget amount",
            choices: [{
              text: `$${answers.budget}`,
              correct: true
            }]
          }
        ].filter(q => q.choices.length > 0)
      };

      const response = await axios.post('http://localhost:8222/api/quizzes', submissionData);
      
      setSubmissionStatus({
        success: true,
        message: 'Quiz results submitted successfully!',
        data: response.data
      });
      
      setCurrentStep(5);
    } catch (error) {
      setSubmissionStatus({
        success: false,
        message: 'Failed to submit quiz results. Please try again.',
        error: error.response?.data?.message || error.message
      });
      console.error('Error submitting quiz:', error);
    }
  };

  const handleSubmit = () => {
    submitQuizResults();
  };

  function getBudgetRangeText(budget) {
    if (budget < 1500) return "Budget ($500 - $1,500)";
    if (budget < 3500) return "Mid-Range ($1,500 - $3,500)";
    if (budget < 7000) return "Luxury ($3,500 - $7,000)";
    return "Premium ($7,000+)";
  }

  function determineDestination(answers) {
    // Your destination determination logic here
    return "Paris, France"; // Example
  }

  function getDestinationDescription(destination) {
    // Your description logic here
    return "Paris is known for its art, fashion, gastronomy and culture...";
  }

  return (
    <div className="quiz-container">
      <div className="header">
        <h1><i className="fas fa-globe-americas"></i> {quizData.title}</h1>
        <p>Answer a few questions to find your perfect vacation spot</p>
      </div>
      
      <div className="step-container">
        {/* Step 1 - Activities */}
        {currentStep === 1 && (
          <div className="step active">
            <h2>{quizData.questions[0].text}</h2>
            <p className="subtext">Select all that apply</p>
            <div className="options-grid">
             {quizData.questions[0].choices.map((choice) => {
                const cssClass = getCssClassName(choice.text);
                return (
                  <div 
                    key={choice.id}
                    className={`option-card ${isActivitySelected(choice.text) ? 'selected' : ''} ${cssClass}`}
                    onClick={() => handleActivityToggle(choice.text)}
                  >
                    <div 
                        className="card-image"
                        style={{ 
                          backgroundImage: `url(${process.env.PUBLIC_URL}/images/${choice.text.replace(/\s+/g, '_')}.jpg)` 
                        }}
                      ></div>
                    {/* <div 
                      className={`card-image ${getCssClassName(choice.text)}`}
                    ></div>                     */}
                    <div className="card-label">{choice.text}</div>
                    {isActivitySelected(choice.text) && (
                      <div className="card-overlay">
                        <i className="fas fa-check-circle"></i>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="buttons">
              <button 
                className="btn btn-next" 
                onClick={handleNext}
                disabled={answers.activities.length === 0}
              >
                Next <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2 - Continent */}
        {currentStep === 2 && (
          <div className="step active">
            <h2>{quizData.questions[1].text}</h2>
            <div className="options-grid">
              {quizData.questions[1].choices.map((choice) => (
                <div 
                  key={choice.id}
                  className={`option-card ${isContinentSelected(choice.text) ? 'selected' : ''} ${getCssClassName(choice.text)}`}
                  onClick={() => handleContinentSelect(choice.text)}
                >
                  <div className="card-image"></div>
                  <div className="card-label">{choice.text}</div>
                  {isContinentSelected(choice.text) && (
                    <div className="card-overlay">
                      <i className="fas fa-check-circle"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="buttons">
              <button className="btn btn-prev" onClick={handlePrev}>
                <i className="fas fa-arrow-left"></i> Previous
              </button>
              <button 
                className="btn btn-next" 
                onClick={handleNext}
                disabled={!answers.continent}
              >
                Next <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3 - Budget Range */}
        {currentStep === 3 && (
          <div className="step active">
            <h2>{quizData.questions[2].text}</h2>
            <div className="budget-slider-container">
              <div className="budget-display">
                ${answers.budget.toLocaleString()}
              </div>
              <input 
                type="range" 
                min="500" 
                max="10000" 
                step="100"
                value={answers.budget}
                onChange={handleBudgetChange}
                className="budget-slider"
              />
              <div className="budget-range">
                <span>$500</span>
                <span>$10,000+</span>
              </div>
            </div>
            
            <div className="budget-categories">
              {quizData.questions[2].choices.map((choice) => (
                <div 
                  key={choice.id}
                  className={`budget-category ${
                    (choice.id === 17 && answers.budget < 1500) ||
                    (choice.id === 18 && answers.budget >= 1500 && answers.budget < 3500) ||
                    (choice.id === 19 && answers.budget >= 3500 && answers.budget < 7000) ||
                    (choice.id === 20 && answers.budget >= 7000) ? 'active' : ''
                  }`}
                >
                  {choice.text}
                </div>
              ))}
            </div>
            
            <div className="buttons">
              <button className="btn btn-prev" onClick={handlePrev}>
                <i className="fas fa-arrow-left"></i> Previous
              </button>
              <button className="btn btn-next" onClick={handleNext}>
                Next <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 4 - Confirm Budget */}
        {currentStep === 4 && (
          <div className="step active">
            <h2>Confirm Your Budget</h2>
            <div className="budget-confirmation">
              <div className="budget-display-large">
                ${answers.budget.toLocaleString()}
              </div>
              <p>This is the exact budget amount you've selected.</p>
              
              <div className="budget-range-info">
                <p>Your selected range: {getBudgetRangeText(answers.budget)}</p>
              </div>
            </div>
            
            <div className="buttons">
              <button className="btn btn-prev" onClick={handlePrev}>
                <i className="fas fa-arrow-left"></i> Previous
              </button>
              <button className="btn btn-next" onClick={handleSubmit}>
                Find My Destination <i className="fas fa-search-location"></i>
              </button>
            </div>
          </div>
        )}
        
        {/* Results */}
        {currentStep === 5 && (
          <div className="step active">
            <div className="result-container">
              <h2>Your Perfect Destination Is...</h2>
              <div className="result-title">
                {determineDestination(answers)}
              </div>
              <div 
                className="result-image"
                style={{ 
                  backgroundImage: `url(${process.env.PUBLIC_URL}/images/${determineDestination(answers).replace(/\s+/g, '-').toLowerCase()}.jpg)`
                }}
              ></div>
              <div className="result-description">
                {getDestinationDescription(determineDestination(answers))}
              </div>
              {submissionStatus && (
                <div className={`submission-status ${submissionStatus.success ? 'success' : 'error'}`}>
                  {submissionStatus.message}
                </div>
              )}
              <button 
                className="btn-restart" 
                onClick={() => {
                  setCurrentStep(1);
                  setAnswers({
                    activities: [],
                    continent: '',
                    budget: 1500
                  });
                  setSubmissionStatus(null);
                }}
              >
                <i className="fas fa-sync-alt"></i> Start Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;