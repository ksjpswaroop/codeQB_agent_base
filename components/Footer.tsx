import React from 'react';
import Link from 'next/link';
import styles from '../styles/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>About</h4>
          <p>
            Next.js App is a modern web application platform designed to provide code assistance tools and manage multi-tenant corporate environments.
          </p>
        </div>
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/dashboard"><a>Dashboard</a></Link></li>
            <li><Link href="/tools/srs-generator"><a>SRS Generator</a></Link></li>
            <li><Link href="/tools/app-generator"><a>App Generator</a></Link></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h4>Contact Us</h4>
          <p>Email: support@nextjsapp.com</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Next.js App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;