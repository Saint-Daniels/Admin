'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isMinimalFooter = pathname === '/login' || 
                         pathname === '/signup' || 
                         pathname === '/register' ||
                         pathname === '/newsletter' || 
                         pathname === '/partners' || 
                         pathname === '/help' ||
                         pathname === '/documents' ||
                         pathname === '/privacy' ||
                         pathname === '/terms' ||
                         pathname === '/about' ||
                         pathname === '/contact';

  if (isMinimalFooter) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-title">SAINT DANIELS</h3>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">FB</a>
              <a href="#" className="social-icon" aria-label="LinkedIn">IN</a>
              <a href="#" className="social-icon" aria-label="Snapchat">SC</a>
              <a href="#" className="social-icon" aria-label="Twitter">TT</a>
              <a href="#" className="social-icon" aria-label="Instagram">IG</a>
            </div>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">MEMBERS</h4>
            <ul className="footer-links">
              <li><Link href="/newsletter">Newsletter</Link></li>
              <li><Link href="/partners">Partners</Link></li>
              <li><Link href="/help">Help Center</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">RESOURCES</h4>
            <ul className="footer-links">
              <li><Link href="/documents">Documents</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">COMPANY</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 Saint Daniels Healthcare Rewards. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 