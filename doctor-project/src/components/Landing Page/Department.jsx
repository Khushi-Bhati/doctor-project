import React, { useRef } from "react";
import "./../../styles/Department.css";
import cardiologist from "./../../images/cardiologist.webp";
import surgeon from "./../../images/general-surgeon.webp";
import medicinespecialist from "./../../images/medicine-specialist.webp";
import otolaryngologists from "./../../images/otolaryngologists-ent.webp";
import pediatrician from "./../../images/pediatrician.webp";
import gynecologist from "./../../images/gynecologist-obstetrician.webp";
import Navbar from "./Navbar";

const departments = [
  { title: "Gynecologist & Obstetrician", icon: gynecologist },
  { title: "Medicine Specialist", icon: medicinespecialist },
  { title: "Cardiologist", icon: cardiologist },
  { title: "Pediatrician", icon: pediatrician },
  { title: "General Surgeon", icon: surgeon },
  { title: "ENT Specialist", icon: otolaryngologists },
];

const Departments = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction * 240,
      behavior: "smooth",
    });
  };

  

  return (
    <div className="landingpage">
      <Navbar />

      <section className="departments-section">
        <div className="dept-container">

          {/* HEADER */}
          <div className="dept-header">
            <h2>Consult Our Specialized Doctors</h2>
            <p>
              Choose from a wide range of expert doctors available for
              consultation anytime.
            </p>
          </div>

          {/* GRID */}
          <div className="dept-grid-wrapper">
            <button className="dept-arrow left" onClick={() => scroll(-1)}>
              ‹
            </button>

            <div className="dept-scroll" ref={scrollRef}>
              <div className="dept-grid">
                {departments.map((dept, index) => (
                  <div className="dept-card" key={index}>
                    <div className="dept-icon">
                      <img src={dept.icon} alt={dept.title} />
                    </div>
                    <h4>{dept.title}</h4>
                    <button className="consult-btn">Consult Now</button>
                  </div>
                ))}
              </div>
            </div>

            <button className="dept-arrow right" onClick={() => scroll(1)}>
              ›
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Departments;
