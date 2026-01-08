import React, { useEffect, useState } from "react";
import "./../../styles/clinicprofile.css";
import Clinicsidebar from "./Clinicsidebar";
import Clinicheader from "./Clinicheader";
import { useDispatch, useSelector } from "react-redux";
import { setClinicprofile } from "../../reducers/Reducers";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Clinicprofile = () => {
  const clinicprofileData = useSelector((state) => state.clinicprofile);
  const dispatch = useDispatch();
  const params = useParams();

  const [formValue, setFormvalue] = useState({
    clinicname: "",
    address: "",
    contact: "",
    email: "",
    openingtime: "",
    closingtime: "",
    totalDoctors: "",
  });

  useEffect(() => {
    if (clinicprofileData) {
      setFormvalue({
        clinicname: clinicprofileData.clinicname || "",
        address: clinicprofileData.address || "",
        contact: clinicprofileData.contact || "",
        email: clinicprofileData.email || "",
        openingtime: clinicprofileData.openingtime || "",
        closingtime: clinicprofileData.closingtime || "",
        totalDoctors: clinicprofileData.totalDoctors || "",
      });
    }
  }, [clinicprofileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `/Hospital/clinic/updateclinic/${params.id}`,
        formValue,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.status === "success") {
        dispatch(setClinicprofile(response.data.updateclinic));
        Swal.fire({ title: response.data.message, icon: "success" });
      } else {
        Swal.fire({ title: response.data.message, icon: "error" });
      }
    } catch (error) {
      console.error("Error updating clinic:", error);
      Swal.fire({ title: "Something went wrong!", icon: "error" });
    }
  };

  return (
    <div className="main-container">
      <Clinicsidebar />
      <main className="main-content">
        <Clinicheader />
        <div className="clinic-main-container">
          <div className="patient-main-content">
            <h2 className="profile-update-heading">Clinic Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="top-section-container">
                {/* LEFT IMAGE GALLERY */}
                <div className="clinic-photo-section">
                  <img
                    src={clinicprofileData?.clinicImages?.[0]}
                    alt="Clinic"
                    className="clinic-photo-large"
                  />
                  <div className="clinic-photo-row">
                    {clinicprofileData?.clinicImages?.slice(1, 4).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Clinic ${idx + 1}`}
                        className="clinic-photo-small"
                      />
                    ))}
                  </div>
                </div>

                {/* RIGHT FORM */}
                <div className="clinic-basic-details">
                  <div className="patient-field">
                    <label>Clinic Name</label>
                    <input
                      type="text"
                      name="clinicname"
                      value={formValue.clinicname}
                      onChange={handleChange}
                      placeholder="Enter clinic name"
                    />
                  </div>
                  <div className="patient-field">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formValue.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="patient-field">
                    <label>Contact</label>
                    <input
                      type="text"
                      name="contact"
                      value={formValue.contact}
                      onChange={handleChange}
                      placeholder="Enter contact"
                    />
                  </div>
                  <div className="patient-field">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formValue.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                    />
                  </div>

                  <div className="patient-column">
                    <div className="patient-field">
                      <label>Opening Time</label>
                      <input
                        type="time"
                        name="openingtime"
                        value={formValue.openingtime}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="patient-field">
                      <label>Closing Time</label>
                      <input
                        type="time"
                        name="closingtime"
                        value={formValue.closingtime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="patient-field">
                    <label>Total Doctors</label>
                    <input
                      type="number"
                      name="totalDoctors"
                      value={formValue.totalDoctors}
                      onChange={handleChange}
                      placeholder="Enter total doctors"
                    />
                  </div>
                </div>
              </div>

              <div className="actions-row">
                <button type="submit" className="patient-submit-btn">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Clinicprofile;

