import React, { useEffect, useState } from "react";
import PatientSidebar from "./Patierntsidebar";
import PatientHeader from "./PatientHeader";
import "./../../styles/doctorlist.css";
import axios from "axios";
import { Pagination } from "antd";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const Doctorslist = () => {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);

  const [doctorname, setDoctorname] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [minExp, setMinExp] = useState("");
  const [maxExp, setMaxExp] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);

  const getDoctorlist = async () => {
    try {
      setLoading(true);
      let query = `/Hospital/patient/getdoctorslist?page=${currentPage}&limit=${limit}`;

      if (doctorname) query += `&doctorname=${doctorname}`;
      if (speciality) query += `&speciality=${speciality}`;
      if (minExp) query += `&minimumexperience=${minExp}`;
      if (maxExp) query += `&greaterexperience=${maxExp}`;

      const res = await axios.get(query);

      if (res.data.status === "success") {
        setDoctors(res.data.doctors);
        setTotalDoctors(res.data.totalrecords);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctorlist();
  }, [currentPage, speciality]);

  return (
    <>
      <Backdrop open={loading} sx={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="main-container">
        <PatientSidebar />

        <div className="main-content">
          <PatientHeader />

          <div className="doctor-list-container">

            {/* ================= HEADER + FILTERS ================= */}
            <div className="doctor-header">
              <h2 className="page-title">Doctors</h2>

              <div className="header-filters">
                <input
                  type="text"
                  placeholder="Search doctor"
                  value={doctorname}
                  onChange={(e) => setDoctorname(e.target.value)}
                />

                <select
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                >
                  <option value="">All Specialities</option>
                  <option value="dentist">Dentist</option>
                  <option value="cardiologist">Cardiologist</option>
                  <option value="neurologist">Neurologist</option>
                  <option value="dermatologist">Dermatologist</option>
                  <option value="orthopedic">Orthopedic</option>
                  <option value="pediatrician">Pediatrician</option>
                  <option value="surgeon">Surgeon</option>
                </select>

                <div className="exp-inline">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minExp}
                    onChange={(e) => setMinExp(e.target.value)}
                  />
                  <span>–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxExp}
                    onChange={(e) => setMaxExp(e.target.value)}
                  />
                </div>

                <button className="filter-btn" onClick={getDoctorlist}>
                  Find
                </button>
              </div>
            </div>

            {/* ================= DOCTOR GRID ================= */}
            <div className="doctor-grid">
              {doctors.length > 0 ? (
                doctors.map((doctor, index) => (
                  <div className="doctor-card" key={index}>
                    <span className="status online">Online</span>

                    <img
                      src={doctor.profileImage}
                      alt="Doctor"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/150")
                      }
                    />

                    <h4>Dr. {doctor.doctorname}</h4>
                    <p className="role">{doctor.speciality}</p>

                    <div className="details">
                      <p><strong>Experience:</strong> {doctor.experience} yrs</p>
                      <p><strong>Contact:</strong> {doctor.alternateNo}</p>
                      <p><strong>Degree:</strong> {doctor.degree}</p>
                    </div>

                    <Link
                      to={`/doctorfullprofile/${doctor._id}`}
                      className="book-btn"
                    >
                      View Profile
                    </Link>
                  </div>
                ))
              ) : (
                <p className="no-data">No doctors found</p>
              )}
            </div>

            {/* ================= PAGINATION ================= */}
            <div className="pagination">
              <Pagination
                current={currentPage}
                pageSize={limit}
                total={totalDoctors}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctorslist;
