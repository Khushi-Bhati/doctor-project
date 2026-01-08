import React from "react";
import "./../../styles/Contact.css";
import Navbar from "./Navbar";

const Contact = () => {
  return (
      <div className="landingpage">
      <Navbar />
    <section className="contact-section">
      <div className="contact-wrapper">
        <div className="contact-content">
          <span className="contact-badge">24/7 Medical Support</span>
          <h2>Need Immediate Medical Assistance?</h2>
          <p>
            Our experienced doctors and emergency staff are always available to
            provide safe, reliable, and compassionate healthcare when you need
            it most.
          </p>
        </div>

        <div className="contact-actions">
          <a href="tel:+1234567890" className="contact-btn primary">
            Call Emergency
          </a>
          <a href="/contact" className="contact-btn secondary">
            Contact Us
          </a>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Contact;
