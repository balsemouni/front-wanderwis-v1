import React from 'react';
import './Footer.css';
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>À propos</h3>
          <p>Découvrez des destinations hors des sentiers battus avec WanderWise.</p>
        </div>
        <div className="footer-section">
          <h3>Liens rapides</h3>
          <ul>
            <li><a href="#">Destinations</a></li>
            <li><a href="#">Itinéraires</a></li>
            <li><a href="#">Avis communautaires</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <div className="contact-item">
            <MdEmail className="icon"/><span>contact@wanderwise.com</span>
          </div>
          <div className="contact-item">
            <BsFillTelephoneFill className="icon"/><span>+33 1 23 45 67 89</span>
          </div>
          <div className="contact-item">
            <FaLocationDot className="icon"/><span>123 Rue de l'Aventure, Paris</span>
          </div>
        </div>
        <div className="footer-section">
          <h3>Réseaux sociaux</h3>
          <div className="social-item">
            <AiFillInstagram className="icon"/><a href="#" aria-label="Instagram">Instagram</a>
          </div>
          <div className="social-item">
            <FaFacebook className="icon"/><a href="#" aria-label="Facebook">Facebook</a>
          </div>
          <div className="social-item">
            <FaTwitter className="icon"/><a href="#" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;