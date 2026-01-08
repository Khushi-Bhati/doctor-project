import React, { useState } from 'react'
import "./../../styles/panel.css"
import { useDispatch, useSelector } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'
import user from "./../../images/user.webp"
import { setProfileData } from '../../reducers/Reducers.js'

const Sidebar = () => {
    const Dispatch = useDispatch()
    const Navigate = useNavigate()

    //   console.log(profileData)
 const [sidebarOpen, setSidebarOpen] = useState(false); // toggle state
    const profileData = useSelector((state) => state.doctorprofile)
    const [activeDropdown, setActiveDropdown] = useState("");

    const [isOpen, setIsOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [active, setactive] = useState("")
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const toggledropdown = () => {
        setIsOpen(!isOpen)
    }

    const handelLogout = () => {
        localStorage.removeItem("loginid");
        localStorage.removeItem("usertype");
        localStorage.removeItem("token")
        Dispatch(setProfileData(null))


        Navigate("/login")

    }

   
    return (
        <>
            <button className="menu-btn" onClick={toggleSidebar} style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>
                <i className="fa fa-bars" style={{ fontSize: '24px' }}></i>
            </button>
          


            <div className="main-sidebar" > <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <svg className="sidebar-logo-icon" xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <h1 className="sidebar-logo">Doctor Md</h1>
                </div>
                  {/* <button className="close-btn" onClick={() => setSidebarOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
            </button> */}
                <div className="sidebar-profile">
                    <img src={profileData?.profileImage ? profileData?.profileImage : user} alt='profileImage'></img>

                    <h3>Dr. {profileData?.doctorname}</h3>
                    {profileData?.userID?.email ? (<p style={{ color: '#fff' }}>{profileData.userID.email}</p>) : (<p style={{ color: '#fff' }}>admin98@gmail.com</p>)}

                </div>
                <div className="sidebar-menu">
                    <li className="menu-title" style={{ color: '#fff' }}>Main</li>
                    <li className={active === "dashboard" ? "sidebar-menu-item active" : "sidebar-menu-item"} onClick={() => setactive(active === "Dashboard" ? "" : "dashboard")}>
                        <Link to={"/dashboard"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x={3} y={3} width={7} height={7} />
                                <rect x={14} y={3} width={7} height={7} />
                                <rect x={14} y={14} width={7} height={7} />
                                <rect x={3} y={14} width={7} height={7} />
                            </svg>
                            <span>Doctor Dashboard</span>
                        </Link>
                    </li>
                    <li
                        className={`sidebar-menu-item ${activeDropdown === "doctor" ? "active" : ""}`}
                        onClick={() =>
                            setActiveDropdown(activeDropdown === "doctor" ? "" : "patient")
                        }
                    >
                        <a href="#">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                               
                            >

                                <circle cx="12" cy="7" r="3" />


                                <path d="M5 21c0-4 3.5-7 7-7s7 3 7 7" />
                            </svg>


                            <span >Doctors</span>

                            {/* Dropdown arrow */}
                            {activeDropdown === "patient" ? (
                                <i style={{marginLeft:"80px"}} className="fa-solid fa-caret-up" onClick={toggledropdown} />
                            ) : (
                                <i style={{marginLeft:"80px"}} className="fa-solid fa-caret-down" onClick={toggledropdown} />
                            )}
                        </a>

                        <ul
                            className="ml-menu"
                            style={{
                                display: activeDropdown === "patient" ? "block" : "none",
                                transition: "0.3s",
                            }}
                        >
                            <li className={active === "profile" ? "active" : ""}  >
                                <Link to={`/profile/${localStorage.getItem("loginid")}`}>
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </li>



                    <li
                        className={`sidebar-menu-item ${activeDropdown === "clinics" ? "active" : ""}`}
                        onClick={() =>
                            setActiveDropdown(activeDropdown === "clinics" ? "" : "clinics")
                        }
                    >

                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24" height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.6}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                role="img"
                                aria-label="Clinic">
                                <title>Clinic</title>


                                <rect x={3} y={6} width={18} height={14} rx={1} />


                                <path d="M3 10h18" />


                                <rect x={10} y={13} width={4} height={7} rx={0.6} />


                                <rect x={5.5} y={11} width={3} height={3} rx={0.4} />
                                <rect x={15.5} y={11} width={3} height={3} rx={0.4} />

                                <path d="M12 8.5v2.5" />
                                <path d="M10.5 10.25h3" />
                            </svg>

                            <span>Clinics</span>


                            {activeDropdown === "clinics" ? (
                                <i className="fa-solid fa-caret-up" onClick={toggledropdown} />
                            ) : (
                                <i className="fa-solid fa-caret-down" onClick={toggledropdown} />
                            )}
                        </a>

                        <ul
                            className="ml-menu"
                            style={{
                                display: activeDropdown === "clinics" ? "block" : "none",
                                transition: "0.3s"
                            }}
                        >
                            <li className={active === "clinicslist" ? "active" : ""}>
                                <Link to={"/clinicslist"}>Clinics list</Link>
                            </li>
                        </ul>
                    </li>



                    <li className={activeDropdown === "appointments" ? "sidebar-menu-item active" : "sidebar-menu-item"}
                     onClick={() => setActiveDropdown(activeDropdown === "appointments" ? "" : "appointments")}>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                                <line x1={16} y1={2} x2={16} y2={6} />
                                <line x1={8} y1={2} x2={8} y2={6} />
                                <line x1={3} y1={10} x2={21} y2={10} />
                            </svg>
                            <span>Appointments</span>
                             {activeDropdown === "appointments" ? (
                                <i style={{marginLeft:"32px"}} className="fa-solid fa-caret-up" onClick={toggledropdown} />
                            ) : (
                                <i style={{marginLeft:"32px"}} className="fa-solid fa-caret-down" onClick={toggledropdown} />
                            )}
                        </a>

                         <ul
                            className="ml-menu"
                            style={{
                                display: activeDropdown === "appointments" ? "block" : "none",
                                transition: "0.3s",
                            }}
                        >
                            <li className={active === "appointmentlist" ? "active" : ""}  >
                                <Link to={"/appoinmentlist"}>
                                    Appointmentlist
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={active === "settings" ? "sidebar-menu-item active" : "sidebar-menu-item"} onClick={() => setactive(active === "settings" ? "" : "settings")}>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <circle cx={12} cy={12} r={3} />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                                </path>
                            </svg>
                            <span>Settings</span>
                        </a>
                    </li>
                </div>
                <div className="sidebar-menu logout-link">
                    <li className="sidebar-menu-item">
                        <a href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1={21} y1={12} x2={9} y2={12} />
                            </svg>
                            <span><Link onClick={handelLogout}>Logout</Link></span>
                        </a>
                    </li>
                </div>
            </div>
            </div>
        </>
    )
}

export default Sidebar