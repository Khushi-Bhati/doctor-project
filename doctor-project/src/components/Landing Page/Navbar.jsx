import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../../styles/Navbar.css";
import logoImage from "./../../images/OIP (1).webp";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when window is resized > 992px
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="navbar-wrapper">
      <div className="navbar-landingpage">
        <div className="container">
          
          {/* Logo */}
          <div className="logo">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img src={logoImage} alt="ChemLabs Logo" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/department" onClick={() => setMenuOpen(false)}>Departments</Link>
            {/* <Link to="/doctors" onClick={() => setMenuOpen(false)}>Doctors</Link>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link> */}
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <Link to="/login" className="btn-primary">Login / Register</Link>
           
          </div>

          {/* Mobile Menu Toggle */}
          <div
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
