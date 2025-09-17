import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.linkGroups}>
        <ul style={styles.linkList}>
          {[
            "Hiring Lab",
            "Career advice",
            "Browse jobs",
            "Browse companies",
            "Salaries",
            "HireHub Events",
          ].map((text, idx) => (
            <li key={idx}>
              <Link href="#" style={styles.link}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
        <ul style={styles.linkList}>
          {[
            "Work at HireHub",
            "Countries",
            "About",
            "Help",
            "ESG at HireHub",
            "Post a job",
          ].map((text, idx) => (
            <li key={idx}>
              <Link href="#" style={styles.link}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.legalSection}>
        <p>&copy; 2025 HireHub</p>
        <ul style={styles.legalLinks}>
          {[
            "Your Privacy Choices",
            "Accessibility at HireHub",
            "Privacy Center and Ad Choices",
            "Terms",
          ].map((text, idx) => (
            <li key={idx}>
              <Link href="#" style={styles.link}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#f8f9fa",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    borderTop: "1px solid #ddd",
  },
  linkGroups: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: "0 20px",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    transition: "color 0.2s ease, text-decoration 0.2s ease",
  },
  linkHover: {
    textDecoration: "underline",
    color: "#0073e6",
  },
  legalSection: {
    textAlign: "center",
    fontSize: "14px",
  },
  legalLinks: {
    listStyle: "none",
    padding: 0,
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
  },
};

export default Footer;
