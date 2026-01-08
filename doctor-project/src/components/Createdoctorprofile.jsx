import React, { useState } from "react";
import "./../styles/medical.css"
import FormData from "form-data"
import axios from "axios"
import Swal from "sweetalert2";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from "react-router-dom";
import user from "./../images/user.webp"

const Medical = () => {
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [formValue, setFormvalue] = useState({
        doctorname: "",
        speciality: "",
        degree: "",
        experience: "",
        gender: "",
        alternateNo: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    })

    const [profileImage, setProfileimage] = useState(null);
    const [profileImgurl, setProfileimgurl] = useState(null)
    const [licenceImage, setlicenceimage] = useState(null)
    const [licenceImageurl, setlicenceimageurl] = useState(null)

    const handelfile = (e) => {
        const { name } = e.target;
        if (name === "profileimage") {
            const image = e.target.files[0]

            setProfileimage(image)
            setProfileimgurl(URL.createObjectURL(image))
        }
        else{
            const image = e.target.files[0]
            setlicenceimage(image)
            setlicenceimageurl(URL.createObjectURL(image))
        }






    }

    const handelChange = (e) => {
        const { name, value } = e.target;

        setFormvalue({
            ...formValue,
            [name]: value

        })




    }

    const handelSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const formdata = new FormData()

            formdata.append("doctorname", formValue.doctorname);
            formdata.append("experience", formValue.experience)
            formdata.append("degree", formValue.degree);
            formdata.append("speciality", formValue.speciality)
            formdata.append("alternateNo", formValue.alternateNo)
            formdata.append("gender", formValue.gender);
            formdata.append("address", formValue.address);
            formdata.append("city", formValue.city)
            formdata.append("state", formValue.state)
            formdata.append("pincode", formValue.pincode)
            formdata.append("profileImage", profileImage);
            formdata.append("licenseImage",licenceImage)
            formdata.append("userID", localStorage.getItem("loginid"))
           
      

            if (!profileImgurl) {
                Swal.fire({
                    title: "Please upload a profile Image",
                    icon: "error",

                });
                setLoading(false)
                return

            }

            if (formValue.alternateNo.length < 10) {
                Swal.fire({
                    title: "Please enter a 10 digit number",
                    icon: "error",

                });
                setLoading(false)
                return
            }


            const profileresopnse = await axios.post("/Hospital/doctor/adddoctor",
                formdata


            )

            if (profileresopnse.data.status === "success") {
                setLoading(false)
                Swal.fire({
                    title: profileresopnse.data.message,
                    icon: "success",
                    draggable: true
                });

                Navigate("/dashboard")

                setFormvalue(
                    {
                        doctorname: "",
                        speciality: "",
                        degree: "",
                        experience: "",
                        gender: "",
                        alternateNo: ""
                    }

                )

                setProfileimage(null)
                setProfileimgurl(null)
                localStorage.setItem("doctorid",profileresopnse.data.doctorid)


            }
            else {
                setLoading(false)
                Swal.fire({
                    icon: "error",
                    title: profileresopnse.data.message,
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
            <div>

                {/* Background + Form */}
                <div className="medical-background">
                    <div className="overlay" />
                    <div className="form-box">
                        <h2>Doctor Registration </h2>
                        <p className="doctor-info">
                            🩺 Before accessing your dashboard, please complete your registration  as a doctor .
                        </p>
                        {/* Profile Upload */}

                        <form onSubmit={handelSubmit}>
                            <div className="profile-pic">
                                <label htmlFor="fileInput">
                                    <img src={profileImgurl === null ? user : profileImgurl} alt="Profile Preview" id="profilePreview" />
                                </label>
                                <input type="file" id="fileInput" accept="image/*" name="profileimage" onChange={handelfile} />
                                <span className="upload-label">Upload Profile Photo</span>
                            </div>

                            <div className="form-grid">

                                <div className="form-group">
                                    <label>Doctor Name</label>
                                    <input type="text" placeholder="Enter your name" required name="doctorname" value={formValue.doctorname} onChange={handelChange} />
                                </div>
                                <div className="form-group">
                                    <label>Specialization</label>
                                    <select
                                        required
                                        name="speciality"
                                        value={formValue.speciality}
                                        onChange={handelChange}
                                    >
                                        <option value="">Select Specialization</option>
                                        <option value="General Physician">General Physician</option>
                                        <option value="Pediatrician">Pediatrician (Child Specialist)</option>

                                        <option value="Cardiologist">Cardiologist (Heart Specialist)</option>
                                        <option value="Neurologist">Neurologist (Brain & Nerves)</option>
                                        <option value="Orthopedic">Orthopedic (Bone Specialist)</option>
                                        <option value="Dermatologist">Dermatologist (Skin Specialist)</option>
                                        <option value="ENT Specialist">ENT Specialist (Ear, Nose, Throat)</option>
                                        <option value="Ophthalmologist">Ophthalmologist (Eye Specialist)</option>
                                        <option value="Psychiatrist">Psychiatrist (Mental Health)</option>
                                        <option value="Oncologist">Oncologist (Cancer Specialist)</option>
                                        <option value="General Surgeon">General Surgeon</option>
                                        <option value="Dentist">Dentist</option>
                                    </select>
                                </div>




                                <div className="form-group">
                                    <label>Alternate Number</label>
                                    <input type="text" placeholder="Alternate number" maxLength={10} minLength={10} required name="alternateNo" value={formValue.alternateNo} onChange={handelChange} />
                                </div>
                                <div className="form-group">
                                    <label>Degree</label>
                                    <select
                                        required
                                        name="degree"
                                        value={formValue.degree}
                                        onChange={handelChange}
                                    >
                                        <option value="">Select Degree</option>

                                        <optgroup label="Modern Medicine">
                                            <option value="MBBS">MBBS (Bachelor of Medicine, Bachelor of Surgery)</option>
                                            <option value="MD">MD (Doctor of Medicine)</option>
                                            <option value="MS">MS (Master of Surgery)</option>
                                            <option value="DNB">DNB (Diplomate of National Board)</option>
                                        </optgroup>

                                        <optgroup label="Dental">
                                            <option value="BDS">BDS (Bachelor of Dental Surgery)</option>
                                            <option value="MDS">MDS (Master of Dental Surgery)</option>
                                        </optgroup>

                                        <optgroup label="Ayurveda">
                                            <option value="BAMS">BAMS (Bachelor of Ayurvedic Medicine & Surgery)</option>
                                        </optgroup>

                                        <optgroup label="Homeopathy">
                                            <option value="BHMS">BHMS (Bachelor of Homeopathic Medicine & Surgery)</option>
                                        </optgroup>


                                        <optgroup label="Naturopathy & Yoga">
                                            <option value="BNYS">BNYS (Bachelor of Naturopathy & Yogic Sciences)</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Experience</label>
                                    <input type="number" placeholder="Years of experience" required name="experience" value={formValue.experience} onChange={handelChange} />
                                </div>


                                <div className="form-group">
                                    <label>Gender</label>
                                    <div className="gender-options" >
                                        <label>
                                            <input type="radio" name="gender" onChange={handelChange} value="Male" /> Male
                                        </label>
                                        <label>
                                            <input type="radio" name="gender" onChange={handelChange} value="Female" /> Female
                                        </label>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" placeholder="Address" required name="address" value={formValue.address} onChange={handelChange} />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" placeholder="city" required name="city" value={formValue.city} onChange={handelChange} />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input type="text" placeholder="state" required name="state" value={formValue.state} onChange={handelChange} />
                                </div>
                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input type="text" placeholder="pincode" required name="pincode" value={formValue.pincode} onChange={handelChange} />
                                </div>
                                <div className="patientinput-box">
                                    <span className="patientdetails">Licence</span>
                                    <label htmlFor="insuranceInput" className="insurance-label">


                                    </label>


                                    <div className="insurance-preview">
                                        <img
                                            src={licenceImageurl}
                                            alt="Licence"
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                    </div>



                                    <input
                                        type="file"
                                        id="insuranceInput"
                                        name="licenceimage"
                                        accept="image/*"
                                        onChange={handelfile}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn">Create Profile</button>
                            <p className="login-text">
                                Already a member? <Link to={"/login"}>Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>














        </React.Fragment >
    );
};


export default Medical;





