import React from 'react';

function AboutFeature() {
  const sectionStyle = {
    padding: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  };

  const listStyle = {
    paddingLeft: "1.5rem",
    marginBottom: "1rem",
  };

  const headingStyle = {
    color: "#34495e",
    marginBottom: "0.5rem",
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>What We Offer</h2>
      <ul style={listStyle}>
        <li>Smart Job Search — Advanced filters to help you find the right job in minutes.</li>
        <li>Instant Job Alerts — Get notified about opportunities that match your profile.</li>
        <li>Employer Dashboard — Manage job postings, track applicants, and find top talent with ease.</li>
        <li>Profile & Resume Tools — Showcase your skills with a standout online profile.</li>
        <li>Secure & Verified Listings — Every job post is screened to ensure quality.</li>
      </ul>

      <h2 style={headingStyle}>Our Impact</h2>
      <ul style={listStyle}>
        <li><strong>5,000+</strong> job seekers connected with employers.</li>
        <li><strong>200+</strong> companies found their ideal candidates.</li>
        <li>Created a network where hiring feels less like a task and more like an opportunity.</li>
      </ul>
    </section>
  );
}

export default AboutFeature;
