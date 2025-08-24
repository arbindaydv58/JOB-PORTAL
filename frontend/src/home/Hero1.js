import React, { useState } from "react";

function Hero1() {
  const [isOpen, setIsOpen] = useState(false);

  const trendingItems = [
    "software developer remote",
    "frontend developer new york, ny",
    "full stack engineer san francisco, ca",
    "data analyst remote",
    "cybersecurity specialist washington, dc",
    "devops engineer remote",
    "cloud architect austin, tx",
    "mobile app developer chicago, il",
    "machine learning engineer boston, ma",
    "ui ux designer remote",
    "it support specialist dallas, tx",
    "blockchain developer miami, fl",
    "database administrator remote",
    "network security engineer los angeles, ca",
    "game developer seattle, wa",
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div style={styles.container}>
      <p style={styles.text}>
        HireHub helps people get jobs:{" "}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          Over 16 million stories shared
        </a>
      </p>

      <p style={styles.text}>
        HireHub también está disponible en{" "}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          español
        </a>
      </p>

      <div style={styles.dropdownContainer}>
        <p style={styles.text} onClick={toggleDropdown}>
          What's trending on HireHub{" "}
          <span style={styles.dropdownArrow}>{isOpen ? "▲" : "▼"}</span>
        </p>

        {isOpen && (
          <ul style={styles.dropdownList}>
            {trendingItems.map((item, index) => (
              <li key={index} style={styles.dropdownItem}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
  },
  text: {
    fontSize: "16px",
    marginBottom: "20px",
    cursor: "pointer",
  },
  link: {
    color: "#0033cc",
    textDecoration: "none",
  },
  dropdownContainer: {
    position: "relative",
    display: "inline-block",
  },
  dropdownArrow: {
    fontSize: "18px",
    marginLeft: "8px",
  },
  dropdownList: {
    listStyle: "none",
    padding: "10px",
    margin: "0",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "left",
    width: "300px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  dropdownItem: {
    padding: "8px 12px",
    fontSize: "14px",
    borderBottom: "1px solid #eee",
  },
};

export default Hero1;
