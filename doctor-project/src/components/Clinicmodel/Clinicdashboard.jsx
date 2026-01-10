import React, { useEffect } from 'react'
import Clinicsidebar from './Clinicsidebar'
import Clinicheader from './Clinicheader'
import { useDispatch, useSelector } from 'react-redux'
import { setClinicprofile } from '../../reducers/Reducers.js'
import axios from 'axios'

const Clinicdashboard = () => {

  const dispatch = useDispatch()
  const clinicprofileData = useSelector((state) => state.clinicprofile)

  const getclinicProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}Hospital/clinic/getclinic/${localStorage.getItem("loginid")}`,
        { withCredentials: true } // ✅ if using cookies
      )

      if (res.data.status === "success") {
        dispatch(setClinicprofile(res.data.existingclinic))
      } else {
        console.log("Something went wrong")
      }

    } catch (error) {
      console.log("getclinic error", error)
    }
  }

  useEffect(() => {
    if (!clinicprofileData) {
      getclinicProfile()
    }
  }, []) // 👈 runs once on mount

  return (
    <div className="main-container">
      <Clinicsidebar />
      <div className="main-content">
        <Clinicheader />

        <div className="dashboard-container">
          <div className="welcome-banner">
            <div className="welcome-text">
              <h1>
                Good Morning, <b>{clinicprofileData?.clinicName}</b>
              </h1>
              <p>Here is your health dashboard overview for today.</p>
            </div>

            <img
              src="https://merakiui.com/images/components/illustration.svg"
              alt="Illustration"
              className="welcome-illustration"
            />
          </div>

          {/* Rest of your dashboard stays SAME */}
        </div>
      </div>
    </div>
  )
}

export default Clinicdashboard

