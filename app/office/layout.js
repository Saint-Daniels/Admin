'use client';

import { useState } from 'react';
import { Container, Nav, Navbar, Button, Modal } from 'react-bootstrap';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaUsers, FaBullhorn, FaHeadset, FaCog, FaGift, FaUserShield, FaShieldAlt, FaSignOutAlt 
} from 'react-icons/fa';
import { DialerStatusProvider } from '../components/DialerStatusContext';
import { supabase } from '../supabase/config';
import Cookies from 'js-cookie';

export default function OfficeLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const navItems = [
    { path: '/office/agency', icon: FaUsers, label: 'Agency' },
    { path: '/office/marketing', icon: FaBullhorn, label: 'Marketing' },
    { path: '/office/support', icon: FaHeadset, label: 'Support' },
    { path: '/office/applications', icon: FaUserShield, label: 'Applications' },
    { path: '/office/rewards', icon: FaGift, label: 'Rewards' },
    { path: '/office/audit', icon: FaShieldAlt, label: 'Audit' },
    { path: '/office/settings', icon: FaCog, label: 'Settings' }
  ];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear any local storage items
      localStorage.removeItem('user');
      localStorage.removeItem('googleMeetsInRoom');
      
      // Clear any session storage items
      sessionStorage.clear();
      
      // Remove all cookies (including supabase-token)
      Cookies.remove('supabase-token');
      // Remove all other cookies if needed
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });
      
      // Force a hard reload to clear all state and go to login
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
      // If there's an error, still try to redirect to login
      window.location.href = '/login';
    }
  };

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
              <Button 
                variant="outline-light" 
                onClick={handleLogoutClick}
                className="d-flex align-items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <Container fluid className="flex-grow-1">
          {children}
        </Container>

        {/* Logout Confirmation Modal */}
        <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to log out? You will need to log in again to access the admin portal.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLogoutConfirm}>
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </DialerStatusProvider>
  );
} 