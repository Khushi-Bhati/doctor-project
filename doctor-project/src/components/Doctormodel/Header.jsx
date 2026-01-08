import React from 'react'
import "./../../styles/panel.css"
import { useSelector } from 'react-redux'

const Header = () => {
     const profileData = useSelector((state) => state.doctorprofile)
     console.log(profileData)
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
                {profileData?.profileImage?(<img src={profileData.profileImage} alt="Admin Photo" />):<img src="https://i.pravatar.cc/150?u=admin" alt="Admin Photo" />}
                <div className="header-profile-info">
                  {profileData?.userID?.email?(<p>{profileData.userID.email}</p>): (<p>Doctor@gmail.com</p>)}
                    <span>Doctor</span>
                </div>
            </div>
        </header>
        </>
    )
}

export default Header