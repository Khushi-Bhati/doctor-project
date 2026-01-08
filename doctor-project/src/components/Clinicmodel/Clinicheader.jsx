import React from 'react'
import "./../../styles/panel.css"
import { useSelector } from 'react-redux'
import user from "./../../images/user.webp"

const Clinicheader = () => {
      const clinicprofileData = useSelector((state) => state.clinicprofile)
  console.log(clinicprofileData)
    return (
        <> <header className="main-header">
            <div className="header-left">
                <div className="search-bar">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx={11} cy={11} r={8} />
                        <line x1={21} y1={21} x2="16.65" y2="16.65" />
                    </svg>
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="header-profile">
           <img src ={clinicprofileData?.clinicImages?clinicprofileData?.clinicImages[0]: user } alt='profileImage'></img>
                <div className="header-profile-info">
                    <p>{clinicprofileData?.email}</p>
                    <span>Hospital</span>
                </div>
            </div>
        </header>
        </>
    )
}

export default Clinicheader