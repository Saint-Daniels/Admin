'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Nav, Tab, Badge, Modal, Spinner } from 'react-bootstrap';
import { 
  FaPhone, FaUser, FaEnvelope, FaCalendar, FaChartLine, FaUsers, 
  FaSearch, FaClock, FaBell, FaCog, FaComments, FaHome, FaRobot,
  FaBuilding, FaBriefcase, FaTasks, FaFileAlt, FaUserShield,
  FaSms, FaVideo, FaMapMarkerAlt, FaLink, FaLock, FaUserCog,
  FaCloud, FaChartBar, FaCircle, FaPlus, FaTimes, FaDatabase,
  FaCoffee, FaRestroom, FaUtensils, FaGraduationCap, FaTools,
  FaGoogleDrive, FaFolder, FaStar, FaEllipsisV, FaHashtag,
  FaFileExcel, FaFilePowerpoint, FaFilePdf, FaFileWord, FaFilter,
  FaDownload, FaUpload, FaServer, FaNetworkWired, FaShieldAlt,
  FaUserCircle, FaUserFriends, FaSignOutAlt, FaCamera,
  FaKey, FaVolumeUp, FaUserPlus, FaChartPie, FaHistory,
  FaDesktop, FaMobile, FaTablet, FaBellSlash, FaGlobe,
  FaEdit, FaPalette, FaTrash, FaExchangeAlt, FaCheckCircle,
  FaSave, FaBackspace, FaMicrophone, FaStop, FaCheck,
  FaMicrophoneSlash, FaInfoCircle, FaExclamationTriangle,
  FaPhoneSlash, FaSignInAlt, FaPhoneAlt, FaUserLock,
  FaGoogle, FaSpinner, FaMemory
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ApplicationsTabNew from '../components/ApplicationsTabNew';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState({
    server: 'healthy',
    database: 'healthy',
    api: 'healthy',
    cache: 'healthy'
  });
  const [userStats, setUserStats] = useState({
    totalUsers: 1250,
    activeUsers: 856,
    newUsersToday: 45,
    premiumUsers: 320
  });
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 58,
    networkLoad: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container fluid className="admin-dashboard">
      <div className="dashboard-header">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>
            <FaUserShield className="me-2" /> Admin Dashboard
          </h1>
          <div className="header-actions">
            <Button variant="outline-primary" className="me-2">
              <FaUserPlus className="me-1" /> Add User
            </Button>
            <Button variant="outline-primary" className="me-2">
              <FaCog className="me-1" /> Settings
            </Button>
            <Button variant="outline-danger">
              <FaSignOutAlt className="me-1" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <Nav variant="pills" className="workspace-nav mb-4">
        <Nav.Item>
          <Nav.Link active={activeTab === 'home'} onClick={() => setActiveTab('home')}>
            <FaHome className="me-2" /> Overview
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'applications'} onClick={() => setActiveTab('applications')}>
            <FaFileAlt className="me-2" /> Applications
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
            <FaUsers className="me-2" /> Users
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'security'} onClick={() => setActiveTab('security')}>
            <FaLock className="me-2" /> Security
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
            <FaCog className="me-2" /> Settings
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === 'home' && (
        <div className="dashboard-content">
          <Row>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <h6 className="card-title">System Status</h6>
                  <div className="system-status">
                    <div className="status-item">
                      <FaServer className="me-2" />
                      <span>Server: </span>
                      <Badge bg={systemStatus.server === 'healthy' ? 'success' : 'danger'}>
                        {systemStatus.server}
                      </Badge>
                    </div>
                    <div className="status-item">
                      <FaDatabase className="me-2" />
                      <span>Database: </span>
                      <Badge bg={systemStatus.database === 'healthy' ? 'success' : 'danger'}>
                        {systemStatus.database}
                      </Badge>
                    </div>
                    <div className="status-item">
                      <FaNetworkWired className="me-2" />
                      <span>API: </span>
                      <Badge bg={systemStatus.api === 'healthy' ? 'success' : 'danger'}>
                        {systemStatus.api}
                      </Badge>
                    </div>
                    <div className="status-item">
                      <FaMemory className="me-2" />
                      <span>Cache: </span>
                      <Badge bg={systemStatus.cache === 'healthy' ? 'success' : 'danger'}>
                        {systemStatus.cache}
                      </Badge>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <h6 className="card-title">User Statistics</h6>
                  <div className="user-stats">
                    <div className="stat-item">
                      <FaUsers className="me-2" />
                      <span>Total Users: {userStats.totalUsers}</span>
                    </div>
                    <div className="stat-item">
                      <FaUserCircle className="me-2" />
                      <span>Active Users: {userStats.activeUsers}</span>
                    </div>
                    <div className="stat-item">
                      <FaUserPlus className="me-2" />
                      <span>New Today: {userStats.newUsersToday}</span>
                    </div>
                    <div className="stat-item">
                      <FaStar className="me-2" />
                      <span>Premium Users: {userStats.premiumUsers}</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <h6 className="card-title">System Metrics</h6>
                  <div className="system-metrics">
                    <div className="metric-item">
                      <FaDesktop className="me-2" />
                      <span>CPU Usage: {systemMetrics.cpuUsage}%</span>
                    </div>
                    <div className="metric-item">
                      <FaMemory className="me-2" />
                      <span>Memory Usage: {systemMetrics.memoryUsage}%</span>
                    </div>
                    <div className="metric-item">
                      <FaDatabase className="me-2" />
                      <span>Disk Usage: {systemMetrics.diskUsage}%</span>
                    </div>
                    <div className="metric-item">
                      <FaNetworkWired className="me-2" />
                      <span>Network Load: {systemMetrics.networkLoad}%</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <h6 className="card-title">Current Time</h6>
                  <div className="current-time">
                    <FaClock className="me-2" />
                    <span>{currentTime.toLocaleTimeString()}</span>
                  </div>
                  <div className="current-date mt-2">
                    <FaCalendar className="me-2" />
                    <span>{currentTime.toLocaleDateString()}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      {activeTab === 'applications' && <ApplicationsTabNew key="applications-tab" />}

      {activeTab === 'users' && (
        <Card className="dashboard-card mb-4">
          <Card.Header>
            <h5 className="mb-0">User Management</h5>
          </Card.Header>
          <Card.Body>
            <p>User management content will go here.</p>
          </Card.Body>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card className="dashboard-card mb-4">
          <Card.Header>
            <h5 className="mb-0">Security Settings</h5>
          </Card.Header>
          <Card.Body>
            <p>Security settings content will go here.</p>
          </Card.Body>
        </Card>
      )}

      {activeTab === 'settings' && (
        <Card className="dashboard-card mb-4">
          <Card.Header>
            <h5 className="mb-0">System Settings</h5>
          </Card.Header>
          <Card.Body>
            <p>System settings content will go here.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
} 