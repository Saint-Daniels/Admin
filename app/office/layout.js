'use client';

import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaUsers, FaBullhorn, FaHeadset, FaCog, FaGift, FaUserShield, FaShieldAlt 
} from 'react-icons/fa';
import { DialerStatusProvider } from '../components/DialerStatusContext';

export default function OfficeLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const navItems = [
    { path: '/office/agents', icon: FaUsers, label: 'Agents' },
    { path: '/office/marketing', icon: FaBullhorn, label: 'Marketing' },
    { path: '/office/support', icon: FaHeadset, label: 'Support' },
    { path: '/office/applications', icon: FaUserShield, label: 'Applications' },
    { path: '/office/rewards', icon: FaGift, label: 'Rewards' },
    { path: '/office/audit', icon: FaShieldAlt, label: 'Audit' },
    { path: '/office/settings', icon: FaCog, label: 'Settings' }
  ];

  return (
    <DialerStatusProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
          <Container fluid>
            <Link href="/office" passHref legacyBehavior>
              <Navbar.Brand>Admin Portal</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {navItems.map((item) => (
                  <Nav.Link
                    key={item.path}
                    href={item.path}
                    active={pathname === item.path}
                    className="d-flex align-items-center gap-2"
                  >
                    <item.icon />
                    {item.label}
                  </Nav.Link>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <Container fluid className="flex-grow-1">
          {children}
        </Container>
      </div>
    </DialerStatusProvider>
  );
} 