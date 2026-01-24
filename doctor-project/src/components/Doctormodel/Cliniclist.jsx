import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./../../styles/cliniclist.css";
import axios from "axios";
import { Pagination } from "antd";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Cliniclist = () => {
  const profileData = useSelector((state) => state.doctorprofile);

  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(3);
  const [clinics, setClinics] = useState([]);
  console.log(clinics)
  const [totalpages, setTotalpages] = useState(0);
  const [totalclinics, setTotalclinics] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);

const getCliniclist = async () => {
  try {
    setLoading(true);

    const query = `${process.env.REACT_APP_API_URL}/Hospital/doctor/getclinicslist?page=${currentpage}&limit=${limit}`;
    console.log("API URL:", query);

    const response = await axios.get(query);

    console.log("FULL API RESPONSE:", response);
    console.log("RESPONSE DATA:", response.data);

    if (response.data?.status === "success") {
      console.log("CLINICS ARRAY:", response.data.clinics);
      console.log("CLINICS LENGTH:", response.data.clinics?.length);

      setClinics(response.data.clinics || []);
      setTotalpages(response.data.totalpages || 0);
      setTotalclinics(
        response.data.totalrecords || response.data.total || 0
      );
    } else {
      console.warn("API STATUS NOT SUCCESS", response.data);
    }
  } catch (error) {
    console.error("API ERROR:", error?.response || error);
  } finally {
    setLoading(false);
  }
};


  const onChange = (page, pageSize) => {
    setCurrentPage(page);
    setLimit(pageSize);
  };

  const handleaddClinic = async (clinicId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Hospital/doctor/addtodoctor`,
        {
          doctorid: profileData._id,
          clinicid: clinicId,
        }
      );

      if (response.data.status === "success") {
        Swal.fire({
          title: response.data.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.log("ADD CLINIC ERROR:", error);
    }
  };

  useEffect(() => {
      console.log("useEffect triggered", currentpage, limit);
    getCliniclist();
  }, [currentpage, limit]);

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="main-container">
        <Sidebar />
        <main className="main-content">
          <Header />

          <div className="cliniclist-container">
            <h2 className="page-title">Clinics in Faridabad</h2>

            {/* FILTER BAR */}
            <div className="filter-bar">
              <select>
                <option>Location</option>
                <option>Sector 86</option>
                <option>NIT</option>
                <option>Old Faridabad</option>
              </select>

              <select>
                <option>Speciality</option>
                <option>General Physician</option>
                <option>Dermatology</option>
                <option>Orthopedic</option>
              </select>

              <select>
                <option>Rating</option>
                <option>4+ Star</option>
                <option>3+ Star</option>
                <option>All</option>
              </select>
            </div>

            {/* CLINIC LIST */}
            {clinics.length > 0 ? (
              clinics.map((clinic) => (
                <div className="clinic-card" key={clinic._id}>
                  <div className="clinic-left">
                    <img
                      className="clinic-logo"
                      src={clinic.clinicImages?.[0]}
                      alt="Clinic"
                    />

                    <div className="clinic-info">
                      <h3>{clinic.clinicname}</h3>
                      <p className="location">
                        General Health Clinic • {clinic.address}
                      </p>
                      <p className="fees">₹600 Consultation Fees</p>
                      <p className="open">Open Today 7:00 AM - 1:00 PM</p>

                      <div className="doctor">
                        <img src="https://cdn-icons-png.flaticon.com/512/387/387561.png" />
                        <div>
                          <strong>Dr. Maheshwar Chawla</strong>
                          <span>General Physician • 19 yrs exp</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="clinic-right">
                    <button
                      onClick={() => handleaddClinic(clinic._id)}
                      className="add-btn"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No Clinics found</p>
            )}

            {/* PAGINATION */}
            <div className="pagination">
              <Pagination
                showQuickJumper
                pageSizeOptions={[4, 8, 12, 20]}
                current={currentpage}
                pageSize={limit}
                total={totalclinics}
                onChange={onChange}
                style={{ marginTop: 20, textAlign: "center" }}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Cliniclist;
