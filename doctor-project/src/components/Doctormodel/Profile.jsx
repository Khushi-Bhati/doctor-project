import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./../../styles/panel.css"
import Sidebar from './Sidebar'

import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react'
import { setProfileData } from '../../reducers/Reducers';
import FormData from 'form-data';
import user from "./../../images/user.webp"
import Header from './Header'


const Profile = () => {
  const Dispatch = useDispatch()
  const params = useParams()
  // const profileData = useSelector((state) => state.doctorprofile)
  const profileData = useSelector((state) => state.doctorprofile)


  const [loading, setLoading] = useState(false)


  const [formValue, setFormValue] = useState({
    doctorname: "",
    speciality: "",
    degree: "",
    experience: "",
    gender: "",
    alternateNo: "",
    address:"",
    city:"",
    state:"",
    pincode:"",

  })


  const [profileImage, setProfileImage] = useState(null);
  const [profileImgurl, setProfileImgurl] = useState(null)



  const updateprofileImage = () => {
    if (profileData?.profileImage) {
      setProfileImage(profileData.profileImage)
      setProfileImgurl(profileData.profileImage)
    }
  }






  const handleImage = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setProfileImage(image)

    setProfileImgurl(URL.createObjectURL(image))

    try {
      const formdata = new FormData()
      formdata.append("profileImage", image)


      const updatedImage = await axios.patch(`/Hospital/doctor/updatedoctorimg/${params.id}`, formdata)

      if (updatedImage.data.status === "success") {

        Dispatch(setProfileData(updatedImage.data.getdoctor))
        setProfileImgurl(updatedImage.data.getdoctor)



        Swal.fire({
          title: updatedImage.data.message,
          icon: "success",
          draggable: true
        });

      }
      else {

        Swal.fire({
          icon: "error",
          title: updatedImage.data.message,
          draggable: false
        });

      }

    } catch (error) {
      console.log(`error is ${error}`)

    }

  }

  const updateformvalues = () => {
    setFormValue(
      {
        ...formValue,
        doctorname: profileData?.doctorname,
        speciality: profileData?.speciality,
        degree: profileData?.degree,
        experience: profileData?.experience,
        gender: profileData?.gender,
        alternateNo: profileData?.alternateNo,
        address:profileData?.address,
        city:profileData?.city,
        state:profileData?.state,
        pincode:profileData?.pincode

      }
    )
  }




  const handelChnage = (e) => {
    const { name, value } = e.target;

    setFormValue(
      {
        ...formValue,
        [name]: value
      }
    )

  }



  const handelSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const updatedresponse = await axios.patch(`/Hospital/doctor/updatedoctor/${params.id}`,
        formValue,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'

          }
        }
      )

      if (updatedresponse.data.status === "success") {
        Dispatch(setProfileData(updatedresponse.data.updatedoctor))
        setLoading(false)
        setFormValue(updatedresponse.data.updatedoctor)
        Swal.fire({
          title: updatedresponse.data.message,
          icon: "success",
          draggable: true
        });

      }
      else {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: updatedresponse.data.message,
          draggable: false
        });

      }



    } catch (error) {
      console.log(`error is ${error}`)

    }
  }


  useEffect(() => {
    updateformvalues()

    updateprofileImage()




  }, [profileData])







  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="main-container">
        <Sidebar  />
        <main className="main-content">
          <Header/>

    <div className="profile-container-new">

  {/* Banner + Avatar */}
  <div className="profile-banner-wrapper">
    <div className="profile-banner"></div>

    <div className="profile-avatar-box">
      <img
        src={profileImgurl === null ? user : profileImgurl}
        alt="Profile"
        className="profile-avatar"
      />

      <label htmlFor="fileInput" className="profile-upload-btn">+</label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImage}
        hidden
      />
    </div>
  </div>

  {/* Basic Info */}
  <div className="profile-basic-info">
    <h1>Dr. {profileData?.doctorname}</h1>
    <p>{profileData?.userID?.email}</p>
  </div>

  {/* Form */}
  <form className="profile-form" onSubmit={handelSubmit}>

    <div className="input-row">
      <div className="input-box">
        <label>Doctor Name</label>
        <input type="text" name="doctorname" value={formValue.doctorname} onChange={handelChnage} />
      </div>

      <div className="input-box">
        <label>Speciality</label>
        <input type="text" name="speciality" value={formValue.speciality} onChange={handelChnage} />
      </div>
    </div>

    <div className="input-row">
      <div className="input-box">
        <label>Experience</label>
        <input type="text" name="experience" value={formValue.experience} onChange={handelChnage} />
      </div>

      <div className="input-box">
        <label>Degree</label>
        <input type="text" name="degree" value={formValue.degree} onChange={handelChnage} />
      </div>
    </div>
     <div className="input-row">
      <div className="input-box">
        <label>Gender</label>
        <input type="text" name="gender" value={formValue.gender} onChange={handelChnage} />
      </div>

      <div className="input-box">
        <label>Alternate No</label>
        <input type="text" name="alternateNo" value={formValue.alternateNo} onChange={handelChnage} />
      </div>
    </div>
     <div className="input-row">
      <div className="input-box">
        <label>Address</label>
        <input type="text" name="address" value={formValue.address} onChange={handelChnage} />
      </div>

      <div className="input-box">
        <label>City</label>
        <input type="text" name="city" value={formValue.city} onChange={handelChnage} />
      </div>
    </div>
     <div className="input-row">
      <div className="input-box">
        <label>State</label>
        <input type="text" name="state" value={formValue.state} onChange={handelChnage} />
      </div>

      <div className="input-box">
        <label>Pincode</label>
        <input type="text" name="pincode" value={formValue.pincode} onChange={handelChnage} />
      </div>
    </div>

    <button className="profile-save-btn">Save Changes</button>
  </form>

</div>


        </main>
      </div>


    </>
  )
}

export default Profile