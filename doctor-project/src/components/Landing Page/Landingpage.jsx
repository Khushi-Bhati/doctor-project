import React from 'react'
import Navbar from './Navbar'

import DoctorImage from "./../../images/OIP-removebg-preview.png"



import "./../../styles/Hero.css"
import About from './About'
import Department from './Department'
import Services from './Services'
import Footer from './Footer'
import Doctors from './Doctors'
import AppointmentCTA from './AppointmentCTA'
import { Layout } from 'antd'
import Contact from './Contact'


const LandingPage = () => {
  return (
    <>
      <div className='landingpage'>
        <Navbar />

        <section className="hero-landingopage">
          <div className="hero-container">
            {/* LEFT CONTENT */}
            <div className="hero-content">
              <span className="badge">🦷 Top-Notch Health Care, Just for You</span>
              <h1 className="hero-title">
                Your <span>Best Health</span><br />
                Experience Awaits
              </h1>
              <p className="hero-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary">Explore Our Services</button>
                {/* <button className="btn-secondary">
          ▶ Watch Video
        </button> */}
              </div>
            </div>
            {/* RIGHT IMAGE */}
            <div className="hero-image">
              <div className="circle-bg" />
              <img src={DoctorImage} alt="Doctor" />
            </div>
          </div>
        </section>
        <section className="hero-info-strip">
          <div className="info-container">

            <div className="info-item">
              <span className="info-number">25+</span>
              <p>Years of Medical Excellence</p>
            </div>

            <div className="divider" />

            <div className="info-item">
              <span className="info-number">120+</span>
              <p>Certified Doctors</p>
            </div>

            <div className="divider" />

            <div className="info-item">
              <span className="info-number">50k+</span>
              <p>Happy Patients</p>
            </div>

            <div className="divider" />

            <div className="info-item">
              <span className="info-number">24/7</span>
              <p>Emergency Support</p>
            </div>

          </div>
        </section>


        <About />
        <Department />

<Contact/>
        <Footer />








      </div>


    </>
  )
}

export default LandingPage;