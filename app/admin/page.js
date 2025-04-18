'use client';

import { useState, useEffect, useRef } from 'react';
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
import Chat from '@/components/Chat';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
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
  const [recentActivities] = useState([
    {
      type: 'user_action',
      user: 'John Doe',
      action: 'Updated profile',
      timestamp: '5 minutes ago'
    },
    {
      type: 'system_alert',
      message: 'High CPU usage detected',
      severity: 'warning',
      timestamp: '15 minutes ago'
    },
    {
      type: 'security_alert',
      message: 'Failed login attempts',
      severity: 'critical',
      timestamp: '30 minutes ago'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderSystemStatus = () => (
    <Card className="dashboard-card mb-4">
      <Card.Header>
        <h5 className="mb-0">
          <FaServer className="me-2" /> System Status
        </h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={3}>
            <div className="status-item">
              <FaServer className="me-2 text-primary" />
              <span>Server: </span>
              <Badge bg={systemStatus.server === 'healthy' ? 'success' : 'danger'}>
                {systemStatus.server}
              </Badge>
            </div>
          </Col>
          <Col md={3}>
            <div className="status-item">
              <FaDatabase className="me-2 text-primary" />
              <span>Database: </span>
              <Badge bg={systemStatus.database === 'healthy' ? 'success' : 'danger'}>
                {systemStatus.database}
              </Badge>
            </div>
          </Col>
          <Col md={3}>
            <div className="status-item">
              <FaGlobe className="me-2 text-primary" />
              <span>API: </span>
              <Badge bg={systemStatus.api === 'healthy' ? 'success' : 'danger'}>
                {systemStatus.api}
              </Badge>
            </div>
          </Col>
          <Col md={3}>
            <div className="status-item">
              <FaCloud className="me-2 text-primary" />
              <span>Cache: </span>
              <Badge bg={systemStatus.cache === 'healthy' ? 'success' : 'danger'}>
                {systemStatus.cache}
              </Badge>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  const renderUserStats = () => (
    <Card className="dashboard-card mb-4">
      <Card.Header>
        <h5 className="mb-0">
          <FaUsers className="me-2" /> User Statistics
        </h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={3}>
            <div className="stat-box">
              <h3>{userStats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-box">
              <h3>{userStats.activeUsers}</h3>
              <p>Active Users</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-box">
              <h3>{userStats.newUsersToday}</h3>
              <p>New Today</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="stat-box">
              <h3>{userStats.premiumUsers}</h3>
              <p>Premium Users</p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  const renderSystemMetrics = () => (
    <Card className="dashboard-card mb-4">
      <Card.Header>
        <h5 className="mb-0">
          <FaChartLine className="me-2" /> System Metrics
        </h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={3}>
            <div className="metric-box">
              <div className="metric-title">
                <FaDesktop className="me-2" /> CPU Usage
              </div>
              <div className="progress">
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${systemMetrics.cpuUsage}%` }}
                  aria-valuenow={systemMetrics.cpuUsage} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >
                  {systemMetrics.cpuUsage}%
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="metric-box">
              <div className="metric-title">
                <FaMemory className="me-2" /> Memory Usage
              </div>
              <div className="progress">
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${systemMetrics.memoryUsage}%` }}
                  aria-valuenow={systemMetrics.memoryUsage} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >
                  {systemMetrics.memoryUsage}%
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="metric-box">
              <div className="metric-title">
                <FaDatabase className="me-2" /> Disk Usage
              </div>
              <div className="progress">
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${systemMetrics.diskUsage}%` }}
                  aria-valuenow={systemMetrics.diskUsage} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >
                  {systemMetrics.diskUsage}%
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="metric-box">
              <div className="metric-title">
                <FaNetworkWired className="me-2" /> Network Load
              </div>
              <div className="progress">
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${systemMetrics.networkLoad}%` }}
                  aria-valuenow={systemMetrics.networkLoad} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >
                  {systemMetrics.networkLoad}%
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  const renderRecentActivity = () => (
    <Card className="dashboard-card mb-4">
      <Card.Header>
        <h5 className="mb-0">
          <FaHistory className="me-2" /> Recent Activity
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="activity-list">
          {recentActivities.map((activity, index) => (
            <div key={index} className={`activity-item ${activity.type}`}>
              {activity.type === 'user_action' && (
                <>
                  <FaUser className="activity-icon" />
                  <div className="activity-content">
                    <strong>{activity.user}</strong> {activity.action}
                    <div className="activity-time">{activity.timestamp}</div>
                  </div>
                </>
              )}
              {activity.type === 'system_alert' && (
                <>
                  <FaExclamationTriangle className="activity-icon text-warning" />
                  <div className="activity-content">
                    <strong>System Alert:</strong> {activity.message}
                    <div className="activity-time">{activity.timestamp}</div>
                  </div>
                </>
              )}
              {activity.type === 'security_alert' && (
                <>
                  <FaShieldAlt className="activity-icon text-danger" />
                  <div className="activity-content">
                    <strong>Security Alert:</strong> {activity.message}
                    <div className="activity-time">{activity.timestamp}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );

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
          {renderSystemStatus()}
          {renderUserStats()}
          {renderSystemMetrics()}
          {renderRecentActivity()}
        </div>
      )}
    </Container>
  );
} 