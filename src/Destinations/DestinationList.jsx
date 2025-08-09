import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import "./style.css";

function DestinationList({ destinations, onAddReview }) {
  const [showReviewForm, setShowReviewForm] = useState(null);

  const handleAddReviewClick = (destinationId) => {
    setShowReviewForm(destinationId);
  };

  const handleReviewSubmit = (destinationId, review) => {
    onAddReview(destinationId, review);
    setShowReviewForm(null);
  };

  const handleCancelReview = () => {
    setShowReviewForm(null);
  };

  return (
    <div className="destination-list">
      <h2>Destinations</h2>
      {destinations.map(destination => (
        <div key={destination.id} className="destination-card">
          <div className="destination-header">
            <h3>{destination.name}</h3>
            <p className="destination-description">{destination.description}</p>
          </div>
          
          <div className="reviews-container">
            <div className="reviews-header">
              <h4>Reviews</h4>
              <span className="review-count">({destination.reviews.length})</span>
            </div>
            
            {destination.reviews.length > 0 ? (
              <ul className="reviews-list">
                {destination.reviews.map(review => (
                  <li key={review.id} className="review-item">
                    <div className="review-meta">
                      <span className="review-author">{review.author}</span>
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span 
                            key={star} 
                            className={`star ${review.rating >= star ? 'filled' : ''}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-reviews">No reviews yet. Be the first to review!</p>
            )}
            
            <div className="review-actions">
              {showReviewForm === destination.id ? (
                <ReviewForm
                  onSubmit={(review) => handleReviewSubmit(destination.id, review)}
                  onCancel={handleCancelReview}
                />
              ) : (
                <button 
                  onClick={() => handleAddReviewClick(destination.id)}
                  className="add-review-button"
                >
                  Add Review
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DestinationList;