import React, { useRef } from 'react';
import doctorImage1 from './../../images/doc-1.jpg.webp';
import doctorImage2 from './../../images/doc-2.jpg.webp';
import doctorImage3 from './../../images/doc-3.jpg.webp';
import doctorImage4 from './../../images/doc-4.jpg.webp';
import './../../styles/Doctors.css';

const Doctors = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="doctors-section">
      <p className="doc-subtitle">DOCTORS</p>
      <h2 className="doc-title">Our Qualified Doctors</h2>
      <p className="doc-text">
        Separated they live in. A small river named Duden flows by their place and supplies it with the
        necessary regelialia. It is a paradisematic country
      </p>

      <div className="carousel-container">
        <button className="arrow left-arrow" onClick={() => scroll('left')}>❮</button>
        <div className="doctors-grid" ref={scrollRef}>
          {[doctorImage1, doctorImage2, doctorImage3, doctorImage4].map((img, idx) => (
            <div className="doctor-card" key={idx}>
              <img src={img} alt="doctor img" />
              <h3>{['Dr. Lloyd Wilson', 'Dr. Rachel Parker', 'Dr. Ian Smith', 'Dr. Alicia Henderson'][idx]}</h3>
              <p className="speciality">{['NEUROLOGIST','OPHTHALMOLOGIST','DENTIST','PEDIATRICIAN'][idx]}</p>
              <p className="doc-desc">I am an ambitious workaholic, but apart from that, pretty simple person.</p>
            </div>
          ))}
        </div>
        <button className="arrow right-arrow" onClick={() => scroll('right')}>❯</button>
      </div>
    </section>
  );
};

export default Doctors;
