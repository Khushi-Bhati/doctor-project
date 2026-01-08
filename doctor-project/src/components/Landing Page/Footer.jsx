import React from "react";
import "./../../styles/Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logoImage from "./../../images/OIP (1).webp";

const Footer = () => {
  return (
    <footer className="footer-match">
      <div className="footer-wave"></div>

      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-col">
          <div className="footer-brand">
            <img src={logoImage} alt="MediCare" />
     
          </div>
          <p>
            Trusted healthcare platform providing expert doctors, advanced
            facilities, and 24/7 patient care.
          </p>

          <div className="footer-socials">
            <a ><FaFacebookF /></a>
            <a ><FaTwitter /></a>
            <a ><FaInstagram /></a>
            <a ><FaLinkedinIn /></a>
          </div>
        </div>

        {/* LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
           <li>Home</li>
            <li>About Us</li>
            <li>Departments</li>
            <li>Doctors</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-col">
          <h4>Our Services</h4>
          <ul>
            <li>Online Consultation</li>
            <li>Doctor Appointment</li>
            <li>Emergency Care</li>
            <li>Health Checkups</li>
            <li>Diagnostics</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4>Contact Info</h4>
          <p>📍 New Delhi, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉ support@medicare.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MediCare. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
