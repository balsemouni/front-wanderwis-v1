import React, { useState } from 'react';
import { FiStar, FiThumbsUp, FiThumbsDown, FiSend } from 'react-icons/fi';
import "./ReviewForm.css"
const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [isHelpful, setIsHelpful] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const maxChar = 500;
  const remainingChars = maxChar - review.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after success
      setTimeout(() => {
        setRating(0);
        setTitle('');
        setReview('');
        setIsHelpful(null);
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const StarRating = ({ rating, hoverRating, onRate, onHover }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
            aria-label={`Rate ${star} stars`}
          >
            <FiStar size={24} />
          </button>
        ))}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="review-success">
        <div className="success-icon">
          <FiSend size={48} />
        </div>
        <h3>Review Submitted!</h3>
        <p>Thank you for your feedback. Your review has been successfully submitted.</p>
      </div>
    );
  }

  return (
    <div className="review-form-container">
      <div className="review-header">
        <h2>Write a Review</h2>
        <p>Share your experience to help others</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Rating</label>
          <StarRating 
            rating={rating} 
            hoverRating={hoverRating} 
            onRate={setRating} 
            onHover={setHoverRating} 
          />
          {rating > 0 && (
            <div className="rating-description">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Average"}
              {rating === 4 && "Good"}
              {rating === 5 && "Excellent"}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="review-title">Review Title</label>
          <input
            id="review-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            maxLength={60}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="review-text">Your Review</label>
          <textarea
            id="review-text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share details of your experience with this product/service..."
            rows={5}
            maxLength={maxChar}
          />
          <div className={`char-counter ${remainingChars < 20 ? 'warning' : ''}`}>
            {remainingChars} characters remaining
          </div>
        </div>
        
        <div className="form-group">
          <label>Would you recommend this to others?</label>
          <div className="recommendation">
            <button
              type="button"
              className={`recommend-btn ${isHelpful === true ? 'selected' : ''}`}
              onClick={() => setIsHelpful(true)}
            >
              <FiThumbsUp size={20} />
              <span>Yes</span>
            </button>
            <button
              type="button"
              className={`recommend-btn ${isHelpful === false ? 'selected' : ''}`}
              onClick={() => setIsHelpful(false)}
            >
              <FiThumbsDown size={20} />
              <span>No</span>
            </button>
          </div>
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <label htmlFor="anonymous">Post as anonymous</label>
        </div>
        
        <div className="form-submit">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting || rating === 0 || review.length < 10}
          >
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : (
              <>
                <FiSend size={18} />
                <span>Submit Review</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;