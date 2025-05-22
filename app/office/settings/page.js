'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav, Tab } from 'react-bootstrap';
import { 
  FaUser, FaBell, FaLock, FaPalette, 
  FaDesktop, FaMobile, FaTablet 
} from 'react-icons/fa';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../../firebase/config';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: ''
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    desktop: true,
    mobile: true,
    tablet: true
  });
  const [theme, setTheme] = useState('light');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserSettings(user.uid);
      } else {
        // Redirect to login if not authenticated
        router.push('/login');
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [router]);

  const fetchUserSettings = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setProfile(data.profile || {});
        setNotifications(data.notifications || {});
        setTheme(data.theme || 'light');
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleSave = async () => {
    if (!auth.currentUser) {
      router.push('/login');
      return;
    }

    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        profile,
        notifications,
        theme
      });
      // Show success message
    } catch (error) {
      console.error('Error saving settings:', error);
      // Show error message
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <p>Loading...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Settings</h2>
          <p className="text-muted">Manage your account preferences</p>
        </Col>
      </Row>

      <Row>
        <Col md={3}>
          <Card>
            <Card.Body className="p-0">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'profile'}
                    onClick={() => setActiveTab('profile')}
                  >
                    <FaUser className="me-2" />
                    Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'notifications'}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <FaBell className="me-2" />
                    Notifications
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'security'}
                    onClick={() => setActiveTab('security')}
                  >
                    <FaLock className="me-2" />
                    Security
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'appearance'}
                    onClick={() => setActiveTab('appearance')}
                  >
                    <FaPalette className="me-2" />
                    Appearance
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Card>
            <Card.Body>
              {activeTab === 'profile' && (
                <div>
                  <h5 className="mb-4">Profile Settings</h5>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Role</Form.Label>
                          <Form.Control
                            type="text"
                            name="role"
                            value={profile.role}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Department</Form.Label>
                          <Form.Control
                            type="text"
                            name="department"
                            value={profile.department}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h5 className="mb-4">Notification Preferences</h5>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="email-notifications"
                        label="Email Notifications"
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="sms-notifications"
                        label="SMS Notifications"
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="desktop-notifications"
                        label="Desktop Notifications"
                        checked={notifications.desktop}
                        onChange={() => handleNotificationChange('desktop')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="mobile-notifications"
                        label="Mobile Notifications"
                        checked={notifications.mobile}
                        onChange={() => handleNotificationChange('mobile')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="tablet-notifications"
                        label="Tablet Notifications"
                        checked={notifications.tablet}
                        onChange={() => handleNotificationChange('tablet')}
                      />
                    </Form.Group>
                  </Form>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h5 className="mb-4">Security Settings</h5>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                    <Button variant="primary">Change Password</Button>
                  </Form>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div>
                  <h5 className="mb-4">Appearance Settings</h5>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Theme</Form.Label>
                      <div className="d-flex gap-3">
                        <Button
                          variant={theme === 'light' ? 'primary' : 'outline-primary'}
                          onClick={() => handleThemeChange('light')}
                        >
                          Light
                        </Button>
                        <Button
                          variant={theme === 'dark' ? 'primary' : 'outline-primary'}
                          onClick={() => handleThemeChange('dark')}
                        >
                          Dark
                        </Button>
                        <Button
                          variant={theme === 'system' ? 'primary' : 'outline-primary'}
                          onClick={() => handleThemeChange('system')}
                        >
                          System
                        </Button>
                      </div>
                    </Form.Group>
                  </Form>
                </div>
              )}

              <div className="mt-4">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 