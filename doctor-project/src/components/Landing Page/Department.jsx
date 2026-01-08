import React, { useRef, useState } from "react";
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
  const [departments1, setDepartments1] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchClinics = async () => {
    try {
      const response = await fetch(
        "https://doctor-project-1-yndq.onrender.com/Hospital/doctor/getclinicslist"
      );

      const data = await response.json();
      console.log(data + "i went to check the problem")

      // adjust according to your API response structure
      setDepartments1(data.data || data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching clinics:", error);
      setLoading(false);
    }
  };

  fetchClinics();
}, []);

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
                {departments1.map((dept, index) => (
                  <div className="dept-card" key={index}>
                    <div className="dept-icon">
                      {/* <img src={dept.icon} alt={dept.title} /> */}
                      <img src={dept.image} alt={dept.name} /> 
                    </div>
                    {/* <h4>{dept.title}</h4> */}
                     <h4>{dept.name}</h4>
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
