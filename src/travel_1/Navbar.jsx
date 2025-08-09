import React from 'react';
import './Navbar.css';
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo or brand name */} 
        <div className="navbar-brand">
          <a href="#home" onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}></a>
        </div>
        
        {/* Navigation links */}
        <ul className="nav-links">
          <li>
            <a href="#home" className="nav-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}>Home</a>
          </li>
          <li>
            <a href="#quiz" className="nav-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('quiz');
            }}>Quiz</a>
          </li>
        
          <li>
            <a href="#trending" className="nav-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('trending');
            }}>Destinations</a>
          </li>
          
          <li className="profile-link-container">
            <a href="#profile" className="profile-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('profile');
            }}>
              <span>Profile</span>
              <FaUser className="profile-icon" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;