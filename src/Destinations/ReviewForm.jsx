import React, { useState } from 'react';
import "./style.css";

function ReviewForm({ onSubmit, onCancel }) {
  const [review, setReview] = useState({
    author: '',
    comment: '',
    rating: 0 // Start with 0 (no stars selected)
  });

  const [hoverRating, setHoverRating] = useState(0); // For hover effect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview(prev => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (rating) => {
    setReview(prev => ({ ...prev, rating }));
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit({
      ...review,
      rating: review.rating // Already a number
    });
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="form-group">
        <label>Your Name:</label>
        <input
          type="text"
          name="author"
          value={review.author}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Rating:</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${(hoverRating || review.rating) >= star ? 'filled' : ''}`}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      
      <div className="form-group">
        <label>Comment:</label>
        <textarea
          name="comment"
          value={review.comment}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-buttons">
        <button type="submit">Submit Review</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default ReviewForm;