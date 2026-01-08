import React from "react";
import "./../../styles/AppointmentCTA.css";

const AppointmentCTA = () => {
  return (
    <section className="appointment-cta">
      <div className="appointment-overlay"></div>

      <div className="appointment-container">
        {/* LEFT CONTENT */}
        <div className="appointment-content">
          <span className="appointment-badge">📅 Easy & Fast Booking</span>
          <h2>
            Book Your <span>Appointment</span><br />
            With Trusted Doctors
          </h2>
          <p>
            Get expert medical consultation from our certified doctors.
            Available 24/7 for emergency and scheduled appointments.
          </p>

          <div className="appointment-actions">
            <button className="btn-primary">Book Appointment</button>
            <button className="btn-outline">Call Now</button>
          </div>
        </div>

        {/* RIGHT INFO */}
        <div className="appointment-info">
          <div className="info-card">
            <h4>Emergency</h4>
            <p>24/7 Available</p>
          </div>
          <div className="info-card">
            <h4>Call Us</h4>
            <p>+91 98765 43210</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentCTA;
