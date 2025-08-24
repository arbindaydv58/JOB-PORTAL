import React from 'react';


function About() {
  const sectionStyle = {
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
  };

  const headingStyle = {
    color: "#2c3e50",
    marginBottom: "0.5rem",
  };

  return (
    <section style={sectionStyle}>
      <h1 style={headingStyle}>About HireHub</h1>
      <p>
        At <strong>HireHub</strong>, we connect ambition with opportunity.
        Founded with the belief that every talent deserves the right stage,
        HireHub is a modern job portal designed to bridge the gap between job
        seekers and employers. Whether you’re a fresh graduate searching for
        your first role or an experienced professional seeking your next big
        move, we’re here to make the journey simpler, faster, and smarter.
      </p>

      <h2 style={headingStyle}>Our Mission</h2>
      <p>
        To empower individuals and businesses by creating a trusted platform
        where skills meet opportunities.
      </p>

      <h2 style={headingStyle}>Our Vision</h2>
      <p>
        To become the most reliable job marketplace where no talent goes
        unnoticed and every company finds the perfect fit.
      </p>

      <h2 style={headingStyle}>Our Story</h2>
      <p>
        The idea behind HireHub was born out of a simple question: “Why is
        finding the right job still so complicated?” We saw job seekers
        struggling with outdated processes and employers overwhelmed with
        irrelevant applications. So, we created a platform that focuses on
        intelligent matching, transparent communication, and user-friendly
        tools.
      </p>
    </section>
  );
}

export default About;
