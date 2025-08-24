import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

function Hero() {
  const naviGate = useNavigate();
  const handleGetStart = () => {
    naviGate("/signup");
  };

  return (
    <div className="hero-container">
      <div className="hero-logo">HireHub</div>
      <h1 className="hero-title">Your next job starts here</h1>

      <div className="search-bar">
        <input type="text" placeholder="Job title, keywords, or company" />
        <input type="text" placeholder="City, state, zip code, or 'remote'" />
        <button className="search-button">Search</button>
      </div>

      <div className="cta-buttons">
        <Button
          color="primary"
          variant="contained"
          onClick={handleGetStart} // <-- use your function here
        >
          Get Started
        </Button>{" "}
        <br /> <br />
        <Link href="#" className="resume-link">
          Post your resume{" "}
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i> It only
          takes a few seconds
        </Link>
      </div>
    </div>
  );
}

export default Hero;
