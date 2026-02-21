import React from 'react'
import "./../styles/patient.css"
import Formdata from "form-data"
import axios from "axios"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


import user from "./../images/user.webp"
import { useDispatch } from 'react-redux';
import { setPatientprofile } from '../reducers/Reducers';


const Createpatientprofile = () => {
    const Dispatch = useDispatch()


    const Navigate = useNavigate()
    const [loading, setLoading] = useState(false)

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

    const [profileimage, setProfileimage] = useState(null);
    const [profileimgurl, setProfileimgurl] = useState(null)
    const [insuranceimg, setinsuranceimage] = useState(null);
    const [insuranceimgurl, setinsuranceimgurl] = useState(null)



    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormvalue({
            ...formValue,
            [name]: value

        })
    }

    const handelprofileimg = (e) => {
        const image1 = e.target.files[0];

        setProfileimage(image1)



        setProfileimgurl(URL.createObjectURL(image1))



    }

    const handelinsuranceimg = (e) => {

        const image2 = e.target.files[0];

        setinsuranceimage(image2)




        setinsuranceimgurl(URL.createObjectURL(image2))

    }








    const handelSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)

            const formdata = new FormData()


            formdata.append("patientname", formValue.patientname);
            formdata.append("DOB", formValue.DOB)
            formdata.append("bloodgroup", formValue.bloodgroup);
            formdata.append("address", formValue.address);


            formdata.append("height", formValue.height)
            formdata.append("weight", formValue.weight)
            formdata.append("injuries", formValue.injuries)
            formdata.append("familymedicalhistory", formValue.familymedicalhistory)
            formdata.append("exerciseroutine", formValue.exerciseroutine)
            formdata.append("alcohol", formValue.alcohol)
            formdata.append("smoking", formValue.smoking)
            formdata.append("allergies", formValue.allergies)
            formdata.append("alternateNo", formValue.alternateNo)
            formdata.append("gender", formValue.gender);
            formdata.append("profileImage", profileimage);
            formdata.append("healthinsurance", insuranceimg);
            formdata.append("userID", localStorage.getItem("loginid"))

            if (formValue.alternateNo.length < 10) {
                Swal.fire({
                    title: "Please enter a 10 digit number",
                    icon: "error",

                });
                setLoading(false)
                return
            }

            if (!profileimgurl) {

                Swal.fire({
                    title: "Please upload a profile Image",
                    icon: "error",

                });
                setLoading(false)
                return
            }
            const patientprofileresopnse = await axios.post(`${process.env.REACT_APP_API_URL}Hospital/patient/addpatient`,
                formdata


            )

            if (patientprofileresopnse.data.status === "success") {
                setLoading(false)
                Dispatch(setPatientprofile(patientprofileresopnse.data.Patient))

                Swal.fire({
                    title: patientprofileresopnse.data.message,
                    icon: "success",
                    draggable: true
                });

                Navigate("/patientdashboard")

                setFormvalue(
                    {
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

                    }

                )

                localStorage.setItem("patientid", patientprofileresopnse.data.patientid)

                setProfileimage(null)
                setProfileimgurl(null)
                setinsuranceimage(null)
                setinsuranceimgurl(null)


            }
            else {
                setLoading(false)
                Swal.fire({
                    icon: "error",
                    title: patientprofileresopnse.data.message,
                    draggable: false
                });

            }



        } catch (error) {
            console.log("error is", error)

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

            <div className="patient-background">
                <div className="overlay" />
                <div className="form-box">
                    <h2>Patient Registration </h2>
                    <p className="doctor-info">
                        🧾 Before accessing your dashboard, please complete your registration as a patient.
                    </p>

                    <div className="patientcontent">
                        <form action="#" onSubmit={handelSubmit}>
                            <div className="patientform-grid">


                                <div className="patientcolumn">
                                    <div className="profile-pic">
                                        <label htmlFor="profileInput">
                                            <img
                                                src={profileimgurl === null ? user : profileimgurl}
                                                alt="Profile Preview"
                                                id="profilePreview"
                                            />
                                        </label>
                                        <input
                                            type="file"
                                            id="profileInput"
                                            onChange={handelprofileimg}
                                            accept="image/*"
                                        />
                                        <span className="upload-label">Upload Profile</span>
                                    </div>

                                    <div className="patientinput-box">
                                        <span className="patientdetails">Patient Name</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            required
                                            name="patientname"
                                            onChange={handleChange}
                                            value={formValue.patientname}
                                        />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Alternate Number</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your number"
                                            required
                                            name="alternateNo"
                                            maxLength={10}

                                            onChange={handleChange}
                                            value={formValue.alternateNo}
                                        />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Address</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your address"
                                            required
                                            name="address"
                                            onChange={handleChange}
                                            value={formValue.address}
                                        />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Date of Birth</span>
                                        <input
                                            type="date"
                                            placeholder="Enter your address"
                                            required
                                            name="DOB"
                                            onChange={handleChange}
                                            value={formValue.DOB}
                                        />
                                    </div>


                                </div>


                                <div className="patientcolumn">
                                    <label>Gender</label>
                                    <div className="gender-options">
                                        <label>
                                            <input type="radio" onChange={handleChange} name="gender" value="Male" /> Male
                                        </label>
                                        <label>
                                            <input type="radio" onChange={handleChange} name="gender" value="Female" /> Female
                                        </label>
                                        <label>
                                            <input type="radio" onChange={handleChange} name="gender" value="Prefer not to say" /> Prefer
                                            not to say
                                        </label>
                                    </div>

                                    <div className="patientinput-box" style={{ marginTop: "15px" }}>
                                        <span className="patientdetails">Blood Group</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your bloodgroup"
                                            required
                                            name="bloodgroup"
                                            onChange={handleChange}
                                            value={formValue.bloodgroup}
                                        />
                                    </div>

                                    <div className="patientinput-box">
                                        <span className="patientdetails">Height</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your height"
                                            required
                                            name="height"
                                            onChange={handleChange}
                                            value={formValue.height}
                                        />
                                    </div>

                                    <div className="patientinput-box">
                                        <span className="patientdetails">Weight</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your weight"
                                            required
                                            name="weight"
                                            onChange={handleChange}
                                            value={formValue.weight}
                                        />
                                    </div>
                                    <div className="patientcolumn">
                                        <label>Injuries</label>
                                        <div className="gender-options">
                                            <label>
                                                <input type="radio" onChange={handleChange} name="injuries" value="yes" /> Yes
                                            </label>
                                            <label>
                                                <input type="radio" onChange={handleChange} name="injuries" value="no" /> No
                                            </label>

                                        </div>
                                    </div>
                                    <label>Allergies</label>
                                    <div className="gender-options">
                                        <label>
                                            <input type="radio" onChange={handleChange} name="allergies" value="yes" /> Yes
                                        </label>
                                        <label>
                                            <input type="radio" onChange={handleChange} name="allergies" value="no" /> No
                                        </label>

                                    </div>

                                </div>


                                <div className="patientcolumn">


                                    <label>Alcohol</label>
                                    <div className="gender-options">
                                        <label>
                                            <input type="radio" onChange={handleChange} name="alcohol" value="yes" /> Yes
                                        </label>
                                        <label>
                                            <input type="radio" onChange={handleChange} name="alcohol" value="no" /> No
                                        </label>

                                    </div>
                                    <label>Smoking</label>
                                    <div className="gender-options">
                                        <label>
                                            <input type="radio" onChange={handleChange} name="smoking" value="yes" /> Yes
                                        </label>
                                        <label>
                                            <input type="radio" onChange={handleChange} name="smoking" value="no" /> No
                                        </label>

                                    </div>

                                    <div className="patientinput-box">
                                        <span className="patientdetails">Exercise Routine</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your exercise routine"
                                            required
                                            name="exerciseroutine"
                                            onChange={handleChange}
                                            value={formValue.exerciseroutine}
                                        />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Insurance Document</span>
                                        <label htmlFor="insuranceInput" className="insurance-label">


                                        </label>

                                        {insuranceimgurl && (
                                            <div className="insurance-preview">
                                                <img
                                                    src={insuranceimgurl}
                                                    alt="Insurance Preview"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                />
                                            </div>
                                        )}


                                        <input
                                            type="file"
                                            id="insuranceInput"
                                            onChange={handelinsuranceimg}
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Family Medical History</span>
                                        <input
                                            type="text"
                                            placeholder="Enter family medical history"
                                            required
                                            name="familymedicalhistory"
                                            onChange={handleChange}
                                            value={formValue.familymedicalhistory}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="patientbutton">
                                <input type="submit" value="Register" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>


        </React.Fragment>
    )
}

export default Createpatientprofile
