import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLandmark, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaStar, FaRegStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './CountryDetails.css';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

const CountryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightedActivity, setHighlightedActivity] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState({
    'Tours': false,
    'Activities': false,
    'Attractions': false,
    'Cultural': false,
    'Adventure': false,
    'Food': false
  });
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    author: 'Anonymous'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('id'+id)
        // Fetch country data
        const countryResponse = await fetch(`http://localhost:8222/api/countries/${id}`);
        if (!countryResponse.ok) throw new Error('Failed to fetch country data');
        const countryData = await countryResponse.json();
        
        // Fetch activities from Flask scraper
        const activitiesResponse = await fetch(`http://localhost:5000/scrape_activities?country=${countryData.name}`);
        if (!activitiesResponse.ok) throw new Error('Failed to fetch activities');
        const activitiesData = await activitiesResponse.json();
        
        // Fetch reviews
        const reviewsResponse = await fetch(`http://localhost:8222/api/reviews/country/${id}`);
        const reviewsData = await reviewsResponse.ok ? await reviewsResponse.json() : [];
        
        setCountryData(countryData);
        setActivities(activitiesData.activities || []);
        setReviews(reviewsData);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const focusOnActivity = (activity) => {
    setHighlightedActivity(activity);
    document.getElementById('map-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8222/api/countries/${id}/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview)
        }
      );
      
      if (!response.ok) throw new Error('Failed to submit review');
      
      const reviewData = await response.json();
      setReviews([...reviews, reviewData]);
      setNewReview({
        rating: 5,
        comment: '',
        author: 'Anonymous'
      });
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setNewReview(prev => ({
      ...prev,
      rating
    }));
  };

  const filteredActivities = activities.filter(activity => {
    if (Object.values(selectedCategories).every(val => !val)) {
      return true;
    }
    // Simple category matching - you might need to adjust this logic
    return Object.entries(selectedCategories)
      .filter(([_, selected]) => selected)
      .some(([category, _]) => 
        activity.title.toLowerCase().includes(category.toLowerCase()) || 
        (activity.description && activity.description.toLowerCase().includes(category.toLowerCase()))
      );
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading country details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading country: {error}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  if (!countryData) {
    return <div className="no-data">Country not found</div>;
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length)
    : 0;

  return (
    <div className="country-details-page">
      <div 
        className="img-details-page"
        style={{
          backgroundImage: countryData.imagepath 
            ? `url(${require(`../images${countryData.imagepath}`)})` 
            : 'none',
        }}
      >
        <div className="country-hero" style={{ position: 'relative', zIndex: 1 }}>
          <div className="country-description">
            <div className="country-header_1">
              <h1>{countryData.name}</h1>
            </div>
          </div>
        </div>
      </div>
      
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      
      <div className="country-container">
        <div className="country-content">
          <div className="country-hero">
            {countryData.imagepath ? (
              <img 
                src={require(`../images${countryData.imagepath}`)}
                className="hero-image" 
                alt={countryData.name} 
              />          
            ) : (
              <div className="hero-image-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p>No image available</p>
              </div>
            )}
          </div>
          
          <div className="country-description">
            <div className="country-header">
              <h1>{countryData.name}</h1>
              <p className="continent">{countryData.continent}</p>
              <div className="rating-summary">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    i < Math.round(averageRating) ? <FaStar key={i} /> : <FaRegStar key={i} />
                  ))}
                </div>
                <span>({reviews.length} reviews)</span>
              </div>
              <p className='description-country'>{countryData.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="activities-section">
        <div className="activities-swiper-container">
          <h2>Top Activities</h2>
          {filteredActivities.length === 0 ? (
            <p className="no-activities-message">No activities found for this country.</p>
          ) : (
            <>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={3}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev'
                }}
                pagination={{
                  clickable: true,
                  el: '.swiper-pagination'
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 }
                }}
                onSlideChange={handleSlideChange}
                className="activity-swiper"
              >
                {filteredActivities.map((activity, index) => (
                  <SwiperSlide key={index}>
                    <div 
                      className={`activity-card ${highlightedActivity?.title === activity.title ? 'highlighted' : ''}`}
                      onClick={() => focusOnActivity(activity)}
                    >
                      <div className="activity-image-container">
                        <img 
                          src={activity.image_url || require('../images/argentina.jpg')} 
                          alt={activity.title} 
                          onError={(e) => {
                            e.target.src = require('../images/argentina.jpg');
                          }}
                        />
                        <div className="activity-icon"><FaLandmark /></div>
                      </div>
                      <div className="activity-info">
                        <h3>{activity.title}</h3>
                        <p>{activity.duration || 'Duration not specified'}</p>
                        <div className="activity-rating">
                          {activity.rating !== "N/A" && (
                            <>
                              <FaStar /> {activity.rating} ({activity.reviews || 0} reviews)
                            </>
                          )}
                        </div>
                        <p className="activity-price">
                          {activity.price !== "N/A" ? activity.price : 'Price not available'}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              <div className="swiper-controls">
                <button className="swiper-button-prev">
                  <FaChevronLeft />
                </button>
                <div className="swiper-pagination"></div>
                <button className="swiper-button-next">
                  <FaChevronRight />
                </button>
              </div>
            </>
          )}
        </div>
        
        <div className="activities-filters">
          <h3>Filter Activities:</h3>
          <div className="category-list">
            {Object.keys(selectedCategories).map(category => (
              <label key={category} className="category-item">
                <input
                  type="checkbox"
                  checked={selectedCategories[category]}
                  onChange={() => handleCategoryChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div id="map-section" className="map-container">
        <h2>Activities Map</h2>
        {highlightedActivity && (
          <div className="map-activity-info">
            <h3>{highlightedActivity.title}</h3>
            <p>{highlightedActivity.description || 'No description available'}</p>
          </div>
        )}
       
      </div>

      <div className="all-activities-section">
        <h2>All Activities</h2>
        <div className="activities-grid">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className={`activity-card ${highlightedActivity?.title === activity.title ? 'highlighted' : ''}`}
              onClick={() => focusOnActivity(activity)}
            >
              <div className="activity-image-container">
                <img 
                  src={activity.image_url || require('../images/argentina.jpg')} 
                  alt={activity.title}
                  onError={(e) => {
                    e.target.src = require('../images/argentina.jpg');
                  }}
                />
              </div>
              <div className="activity-info">
                <h3>{activity.title}</h3>
                <p>{activity.duration || 'Duration not specified'}</p>
                <div className="activity-rating">
                  {activity.rating !== "N/A" && (
                    <>
                      <FaStar /> {activity.rating} ({activity.reviews || 0} reviews)
                    </>
                  )}
                </div>
                <p className="activity-price">
                  {activity.price !== "N/A" ? activity.price : 'Price not available'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-section">
        <h2>Traveler Reviews</h2>
        <div className="reviews-container">
          <div className="reviews-list-section">
            {reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <FaUser className="user-icon" />
                      <span className="review-author">
                        {review.userId || 'Anonymous'}
                      </span>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          i < Math.floor(review.rating) ? (
                            <FaStar key={i} />
                          ) : (
                            i === Math.floor(review.rating) && review.rating % 1 >= 0.5 ? (
                              <FaStarHalfAlt key={i} />
                            ) : (
                              <FaRegStar key={i} />
                            )
                          )
                        ))}
                        <span className="rating-value">{review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="review-comment">{review.reviewText}</p>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-reviews">No reviews yet. Be the first to share your experience!</p>
            )}
          </div>

          <div className="add-review">
            <h3>Share Your Experience</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label>Your Rating:</label>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={star <= newReview.rating ? 'active' : ''}
                    >
                      {star <= newReview.rating ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="comment">Review:</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  placeholder="Share your experience..."
                  required
                  rows={4}
                />
              </div>
              <button type="submit" className="submit-review-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;