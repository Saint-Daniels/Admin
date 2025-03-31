'use client';

import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const MainNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <Navbar 
      expand="lg" 
      className="navbar py-2"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container className="px-3">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <Image
              src="/images/saintdanielslogo.jpeg"
              alt="Saint Daniels Logo"
              width={45}
              height={45}
              className="me-2"
            />
            <span className="brand-text">Saint Daniels</span>
          </Link>
          {isHomePage && (
            <Link href="/login" className="nav-button ms-auto">
              Login
            </Link>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default MainNavbar; 