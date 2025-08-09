import React, { useState } from 'react';
import './ProfileManagement.css';

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    username: 'Traveler123',
    email: 'user@example.com',
    password: '',
    newPassword: '',
    confirmPassword: '',
    travelHistory: [
      { id: 1, country: 'France', city: 'Paris', date: '2023-05-15' },
      { id: 2, country: 'Japan', city: 'Tokyo', date: '2023-08-22' }
    ],
    newCountry: '',
    newCity: '',
    newDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDestination = (e) => {
    e.preventDefault();
    if (userData.newCountry && userData.newCity) {
      const newDestination = {
        id: Date.now(),
        country: userData.newCountry,
        city: userData.newCity,
        date: userData.newDate || new Date().toISOString().split('T')[0]
      };
      setUserData(prev => ({
        ...prev,
        travelHistory: [...prev.travelHistory, newDestination],
        newCountry: '',
        newCity: '',
        newDate: ''
      }));
    }
  };

  const handleRemoveDestination = (id) => {
    setUserData(prev => ({
      ...prev,
      travelHistory: prev.travelHistory.filter(item => item.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Profile updated:', userData);
  };

  return (
    <div className="profile-management">
      <div className="profile-header">
        <h2>My Travel Profile</h2>
        <div className="profile-tabs">
          <button
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={activeTab === 'security' ? 'active' : ''}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
          <button
            className={activeTab === 'history' ? 'active' : ''}
            onClick={() => setActiveTab('history')}
          >
            Travel History
          </button>
        </div>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </form>
        )}

        {activeTab === 'security' && (
          <form className="security-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={userData.newPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="save-button">
              Update Password
            </button>
          </form>
        )}

        {activeTab === 'history' && (
          <div className="history-content">
            <div className="history-list">
              <h3>My Travel Destinations</h3>
              {userData.travelHistory.length > 0 ? (
                <ul>
                  {userData.travelHistory.map(item => (
                    <li key={item.id} className="history-item">
                      <div className="destination-info">
                        <span className="country">{item.country}</span>
                        <span className="city">{item.city}</span>
                        <span className="date">{item.date}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveDestination(item.id)}
                        className="remove-button"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-message">No travel history yet</p>
              )}
            </div>

            <form className="add-destination-form" onSubmit={handleAddDestination}>
              <h3>Add New Destination</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="newCountry"
                    value={userData.newCountry}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="newCity"
                    value={userData.newCity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="newDate"
                    value={userData.newDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button type="submit" className="add-button">
                Add Destination
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileManagement;