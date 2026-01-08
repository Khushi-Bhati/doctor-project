import React, { useEffect, useState } from 'react'

import PatientSidebar from './Patierntsidebar'
import user from "./../../images/user.webp"
import "./../../styles/patientprofile.css"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setPatientprofile } from '../../reducers/Reducers'
import Swal from "sweetalert2"
import { useParams } from 'react-router-dom'
import FormData from 'form-data'
import PatientHeader from './PatientHeader'

const PatientProfile = () => {

  const Dispatch = useDispatch()
  const params = useParams()
  const PatientprofileData = useSelector((state) => state.patientprofile)

  const [formValue, setFormvalue] = useState({
    patientname: "",
    gender: "",
    DOB: "",
    bloodgroup: "",
    height: "",
    weight: "",
    injuries: "",
    familymedicalhistory: "",
    exerciseroutine: "",
    alcohol: "",
    smoking: "",
    allergies: "",
    address: "",
    alternateNo: ""
  })

  const [profileImage, setProfileImage] = useState(PatientprofileData?.profileImage)
  const [profileImageurl, setprofileImageurl] = useState(PatientprofileData?.profileImage)


  const [insuranceImage, setInsuranceImage] = useState(PatientprofileData?.healthinsurance)
  const [insuranceImageurl, setInsuranceImageurl] = useState(PatientprofileData?.healthinsurance)


  const updateformvalues = () => {
    setFormvalue({
      ...formValue,
      patientname: PatientprofileData?.patientname,
      gender: PatientprofileData?.gender,
      DOB: PatientprofileData?.DOB,
      bloodgroup: PatientprofileData?.bloodgroup,
      height: PatientprofileData?.height,
      weight: PatientprofileData?.weight,
      injuries: PatientprofileData?.injuries,
      familymedicalhistory: PatientprofileData?.familymedicalhistory,
      exerciseroutine: PatientprofileData?.exerciseroutine,
      alcohol: PatientprofileData?.alcohol,
      smoking: PatientprofileData?.smoking,
      allergies: PatientprofileData?.allergies,
      address: PatientprofileData?.address,
      alternateNo: PatientprofileData?.alternateNo

    })

    setprofileImageurl(PatientprofileData?.profileImage)
    setInsuranceImageurl(PatientprofileData?.healthinsurance)
  }


  const handelChnage = (e) => {
    const { name, value } = e.target;

    setFormvalue(
      {
        ...formValue,
        [name]: value
      }
    )

  }


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const updatedpatientresponse = await axios.patch(`/Hospital/patient/updatepatient/${params.id}`,
        formValue,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      if (updatedpatientresponse.data.status === "success") {
        Dispatch(setPatientprofile(updatedpatientresponse.data.updatepatient))
        setFormvalue(updatedpatientresponse.data.updatepatient)
        Swal.fire({
          title: updatedpatientresponse.data.message,
          icon: "success",
          draggable: true
        });
      }
      else {

        Swal.fire({
          icon: "error",
          title: updatedpatientresponse.data.message,
          draggable: false
        });
      }

    } catch (error) {
      console.log("error is", error)
    }
  }

  const handleProfileImage = async (e) => {
    const profileimage = e.target.files[0]
    if (!profileimage) return;
    setProfileImage(profileimage)


    try {
      const formdata = new FormData()
      formdata.append("profileImage", profileimage)

      const updatedprofileimgresponse = await axios.patch(`/Hospital/patient/updatepatientimg/${params.id}`,
        formdata
      )

      if (updatedprofileimgresponse.data.status === "success") {

        Dispatch(setPatientprofile(updatedprofileimgresponse.data.getpatient))
        setProfileImage(updatedprofileimgresponse.data.getpatient.profileImage)
        setprofileImageurl(updatedprofileimgresponse.data.getpatient.profileImage)


        Swal.fire({
          title: updatedprofileimgresponse.data.message,
          icon: "success",
          draggable: true
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: updatedprofileimgresponse.data.message,
          draggable: false
        });
      }


    } catch (error) {
      console.log("error is", error)
    }
  }

  const handleinsuranceImage = async (e) => {
    const insuranceimage = e.target.files[0]
    if (!insuranceimage) return;
    setInsuranceImage(insuranceimage)


    try {
      const formdata = new FormData()
      formdata.append("healthinsurance", insuranceimage)

      const updatedinsuranceimgresponse = await axios.patch(`/Hospital/patient/updateinsuranceimg/${params.id}`,
        formdata,

      );



      if (updatedinsuranceimgresponse.data.status === "success") {

        Dispatch(setPatientprofile(updatedinsuranceimgresponse.data.getpatientprofile))
        setInsuranceImage(updatedinsuranceimgresponse.data.getpatientprofile.healthinsurance)
        setInsuranceImageurl(updatedinsuranceimgresponse.data.getpatientprofile.healthinsurance)


        Swal.fire({
          title: updatedinsuranceimgresponse.data.message,
          icon: "success",
          draggable: true
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: updatedinsuranceimgresponse.data.message,
          draggable: false
        });
      }


    } catch (error) {
      console.log("error is", error)
    }
  }

  useEffect(() => {
    updateformvalues()


  }, [PatientprofileData])

  return (
    <>
<div className="main-container" >
            <PatientSidebar />
            <main class="main-content">
                <PatientHeader />



        <div className="profile-wrapper">
          {/* Cover */}
          <div className="profile-cover" />

          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              <img
                src={profileImageurl ? profileImageurl : user}
                alt="Patient"
              />

              <label className="avatar-edit">
                +
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleProfileImage}
                />
              </label>
            </div>

            <h2>{formValue.patientname || "Patient Name"}</h2>
            <p>{PatientprofileData?.userID?.email}</p>
          </div>

          {/* Profile Form */}
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Patient Name</label>
              <input
                type="text"
                name="patientname"
                value={formValue.patientname || ""}
                onChange={handelChnage}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <input
                type="text"
                name="gender"
                value={formValue.gender || ""}
                onChange={handelChnage}
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="DOB"
                value={formValue.DOB || ""}
                onChange={handelChnage}
              />
            </div>

            <div className="form-group">
              <label>Blood Group</label>
              <input
                type="text"
                name="bloodgroup"
                value={formValue.bloodgroup || ""}
                onChange={handelChnage}
              />
            </div>

            <div className="form-group">
              <label>Height (cm)</label>
              <input
                type="text"
                name="height"
                value={formValue.height || ""}
                onChange={handelChnage}
              />
            </div>

            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="text"
                name="weight"
                value={formValue.weight || ""}
                onChange={handelChnage}
              />
            </div>

            <div className="form-group">
              <label>Allergies</label>
              <input
                type="text"
                name="allergies"
                value={formValue.allergies || ""}
                onChange={handelChnage}
              />
            </div>

            <div className="form-group">
              <label>Alternate No</label>
              <input
                type="text"
                name="alternateNo"
                value={formValue.alternateNo || ""}
                onChange={handelChnage}
              />
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formValue.address || ""}
                onChange={handelChnage}
              />
            </div>

            {/* Insurance Upload */}
 <div className="form-group full-width">
  <label>Health Insurance</label>

  <div className="insurance-preview small">
    <img
      src={insuranceImageurl ? insuranceImageurl : user}
      alt="Insurance"
    />
  </div>

  <input
    type="file"
    id="insuranceUpload"
    accept="image/*"
    onChange={handleinsuranceImage}
    hidden
  />

  <label htmlFor="insuranceUpload" className="insurance-upload-btn">
    Upload / Change Insurance
  </label>
</div>



            {/* Submit */}
            <div className="form-actions">
              <button type="submit" className="patient-submit-btn">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
 


      </>
  )
}

export default PatientProfile