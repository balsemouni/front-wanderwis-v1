import React, { useState, useEffect } from 'react';
import './TrendingCountries.css';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa"; // Chevron icon

const TrendingCountries = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // Number of countries to show initially
  const INITIAL_DISPLAY_COUNT = 6;
  const COUNTRIES_PER_ROW = 3;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:8222/api/countries');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleExplore = (countryId) => {
    
    navigate(`/country/${countryId}`);
  };

  const toggleExpand = (id) => {
    setExpandedCountry(expandedCountry === id ? null : id);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Map your continent enum to display names
  const continentDisplayNames = {
    EUROPE: 'Europe',
    ASIA: 'Asia',
    AFRICA: 'Africa',
    NORTH_AMERICA: 'North America',
    SOUTH_AMERICA: 'South America',
    OCEANIA: 'Oceania'
  };

  const filteredCountries = activeTab === 'all' 
    ? countries 
    : countries.filter(country => country.continent === activeTab);

  // Determine which countries to display
  const displayedCountries = showAll 
    ? filteredCountries 
    : filteredCountries.slice(0, INITIAL_DISPLAY_COUNT);

  // Check if there are more countries to show
  const hasMoreCountries = filteredCountries.length > INITIAL_DISPLAY_COUNT;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading countries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading countries: {error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div id='trending' className="trending-container">
      <header className="trending-header">
        <h1>Trending Travel Destinations</h1>
        <p>Discover the world's most popular destinations this season</p>
        
        <div className="filter-tabs">
          {['all', 'EUROPE', 'ASIA', 'AFRICA', 'NORTH_AMERICA', 'SOUTH_AMERICA', 'OCEANIA'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab);
                setShowAll(false); // Reset showAll when changing tabs
              }}
            >
              {tab === 'all' ? 'All Destinations' : continentDisplayNames[tab]}
            </button>
          ))}
        </div>
      </header>

      {filteredCountries.length === 0 ? (
        <div className="no-results">
          <p>No countries found for this category.</p>
        </div>
      ) : (
        <>
          <div className="countries-grid">
            {displayedCountries.map(country => (
              <div 
                key={country.id} 
                className={`country-card ${expandedCountry === country.id ? 'expanded' : ''}`}
              >
                <div 
                  className="card-image"
                  style={{ 
                    backgroundImage: `url(${require(`../images${country.imagepath}`)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {!country.imagepath && (
                    <div className="image-placeholder">
                      {country.country}
                    </div>
                  )}
                </div>
                
                <div className="card-content">
                  <h3>{country.name}</h3>
                  <p className="continent">{continentDisplayNames[country.continent]}</p>
                  
                  <div className={`description ${expandedCountry === country.id ? 'show' : ''}`}>
                    <p>{country.description || 'Explore this beautiful destination'}</p>
                  </div>
                  
                  <button 
                    className="explore-btn"
                    onClick={() => handleExplore(country.id)}
                  >
                    Explore {country.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {hasMoreCountries && !showAll && (
         <div className="show-more-container">
              <button className="show-more-btn" onClick={toggleShowAll}>
                Show All {filteredCountries.length} Countries
                <FaChevronDown className="show-more-icon" /> {/* Icon added here */}
              </button>
            </div>
          )}

          {showAll && hasMoreCountries && (
            <div className="show-more-container">
              <button className="show-more-btn" onClick={toggleShowAll}>
                Show Less
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrendingCountries;