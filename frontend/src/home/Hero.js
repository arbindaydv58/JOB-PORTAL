import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { searchJobs } from "../services/jobService";

function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleGetStart = () => {
    navigate("/signup");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await searchJobs(query, location);
      const jobs = res.data.data;

      if (jobs.length === 0) {
        setError("No jobs found for this search.");
      } else {
        navigate("/jobs", { state: { jobs } });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch jobs");
    }
  };

  return (
    <div className="hero-container">
      <div className="hero-logo">HireHub</div>
      <h1 className="hero-title">Your next job starts here</h1>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="City, state, zip code, or 'remote'"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <div className="cta-buttons">
        <Button color="primary" variant="contained" onClick={handleGetStart}>
          Get Started
        </Button>
        <br />
        <br />
        {/* Fixed accessibility warning using React Router Link */}
        <Link to="/post-resume" className="resume-link">
          Post your resume{" "}
          <i className="fa fa-long-arrow-right" aria-hidden="true"></i> It only
          takes a few seconds
        </Link>
      </div>
    </div>
  );
}

export default Hero;
