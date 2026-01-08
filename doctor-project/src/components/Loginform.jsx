import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./../styles/login.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "./../images/shape-reg-provider-3.webp"
import Navbar from "./Landing Page/Navbar";


const Loginform = () => {
  
  const Navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showpassword, setshowpassword] = useState(false);

  const togglepassword = () => setshowpassword(!showpassword);

  const [formvalue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formvalue, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
const loginresponse = await axios.post(
  `${process.env.REACT_APP_API_URL}Hospital/user/login`,
  formvalue,
  {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  }
);



      setLoading(false);

      if (loginresponse.data.status === "success") {
        localStorage.setItem("token", loginresponse.data.token);
        localStorage.setItem("loginid", loginresponse.data.loginid);
        localStorage.setItem("usertype", loginresponse.data.role);

        const role = loginresponse.data.role.toLowerCase();
        const isCreated = loginresponse.data.isprofilecreated;

        if (role === "doctor") Navigate(isCreated ? "/dashboard" : "/doctor");
        else if (role === "patient")
          Navigate(isCreated ? "/patientdashboard" : "/patient");
        else if (role === "clinic")
          Navigate(isCreated ? "/clinicdashboard" : "/addclinic");

        Swal.fire({
          title: loginresponse.data.message,
          icon: "success",
        });

        setFormValue({ email: "", password: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: loginresponse.data.message,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("login error", error);
    }
  };

  return (
    <>
      {/* Loader */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar/>
<div className="login-main-container">

  <div className="login-card-wrapper">

    {/* LEFT SIDE IMAGE */}
    
      <img src={loginImage} alt="" />
   

    {/* RIGHT SIDE FORM */}
    <div className="login-right-section">
      <div className="login-card">
        <h2>Login</h2>
        <p className="subtitle">Welcome Back</p>
  <form onSubmit={handelSubmit}>
              {/* EMAIL */}
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  name="email"
                  onChange={handelChange}
                  value={formvalue.email}
                />
              </div>

              {/* PASSWORD */}
              <div className="input-group password-group">
                <label>Password</label>
                <input
                  type={showpassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  name="password"
                  onChange={handelChange}
                  value={formvalue.password}
                />
                <span className="eye-icon" onClick={togglepassword}>
                  {showpassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>

              <p className="signup-text">
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
            </form>
        {/* form here */}
      </div>
    </div>

  </div>

</div>



    

    </>
  );
};

export default Loginform;

