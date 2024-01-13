import React from "react";
import { useState, useEffect } from "react";

import "./sass/nav_style.css";
import { Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LogoSrc from "../../../assets/icon/logo-removebg-webp.webp";
import Signup from "../../UI/Signup";
import Signin from "../../UI/Signin";

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState();
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignupShow = () => {
    setShowSignup(true);
  };

  const handleSignupClose = () => {
    setShowSignup(false);
  };

  const handleSigninShow = () => {
    setShowSignin(true);
  };

  const handleSigninClose = () => {
    setShowSignin(false);
  };

  return (
    <header className={`header h_ph container__width ${isScrolled ? "fixed" : ""}`}>
      <Container>
        <nav className="navbar navbar-expand-lg">
          <div className="logo">
            <img src={LogoSrc} alt="logo" />
          </div>
          {/* mobile search */}
          <div className="search__mobile">
            <form className="d-flex align-center justify-content-center">
              <div className="search-box">
              <button className="btn-search"> <Search
                  className="bi search__icon"
                  style={{ color: "white" }}
                /></button>
              <input type="text" className="input-search" placeholder="Search..." />
            </div>
            </form>
          </div>
          <div
            className={`toggler__icon align-center justify-contaent-center ${
              isDropdownOpen ? "active" : ""
            }`}
            onClick={handleDropdownToggle}
          >
            <FontAwesomeIcon className="font__icon__bar" icon={faBars} />
          </div>

          {/* Search component */}
          <div className="search">
            <form className="d-flex align-center justify-content-center">
              <input
                className="form-control me-3"
                type="text"
                placeholder="Search anything..."
              />
              <button
                className="btn btn-outline-dark search-button"
                type="submit"
              >
                <Search
                  className="bi search__icon"
                  // style={{ color: "white" }}
                />
              </button>
            </form>
          </div>

          <div
            className={`collapse navbar-collapse ${
              isDropdownOpen ? "show_drop" : "close"
            }`}
          >
            <ul className="navlist sub__nav__dropdown">
              <li>
                <Link to="/mhub-khmer">Home</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li
                onClick={handleSignupShow}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                >
                <Link to="#" className={`bg__signup ${isHover ? "signup_hover" : ""}`}>
                  Sign up
                </Link>
              </li>
              <li onClick={handleSigninShow}>
                <Link to="#" className={`bg__signin ${isHover ? "signin_hover" : ""}`}>
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="popup__detail">
          <Modal
            show={showSignup}
            onHide={handleSignupClose}
            centered
            className="bg__blur"
          >
            <Signup />
          </Modal>
          <Modal
            show={showSignin}
            onHide={handleSigninClose}
            centered
            className="bg__blur"
          >
            <Signin />
          </Modal>
        </div>
      </Container>
    </header>
  );
};

export default Navigation;
