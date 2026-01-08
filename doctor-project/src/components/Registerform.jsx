import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./../styles/Registerform.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "./../images/shape-reg-provider-3.webp"
import Navbar from "./Landing Page/Navbar";





const Registerform = () => {
  const Navigate = useNavigate()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const [loading, setLoading] = useState(false)
  const [showpassword, setshowpassword] = useState(false)
  const togglepassword = () => {
    setshowpassword(!showpassword)

  }


  const [formvalue, setFormValue] = useState({
    username: "",
    password: "",
    mobileno: "",
    usertype: "",
    email: "",
  })







  const handelChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formvalue,
      [name]: value

    })




  }




  const handelSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)


      if (formvalue.mobileno.length < 10) {
        Swal.fire({
          icon: "error",
          title: "Please Enter a valid mobile number",

        });
        setLoading(false)

        return

      }

      if (!emailRegex.test(formvalue.email.trim())) {
        Swal.fire({
          icon: "error",
          title: "Please Enter a valid email",

        });
        setLoading(false)

        return

      }

      const registerresponse = await axios.post("/Hospital/user/register",
        formvalue,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'

          }
        }
      )


      if (registerresponse.data.status === "success") {
        setLoading(false)
        Swal.fire({
          title: registerresponse.data.message,
          icon: "success",
          draggable: true
        });
        Navigate("/login")
      }
      else {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: registerresponse.data.message,
          // text: "Something went wrong!",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
      }

    } catch (error) {
      setLoading(false)
      console.log("register response error", error)

    }
  }

  return (
    <React.Fragment>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar />
      <div className="register-main-container">

        <div className="login-card-wrapper"  >

          {/* LEFT SIDE IMAGE */}

          <img src={loginImage} alt=""   />


          {/* RIGHT SIDE FORM */}
          <div className="login-right-section">
            <div className="login-card">
              <h2>Register</h2>
              <p className="subtitle">Welcome...</p>
            <form onSubmit={handelSubmit}>

  <div className="form-grid">
    <div className="input-group">
      <label>Username</label>
      <input
        type="text"
        placeholder="Username"
        required
        name="username"
        onChange={handelChange}
        value={formvalue.username}
      />
    </div>

    <div className="input-group">
      <label>Mobile No</label>
      <input
        type="text"
        placeholder="Mobile No"
        maxLength={10}
        required
        name="mobileno"
        onChange={handelChange}
        value={formvalue.mobileno}
      />
    </div>

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

    <div className="input-group">
      <label>Usertype</label>
      <input
        type="text"
        placeholder="Usertype"
        required
        name="usertype"
        onChange={handelChange}
        value={formvalue.usertype}
      />
    </div>
  </div>

  {/* Full-width password field */}
  <div className="input-group password-group full-width">
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
    Register
  </button>

  <p className="signup-text">
    Already have an account? <Link to="/login">login</Link>
  </p>

</form>

              {/* form here */}
            </div>
          </div>

        </div>

      </div>


    </React.Fragment>
  );
};
export default Registerform;
