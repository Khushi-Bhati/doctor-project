import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setPatientprofile,
  setProfileData,
  setClinicprofile
} from "./reducers/Reducers.js";

const App = () => {
  const dispatch = useDispatch();

  const doctorProfile = useSelector((state) => state.doctorprofile);
  const patientProfile = useSelector((state) => state.patientprofile);
  const clinicProfile = useSelector((state) => state.clinicprofile);

  const loginId = localStorage.getItem("loginid");


  const getDoctorProfile = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}Hospital/doctor/getdoctor/${loginId}`);
      if (res.data.status === "success") {
        dispatch(setProfileData(res.data.existingdoctor));
      }
    } catch (err) {
      console.log("Doctor profile error:", err);
    }
  };

const getPatientProfile = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}Hospital/patient/getpatient/${loginId}`,
      {
        headers: { 'Cache-Control': 'no-cache' },
      }
    );
    if (res.data.status === "success") {
      dispatch(setPatientprofile(res.data.existingPatient));
    }
  } catch (err) {
    console.log("Patient profile error:", err);
  }
};

const getClinicProfile = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}Hospital/clinic/getclinic/${loginId}`,
      {
        headers: { 'Cache-Control': 'no-cache' },
      }
    );
    if (res.data.status === "success") {
      dispatch(setClinicprofile(res.data.existingclinic));
    }
  } catch (err) {
    console.log("Clinic profile error:", err);
  }
};


  useEffect(() => {
    if (!loginId) return;

    if (!doctorProfile?._id) {
      getDoctorProfile();
    }

    if (!patientProfile?._id) {
      getPatientProfile();
    }

    if (!clinicProfile?._id) {
      getClinicProfile();
    }

  }, [loginId, dispatch]);

  return <Outlet />;
};

export default App;
