import React from 'react'
import aboutImage from "./../../images/about.jpg.webp"
import "./../../styles/About.css"
import consultation from "./../../images/consulation.avif"

import Footer from './Footer'
import Navbar from './Navbar'

const About = () => {
  return (
     <div className='landingpage'>
        <Navbar />
      <section className="about-section">
        <div className="about-container">
          {/* LEFT IMAGES */}
          <div className="about-images">
            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118" alt="Healthcare professionals" className="img-main" />
            <img src={consultation} alt="Doctor consultation" className="img-overlay" />
          </div>
          {/* RIGHT CONTENT */}
          <div className="about-content">
            <span className="about-badge">About Our Healthcare</span>
            <h2>
              Trusted Care for
              <span>Healthier Lives</span>
            </h2>
            <p>
              We provide comprehensive healthcare services focused on
              prevention, diagnosis, and treatment. Our experienced doctors
              and medical staff are committed to delivering safe, reliable,
              and compassionate care.
            </p>
            <ul className="about-list">
              <li>✔ Experienced doctors &amp; specialists</li>
              <li>✔ Advanced medical technology</li>
              <li>✔ Patient-centered &amp; ethical care</li>
              <li>✔ 24/7 emergency support</li>
            </ul>
            <a href="#" className="about-btn">Learn More About Us</a>
          </div>
        </div>
      </section>
      
  
   </div>





  )
}

export default About