import React, { useEffect, useState } from "react";
import "./../../styles/Doctorlisting.css";
import Clinicsidebar from "./Clinicsidebar";
import Clinicheader from "./Clinicheader";
import axios from "axios";
import Swal from "sweetalert2";

const Doctorlisting = () => {


  const [selectedClinicId, setSelectedClinicId] = useState(null);
  const [selecteddoctor, setselecteddoctor] = useState(null);
  const [showpopup, setshowpopup] = useState(false);

  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
const [approvedDoctors,setapprovedDoctors] = useState(false)
  const [doctorname, setDoctorname] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [minExp, setMinExp] = useState("");
  const [maxExp, setMaxExp] = useState("");
  const [status, setstatus] = useState("notverified");

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 2;

  const handlepopup = (doctor, clinicId) => {
    setselecteddoctor(doctor);
    setSelectedClinicId(clinicId);
    setshowpopup(true);
  };

  const getDoctorlist = async () => {
    try {
      setLoading(true);

      let query = `${process.env.REACT_APP_API_URL}Hospital/patient/getdoctorslist?page=${currentPage}&limit=${limit}`;
      if (doctorname) query += `&doctorname=${doctorname}`;
      if (speciality) query += `&speciality=${speciality}`;
      if (minExp) query += `&minimumexperience=${minExp}`;
      if (maxExp) query += `&greaterexperience=${maxExp}`;
      if (status) query += `&status=${status}`;

      const res = await axios.get(query);

     
      if (res.data.status === "success") {
        setDoctors(res.data.doctors);
        setTotalDoctors(res.data.totalrecords);
      }
    } catch (error) {
      console.log("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const DoctorStatusUpdate = async (id, status) => {
    try {
      const updateDoctors = doctors.map((doctor) =>{
        if(doctor._id === id){
          return {
            ...doctor,
            status : status
          }
          return doctor
        }
      })

      setDoctors(updateDoctors)
      const response = await axios.patch(
        "/Hospital/clinic/approveddoctors",
        { doctorid: id, status:status },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.status === "success") {
        Swal.fire({
          title: response.data.message,
          icon: "success",
        });
        getDoctorlist();
      } else {
        Swal.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    } catch (error) {
      console.error("Approval doctor error", error);
    }
  };

  useEffect(() => {
    getDoctorlist();
  }, [currentPage, speciality, status]);

  return (
    <div className="main-container">
      <Clinicsidebar />

      <main className="main-content">
        <Clinicheader />

        <div className="doctor-page">
          {/* HEADER */}
          <div className="doctor-page-header">
            <h2>Doctor Approval</h2>
            <p>Verify and manage newly registered doctors</p>
          </div>

          {/* FILTERS */}
          <div className="doctor-filters">
            <select
              value={status}
              onChange={(e) => {
                setstatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* LOADING */}
          {loading && <p className="loading-text">Loading doctors...</p>}

          {/* DOCTOR GRID */}
          {!loading && (
            <div className="doctor-grid">
              {doctors?.length > 0 ? (
                doctors.map((doctor) => (
                  <div className="doctor-glass-card" key={doctor?._id}>
                    <div className="doctor-strip"></div>

                    <div className="doctor-content">
                      <div className="doctor-top">
                        <img
                          src={doctor?.profileImage || "/doctor-placeholder.png"}
                          alt={doctor?.doctorname}
                        />
                        <div>
                          <h3>{doctor?.doctorname}</h3>
                          <span className="specialization">
                            {doctor?.speciality}
                          </span>
                          <span
                            className={`status-badge ${doctor?.status || "notverified"
                              }`}
                          >
                            {doctor?.status
                              ? doctor?.status.toUpperCase()
                              : "NOTVERIFIED"}
                          </span>
                        </div>
                      </div>

                      <div className="doctor-details">
                        <span>🩺 {doctor?.experience} Years</span>
                        <span>🎓 {doctor?.degree}</span>
                        <span>🧑‍⚕️ {doctor?.gender}</span>
                        <span>✉️ {doctor?.userID?.email}</span>
                        <span>
                          📞 {doctor?.userID?.mobileno}
                          {doctor?.alternateNo &&
                            `, ${doctor?.alternateNo}`}
                        </span>
                      </div>

                      <div className="doctor-details address">
                        <span>
                          📍 {doctor?.address}, {doctor?.city},{" "}
                          {doctor?.state} – {doctor?.pincode}
                        </span>
                      </div>
                    </div>

                    <div className="doctor-actions">
                      <button
                        className="licence-btn"
                        onClick={() => handlepopup(doctor)}
                      >
                        View Licence
                      </button>
{doctor?.status === "notverified" && (<>
  <button
                        onClick={() => {
                          DoctorStatusUpdate(doctor._id, "approved");
                          
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => {
                          DoctorStatusUpdate(doctor._id, "rejected")
                          
                        }
                        }
                      >
                        Reject
                      </button></>)}

                    

                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No doctors found</p>
              )}
            </div>
          )}
        </div>

        {/* LICENCE POPUP */}
        {showpopup && selecteddoctor && (
          <div className="appointment-overlay">
            <div className="appointment-popup">
              <h3>View License</h3>
              <p>
                <strong>Doctor:</strong> Dr {selecteddoctor.doctorname}
              </p>

              <div className="license-image">
                <img
                  src={selecteddoctor.profileImage}
                  alt="License"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    borderRadius: "8px",
                  }}
                />
              </div>

              <div className="popup-actions">
                <a
                  href={selecteddoctor.profileImage}
                  download="license"
                  className="confirm-btn"
                >
                  Download License
                </a>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setshowpopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Doctorlisting;
