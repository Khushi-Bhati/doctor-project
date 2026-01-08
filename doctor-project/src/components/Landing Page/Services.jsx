import React from 'react'
import "./../../styles/Services.css"

function Services() {
  return (
<section className="services">
  <div className="services-header">
    <span className="section-badge">Our Services</span>
    <h2>Comprehensive <span>Healthcare Solutions</span></h2>
    <p>Personalized medical services delivered with excellence and care.</p>
  </div>
  <div className="services-grid">
    <div className="service-card">
      <span className="icon">🧬</span>
      <h4>Diagnostic Services</h4>
      <p>Advanced lab and imaging diagnostics for accurate results.</p>
    </div>
    <div className="service-card">
      <span className="icon">💊</span>
      <h4>Pharmacy</h4>
      <p>24/7 pharmacy with certified medications.</p>
    </div>
    <div className="service-card">
      <span className="icon">🫀</span>
      <h4>Emergency Care</h4>
      <p>Immediate response with expert emergency teams.</p>
    </div>
    <div className="service-card">
      <span className="icon">🧠</span>
      <h4>Specialist Consultation</h4>
      <p>Expert doctors across multiple specialties.</p>
    </div>
  </div>
</section>

  )
}

export default Services