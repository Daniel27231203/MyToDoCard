import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.links}>
          <a href="#" className={styles.link}>
            Privacy
          </a>
          <a href="#" className={styles.link}>
            Terms
          </a>
          <a href="#" className={styles.link}>
            Support
          </a>
        </div>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} YourCompany. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
