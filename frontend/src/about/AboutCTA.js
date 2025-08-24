import React from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

function AboutCTA() {
  const naviGate = useNavigate();
  const handleGetStart = () => {
    naviGate("/signup");
  };
  const sectionStyle = {
    padding: "2rem",
    backgroundColor: "#f1f8ff",
    borderRadius: "10px",
    textAlign: "center",
    lineHeight: "1.6",
  };

  const headingStyle = {
    color: "#2c3e50",
    marginBottom: "0.5rem",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
  };

  const contactStyle = {
    marginTop: "1.5rem",
    fontSize: "0.95rem",
    color: "#555",
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>Success Stories</h2>
      <blockquote>
        “Thanks to HireHub, I landed my dream job in just two weeks!” – Ramesh
        K., Software Developer
      </blockquote>
      <blockquote>
        “We hired three amazing candidates through HireHub in record time.” –
        Anita S., HR Manager
      </blockquote>

      <h2 style={headingStyle}>Join Us Today</h2>
      <p>
        Whether you’re hiring or looking to be hired, HireHub is the place where
        opportunities find you.
      </p>

      {/* <button style={buttonStyle} onClick={handleGetStart}>Sign Up Now</button> */}
      <Button
          color="primary"
          variant="contained"
          onClick={() => {
            window.location.href = "/signup";
          }}
        >
         Sing Up Now 
        </Button>

      <div style={contactStyle}>
        <p>
          <strong>Contact Us:</strong> support@hirehub.com
        </p>
        <p>
          <strong>Follow Us:</strong> Facebook | LinkedIn | Twitter
        </p>
      </div>
    </section>
  );
}

export default AboutCTA;
