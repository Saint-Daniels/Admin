'use client';

import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Nav, Tab, Badge, Modal } from 'react-bootstrap';
import { 
  FaPhone, FaUser, FaEnvelope, FaCalendar, FaChartLine, FaUsers, 
  FaBuilding, FaBriefcase, FaTasks, FaComments, FaFileAlt, 
  FaUserPlus, FaSearch, FaFilter, FaDownload, FaUpload, FaVideo,
  FaSms, FaGoogle, FaHistory, FaClock, FaMapMarkerAlt, FaLink, FaHome, FaRobot,
  FaCloud, FaCog, FaChartBar, FaCircle, FaPlus, FaTimes, FaCoffee, FaRestroom, FaUtensils, FaGraduationCap,
  FaGoogleDrive, FaFolder, FaStar, FaEllipsisV, FaHashtag, FaPaperPlane,
  FaFileExcel, FaFilePowerpoint, FaFilePdf, FaFileWord, FaUserFriends,
  FaSignOutAlt, FaBell, FaUserCircle, FaCamera, FaShieldAlt, FaKey, FaVolumeUp,
  FaDesktop, FaMobile, FaTablet, FaBellSlash, FaUserShield, FaUserCog,
  FaEdit, FaPalette, FaTrash, FaExchangeAlt
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Office() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const [showClientProfile, setShowClientProfile] = useState(false);
  const [clientNotes, setClientNotes] = useState('');
  const [agentDisposition, setAgentDisposition] = useState('active');
  const [dispositionNotes, setDispositionNotes] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    desktop: true,
    mobile: true,
    tablet: true
  });
  
  // Add state for active/focused input field
  const [activeInputField, setActiveInputField] = useState('phoneNumber');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time helper function
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Enhanced client data
  const clients = [
    {
      name: "John Doe",
      position: "CEO",
      company: "Acme Corp",
      phone: "(555) 123-4567",
      email: "john@example.com",
      address: "123 Business Ave, New York, NY 10001",
      location: "New York, NY",
      status: "Active",
      lastContact: "2 hours ago",
      occupation: "Executive Management",
      industry: "Technology",
      notes: "Key decision maker, interested in enterprise solutions",
      tags: ["VIP", "Enterprise", "Tech"],
      history: [
        {
          type: "call",
          title: "Initial Sales Call",
          description: "Discussed product features and pricing",
          date: "2 hours ago",
          duration: "45 minutes",
          outcome: "Positive"
        },
        {
          type: "email",
          title: "Follow-up Email",
          description: "Sent product brochure and pricing details",
          date: "1 day ago",
          status: "Opened"
        }
      ]
    },
    {
      name: "Jane Smith",
      position: "CTO",
      company: "Tech Solutions",
      phone: "(555) 987-6543",
      email: "jane@example.com",
      address: "456 Innovation Blvd, San Francisco, CA 94105",
      location: "San Francisco, CA",
      status: "Pending",
      lastContact: "1 day ago",
      occupation: "Technical Leadership",
      industry: "Software",
      notes: "Technical background, needs detailed specifications",
      tags: ["Technical", "Enterprise", "Software"],
      history: [
        {
          type: "meeting",
          title: "Product Demo",
          description: "Demonstrated new features to the team",
          date: "1 day ago",
          duration: "1 hour",
          outcome: "Very Interested"
        }
      ]
    },
    {
      name: "Mike Johnson",
      position: "Sales Director",
      company: "Global Sales",
      phone: "(555) 456-7890",
      email: "mike@example.com",
      address: "789 Market St, Chicago, IL 60601",
      location: "Chicago, IL",
      status: "Active",
      lastContact: "3 hours ago",
      occupation: "Sales Management",
      industry: "Consulting",
      notes: "Looking for sales automation solutions",
      tags: ["Sales", "Mid-Market", "Consulting"],
      history: [
        {
          type: "call",
          title: "Contract Discussion",
          description: "Reviewed contract terms and conditions",
          date: "3 hours ago",
          duration: "30 minutes",
          outcome: "Needs Follow-up"
        }
      ]
    }
  ];

  // Add office suite apps data
  const officeApps = [
    {
      name: "Email",
      icon: <FaEnvelope size={32} />,
      color: "#EA4335",
      description: "Access your email inbox",
      link: "#"
    },
    {
      name: "Calendar",
      icon: <FaCalendar size={32} />,
      color: "#4285F4",
      description: "View and manage your schedule",
      link: "#"
    },
    {
      name: "Drive",
      icon: <FaFileAlt size={32} />,
      color: "#34A853",
      description: "Access your files and documents",
      link: "#"
    },
    {
      name: "Meet",
      icon: <FaVideo size={32} />,
      color: "#00832D",
      description: "Start or join video meetings",
      link: "#"
    },
    {
      name: "Chat",
      icon: <FaComments size={32} />,
      color: "#00AC47",
      description: "Communicate with your team",
      link: "#"
    },
    {
      name: "AI Assistant",
      icon: <FaRobot size={32} />,
      color: "#FF6D00",
      description: "Get AI-powered assistance",
      link: "#"
    }
  ];

  const apps = [
    {
      id: 1,
      name: 'Email',
      icon: <FaEnvelope size={32} />,
      color: '#EA4335',
      link: '/office/email'
    },
    {
      id: 2,
      name: 'Dialer',
      icon: <FaPhone size={32} />,
      color: '#34A853',
      link: '/office/dialer'
    },
    {
      id: 3,
      name: 'Calendar',
      icon: <FaCalendar size={32} />,
      color: '#4285F4',
      link: '/office/calendar'
    },
    {
      id: 4,
      name: 'Meet',
      icon: <FaVideo size={32} />,
      color: '#00832D',
      link: '/office/meet'
    },
    {
      id: 5,
      name: 'Drive',
      icon: <FaCloud size={32} />,
      color: '#FBBC05',
      link: '/office/drive'
    },
    {
      id: 6,
      name: 'Chat',
      icon: <FaComments size={32} />,
      color: '#00AC47',
      link: '/office/chat'
    },
    {
      id: 7,
      name: 'AI Assistant',
      icon: <FaRobot size={32} />,
      color: '#FF6D00',
      link: '/office/ai'
    },
    {
      id: 8,
      name: 'Tasks',
      icon: <FaTasks size={32} />,
      color: '#9C27B0',
      link: '/office/tasks'
    },
    {
      id: 9,
      name: 'Analytics',
      icon: <FaChartBar size={32} />,
      color: '#1976D2',
      link: '/office/analytics'
    },
    {
      id: 10,
      name: 'Settings',
      icon: <FaCog size={32} />,
      color: '#607D8B',
      link: '/office/settings'
    }
  ];

  // Sample data for previews
  const recentEmails = [
    { from: 'John Doe', subject: 'Project Update', preview: 'Here are the latest updates...', time: '2h ago', unread: true },
    { from: 'Jane Smith', subject: 'Meeting Notes', preview: 'Please review the notes...', time: '4h ago', unread: true },
    { from: 'Mike Johnson', subject: 'Document Review', preview: 'Can you check this...', time: '1d ago', unread: false }
  ];

  const upcomingMeetings = [
    { 
      title: 'Team Standup', 
      time: new Date(new Date().setHours(10, 0)), 
      participants: 5,
      type: 'video'
    },
    { 
      title: 'Client Meeting', 
      time: new Date(new Date().setHours(14, 0)), 
      participants: 3,
      type: 'in-person'
    },
    { 
      title: 'Project Review', 
      time: new Date(new Date().setHours(16, 0)), 
      participants: 8,
      type: 'video'
    }
  ];

  const recentTasks = [
    { 
      title: 'Review Project Proposal', 
      due: new Date(), 
      priority: 'high',
      status: 'in-progress',
      progress: 60,
      assignee: 'John Doe'
    },
    { 
      title: 'Send Meeting Notes', 
      due: new Date(new Date().setDate(new Date().getDate() + 1)), 
      priority: 'medium',
      status: 'pending',
      progress: 0,
      assignee: 'Jane Smith'
    },
    { 
      title: 'Update Documentation', 
      due: new Date(new Date().setDate(new Date().getDate() + 7)), 
      priority: 'low',
      status: 'pending',
      progress: 30,
      assignee: 'Mike Johnson'
    }
  ];

  const recentChats = [
    { name: 'Marketing Team', lastMessage: 'Can you review this?', time: '5m ago', unread: true },
    { name: 'Development Team', lastMessage: 'Build is ready', time: '1h ago', unread: false },
    { name: 'Design Team', lastMessage: 'New mockups uploaded', time: '2h ago', unread: true }
  ];

  // Add dispositions data
  const dispositions = [
    { id: 'active', label: 'Active', color: 'success', icon: <FaPhone /> },
    { id: 'break', label: 'On Break', color: 'warning', icon: <FaCoffee /> },
    { id: 'bathroom', label: 'Bathroom', color: 'info', icon: <FaRestroom /> },
    { id: 'lunch', label: 'Lunch Break', color: 'warning', icon: <FaUtensils /> },
    { id: 'notes', label: 'Entering Notes', color: 'primary', icon: <FaFileAlt /> },
    { id: 'training', label: 'Training', color: 'secondary', icon: <FaGraduationCap /> },
    { id: 'meeting', label: 'In Meeting', color: 'info', icon: <FaUsers /> }
  ];

  const handleCall = (phoneNumber) => {
    if (!phoneNumber) return;
    setIsCallActive(true);
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setShowProfile(true);
  };

  const handleStartMeeting = (client) => {
    // Implement Google Meet integration
    window.open(`https://meet.google.com/new?email=${client.email}`, '_blank');
  };

  const handleSendSMS = (phone) => {
    // Implement SMS functionality
    window.open(`sms:${phone}`, '_blank');
  };

  const handleSendEmail = (email) => {
    // Implement email functionality
    window.open(`mailto:${email}`, '_blank');
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  // Get first day of month
  const firstDayOfMonth = new Date(2025, 2, 1);
  const startingDayIndex = firstDayOfMonth.getDay();
  
  // Generate calendar days array with empty slots for proper alignment
  const calendarDays = Array(startingDayIndex).fill(null).concat(
    Array.from({ length: 31 }, (_, i) => i + 1)
  );

  // Add search handler function
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle input from dialer pad
  const handleDialerInput = (value) => {
    switch(activeInputField) {
      case 'phoneNumber':
        setPhoneNumber(prev => prev + value);
        break;
      case 'firstName':
        setFirstName(prev => prev + value);
        break;
      case 'middleName':
        setMiddleName(prev => prev + value);
        break;
      case 'lastName':
        setLastName(prev => prev + value);
        break;
      case 'email':
        setEmail(prev => prev + value);
        break;
      case 'streetAddress':
        setStreetAddress(prev => prev + value);
        break;
      case 'apartment':
        setApartment(prev => prev + value);
        break;
      case 'city':
        setCity(prev => prev + value);
        break;
      case 'stateProvince':
        setStateProvince(prev => prev + value);
        break;
      case 'zipCode':
        setZipCode(prev => prev + value);
        break;
      case 'country':
        setCountry(prev => prev + value);
        break;
      default:
        setPhoneNumber(prev => prev + value);
    }
  };
  
  // Function to handle backspace from dialer pad
  const handleDialerBackspace = () => {
    switch(activeInputField) {
      case 'phoneNumber':
        setPhoneNumber(prev => prev.slice(0, -1));
        break;
      case 'firstName':
        setFirstName(prev => prev.slice(0, -1));
        break;
      case 'middleName':
        setMiddleName(prev => prev.slice(0, -1));
        break;
      case 'lastName':
        setLastName(prev => prev.slice(0, -1));
        break;
      case 'email':
        setEmail(prev => prev.slice(0, -1));
        break;
      case 'streetAddress':
        setStreetAddress(prev => prev.slice(0, -1));
        break;
      case 'apartment':
        setApartment(prev => prev.slice(0, -1));
        break;
      case 'city':
        setCity(prev => prev.slice(0, -1));
        break;
      case 'stateProvince':
        setStateProvince(prev => prev.slice(0, -1));
        break;
      case 'zipCode':
        setZipCode(prev => prev.slice(0, -1));
        break;
      case 'country':
        setCountry(prev => prev.slice(0, -1));
        break;
      default:
        setPhoneNumber(prev => prev.slice(0, -1));
    }
  };
  
  // Function to clear the active input field
  const handleDialerClear = () => {
    switch(activeInputField) {
      case 'phoneNumber':
        setPhoneNumber('');
        break;
      case 'firstName':
        setFirstName('');
        break;
      case 'middleName':
        setMiddleName('');
        break;
      case 'lastName':
        setLastName('');
        break;
      case 'email':
        setEmail('');
        break;
      case 'streetAddress':
        setStreetAddress('');
        break;
      case 'apartment':
        setApartment('');
        break;
      case 'city':
        setCity('');
        break;
      case 'stateProvince':
        setStateProvince('');
        break;
      case 'zipCode':
        setZipCode('');
        break;
      case 'country':
        setCountry('');
        break;
      default:
        setPhoneNumber('');
    }
  };

  return (
    <div className="office-container">
      <Container fluid>
        <div className="workspace-header">
          <div className="welcome-section">
            <h1>Office Workspace</h1>
            <p className="text-muted">Welcome back! Here's your overview for today</p>
          </div>
          <div className="quick-actions">
            <div className="profile-dropdown">
              <Button 
                variant="outline-primary" 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <FaUser className="me-2" /> Profile
              </Button>
              {showProfileDropdown && (
                <div className="profile-dropdown-menu">
                  <div className="profile-header p-3 border-bottom">
                    <div className="d-flex align-items-center">
                      <div className="profile-avatar me-3">
                        {profilePicture ? (
                          <img src={profilePicture} alt="Profile" className="rounded-circle" />
                        ) : (
                          <FaUserCircle size={40} />
                        )}
                      </div>
                      <div>
                        <h6 className="mb-0">John Doe</h6>
                        <small className="text-muted">john.doe@example.com</small>
                      </div>
                    </div>
                  </div>
                  <div className="profile-menu-items">
                    <a href="#" className="dropdown-item">
                      <FaUser className="me-2" /> My Profile
                    </a>
                    <a href="#" className="dropdown-item">
                      <FaBell className="me-2" /> Notifications
                    </a>
                    <a href="#" className="dropdown-item">
                      <FaCog className="me-2" /> Settings
                    </a>
                    <div className="dropdown-divider"></div>
                    <a 
                      href="#" 
                      className="dropdown-item text-danger"
                      onClick={() => router.push('/login')}
                    >
                      <FaSignOutAlt className="me-2" /> Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Nav variant="pills" className="workspace-nav">
          <Nav.Item>
            <Nav.Link active={activeTab === 'home'} onClick={() => setActiveTab('home')}>
              <FaHome className="me-2" /> Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'dialer'} onClick={() => setActiveTab('dialer')}>
              <FaPhone className="me-2" /> Dialer
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')}>
              <FaChartBar className="me-2" /> Analytics
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
              <FaCog className="me-2" /> Settings
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {activeTab === 'home' && (
          <div className="dashboard-grid">
            {/* Calendar Preview Section */}
            <Card className="dashboard-card calendar-preview mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <FaCalendar className="me-2" /> Today's Schedule
                </h5>
                <Button variant="link" onClick={() => router.push('/office/calendar')}>
                  View Calendar
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="calendar-view">
                  <div className="calendar-header">
                    <h6 className="current-month">March 2025</h6>
                  </div>
                  <div className="calendar-grid">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="calendar-day-header">{day}</div>
                    ))}
                    {calendarDays.map((day, index) => {
                      if (day === null) return <div key={`empty-${index}`} className="calendar-day" />;
                      
                      const hasEvents = [4, 7, 9, 10, 11, 13, 14, 15, 29, 30, 31].includes(day);
                      const isToday = day === currentTime.getDate() && 
                        currentTime.getMonth() === 2 && 
                        currentTime.getFullYear() === 2025;
                      
                      return (
                        <div 
                          key={day} 
                          className={`calendar-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
                        >
                          {day}
                          {hasEvents && <FaCircle className="event-dot" />}
                        </div>
                      );
                    })}
                  </div>
                  <div className="upcoming-events mt-3">
                    <h6 className="upcoming-title">Upcoming Events</h6>
                    <div className="preview-list">
                      {upcomingMeetings.map((meeting, index) => {
                        const timeUntil = Math.round((meeting.time - currentTime) / (1000 * 60));
                        const isStartingSoon = timeUntil <= 30 && timeUntil > 0;
                        
                        return (
                          <div key={index} className={`preview-item meeting-item ${meeting.type} ${isStartingSoon ? 'starting-soon' : ''}`}>
                            <div className="preview-content">
                              <div className="meeting-header">
                                <h6>{meeting.title}</h6>
                                <Badge bg={meeting.type === 'video' ? 'primary' : 'success'}>
                                  {meeting.type.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-muted mb-1">
                                {formatTime(meeting.time)} ({timeUntil <= 0 ? 'Started' : `in ${timeUntil} min`})
                              </p>
                              <div className="meeting-participants">
                                <FaUsers className="me-2" />
                                {meeting.participants} participants
                              </div>
                            </div>
                            <Button 
                              variant={isStartingSoon ? "primary" : "outline-primary"} 
                              size="sm"
                              className="px-3"
                            >
                              Join
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Email Preview Section */}
            <Card className="dashboard-card mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <FaEnvelope className="me-2" /> Recent Emails
                </h5>
                <Button variant="link" onClick={() => router.push('/office/email')}>
                  View All
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="preview-list">
                  {recentEmails.map((email, index) => (
                    <div key={index} className={`preview-item ${email.unread ? 'unread' : ''}`}>
                      <div className="preview-content">
                        <h6>{email.subject}</h6>
                        <p className="text-muted mb-1">{email.from}</p>
                        <p className="preview-text">{email.preview}</p>
                      </div>
                      <span className="preview-time">{email.time}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Notes Section */}
            <Card className="dashboard-card tasks-preview mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center border-0 bg-transparent">
                <h5 className="mb-0">
                  <FaTasks className="me-2" /> Notes
                </h5>
                <Button variant="outline-primary" size="sm" className="rounded-pill">
                  <FaPlus className="me-1" /> New Note
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="notes-container">
                  <div className="notes-content p-3">
                    <div className="notes-grid">
                      <div className="note-card p-4 border-0 rounded-3 shadow-sm mb-4" style={{ backgroundColor: '#fff9e6' }}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h6 className="mb-0">Meeting Notes</h6>
                          <div className="note-actions">
                            <div className="dropdown">
                              <Button variant="link" size="sm" className="text-muted p-0" data-bs-toggle="dropdown">
                                <FaEllipsisV />
                              </Button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><FaEdit className="me-2" /> Edit Note</a></li>
                                <li><a className="dropdown-item" href="#"><FaPalette className="me-2" /> Change Color</a></li>
                                <li><a className="dropdown-item" href="#"><FaTrash className="me-2" /> Delete Note</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted small mb-3">Updated 2h ago</p>
                        <div className="note-content">
                          <p className="mb-3">Key points from team meeting:</p>
                          <ul className="mb-0">
                            <li>Q4 goals review</li>
                            <li>New product launch timeline</li>
                            <li>Team training schedule</li>
                          </ul>
                        </div>
                      </div>

                      <div className="note-card p-3 border-0 rounded-3 shadow-sm mb-3" style={{ backgroundColor: '#e6f3ff' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Follow-up Tasks</h6>
                          <div className="note-actions">
                            <div className="dropdown">
                              <Button variant="link" size="sm" className="text-muted p-0" data-bs-toggle="dropdown">
                                <FaEllipsisV />
                              </Button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><FaEdit className="me-2" /> Edit Note</a></li>
                                <li><a className="dropdown-item" href="#"><FaPalette className="me-2" /> Change Color</a></li>
                                <li><a className="dropdown-item" href="#"><FaTrash className="me-2" /> Delete Note</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted small mb-2">Updated 1d ago</p>
                        <div className="note-content">
                          <div className="d-flex align-items-center mb-2">
                            <Form.Check type="checkbox" id="task1" className="me-2" />
                            <label htmlFor="task1">Review client proposal</label>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <Form.Check type="checkbox" id="task2" className="me-2" />
                            <label htmlFor="task2">Schedule team training</label>
                          </div>
                          <div className="d-flex align-items-center">
                            <Form.Check type="checkbox" id="task3" className="me-2" />
                            <label htmlFor="task3">Update sales report</label>
                          </div>
                        </div>
                      </div>

                      <div className="note-card p-3 border-0 rounded-3 shadow-sm mb-3" style={{ backgroundColor: '#e6ffe6' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Quick Ideas</h6>
                          <div className="note-actions">
                            <div className="dropdown">
                              <Button variant="link" size="sm" className="text-muted p-0" data-bs-toggle="dropdown">
                                <FaEllipsisV />
                              </Button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><FaEdit className="me-2" /> Edit Note</a></li>
                                <li><a className="dropdown-item" href="#"><FaPalette className="me-2" /> Change Color</a></li>
                                <li><a className="dropdown-item" href="#"><FaTrash className="me-2" /> Delete Note</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted small mb-2">Updated 3d ago</p>
                        <div className="note-content">
                          <p className="mb-2">Potential improvements:</p>
                          <ul className="mb-0">
                            <li>Add client feedback feature</li>
                            <li>Streamline onboarding process</li>
                            <li>Create training documentation</li>
                          </ul>
                        </div>
                      </div>

                      <div className="note-card p-3 border-0 rounded-3 shadow-sm mb-3" style={{ backgroundColor: '#ffe6e6' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Personal Goals</h6>
                          <div className="note-actions">
                            <div className="dropdown">
                              <Button variant="link" size="sm" className="text-muted p-0" data-bs-toggle="dropdown">
                                <FaEllipsisV />
                              </Button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><FaEdit className="me-2" /> Edit Note</a></li>
                                <li><a className="dropdown-item" href="#"><FaPalette className="me-2" /> Change Color</a></li>
                                <li><a className="dropdown-item" href="#"><FaTrash className="me-2" /> Delete Note</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted small mb-2">Updated 1w ago</p>
                        <div className="note-content">
                          <p className="mb-2">Q1 Goals:</p>
                          <ul className="mb-0">
                            <li>Complete advanced training</li>
                            <li>Increase client base by 20%</li>
                            <li>Improve call conversion rate</li>
                          </ul>
                        </div>
                      </div>

                      <div className="note-card p-3 border-0 rounded-3 shadow-sm mb-3" style={{ backgroundColor: '#f3e6ff' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Client Meeting Prep</h6>
                          <div className="note-actions">
                            <div className="dropdown">
                              <Button variant="link" size="sm" className="text-muted p-0" data-bs-toggle="dropdown">
                                <FaEllipsisV />
                              </Button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><FaEdit className="me-2" /> Edit Note</a></li>
                                <li><a className="dropdown-item" href="#"><FaPalette className="me-2" /> Change Color</a></li>
                                <li><a className="dropdown-item" href="#"><FaTrash className="me-2" /> Delete Note</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted small mb-2">Updated 2d ago</p>
                        <div className="note-content">
                          <p className="mb-2">Meeting with Acme Corp:</p>
                          <ul className="mb-0">
                            <li>Review current policy coverage</li>
                            <li>Discuss renewal options</li>
                            <li>Address client concerns</li>
                          </ul>
                        </div>
                      </div>

                      <div className="note-card p-3 border-0 rounded-3 shadow-sm mb-3" style={{ backgroundColor: '#e6fff3' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Training Notes</h6>
                          <div className="note-actions">
                            <div className="dropdown">
                              <Button variant="link" size="sm" className="text-muted p-0" data-bs-toggle="dropdown">
                                <FaEllipsisV />
                              </Button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><FaEdit className="me-2" /> Edit Note</a></li>
                                <li><a className="dropdown-item" href="#"><FaPalette className="me-2" /> Change Color</a></li>
                                <li><a className="dropdown-item" href="#"><FaTrash className="me-2" /> Delete Note</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted small mb-2">Updated 4d ago</p>
                        <div className="note-content">
                          <p className="mb-2">New Product Training:</p>
                          <ul className="mb-0">
                            <li>Review product specifications</li>
                            <li>Practice sales pitch</li>
                            <li>Study competitor analysis</li>
                          </ul>
                        </div>
                      </div>

                      <div className="note-card p-3 border-0 rounded-3 shadow-sm" style={{ backgroundColor: '#fff3e6' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Weekly Targets</h6>
                          <div className="note-actions">
                            <div className="dropdown">
                              <Button variant="link" size="sm" className="text-muted p-0" data-bs-toggle="dropdown">
                                <FaEllipsisV />
                              </Button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><FaEdit className="me-2" /> Edit Note</a></li>
                                <li><a className="dropdown-item" href="#"><FaPalette className="me-2" /> Change Color</a></li>
                                <li><a className="dropdown-item" href="#"><FaTrash className="me-2" /> Delete Note</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted small mb-2">Updated 5d ago</p>
                        <div className="note-content">
                          <p className="mb-2">This Week's Goals:</p>
                          <ul className="mb-0">
                            <li>Make 50 outbound calls</li>
                            <li>Close 5 new policies</li>
                            <li>Schedule 10 follow-ups</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Team Chat Section */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaComments className="me-2" /> Team Chat
                  </h5>
                  <Button variant="outline-primary" size="sm">
                    <FaPlus className="me-1" /> New Chat
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="chat-container">
                  <div className="chat-sidebar border-end">
                    <div className="chat-search p-2 border-bottom">
                      <Form.Control
                        type="search"
                        placeholder="Search conversations..."
                        className="form-control-sm"
                      />
                    </div>
                    <div className="chat-channels p-2">
                      <div className="d-flex align-items-center mb-2">
                        <FaHashtag className="me-2 text-muted" />
                        <span className="text-muted small">Channels</span>
                      </div>
                      <div className="chat-channel-list">
                        {[
                          { name: 'general', unread: 3 },
                          { name: 'sales-team', unread: 0 },
                          { name: 'support', unread: 5 },
                          { name: 'announcements', unread: 0 }
                        ].map((channel, index) => (
                          <div key={index} className="chat-channel-item d-flex align-items-center p-2 rounded">
                            <FaHashtag className="me-2 text-muted" />
                            <span className="flex-grow-1">{channel.name}</span>
                            {channel.unread > 0 && (
                              <Badge bg="primary" className="rounded-pill">
                                {channel.unread}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="chat-main">
                    <div className="chat-header p-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="user-avatar me-2">
                          <div className="status-indicator online" />
                        </div>
                        <div>
                          <h6 className="mb-0">John Smith</h6>
                          <small className="text-muted">Online</small>
                        </div>
                      </div>
                    </div>
                    <div className="chat-messages p-3">
                      {[
                        { sender: 'John Smith', message: 'Hey team! How\'s the Q4 report coming along?', time: '10:30 AM' },
                        { sender: 'You', message: 'Just finished the initial draft. Would you like to review it?', time: '10:31 AM' },
                        { sender: 'John Smith', message: 'Yes, please share it in the general channel.', time: '10:32 AM' }
                      ].map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                          <div className="message-content">
                            {msg.message}
                          </div>
                          <div className="message-time small text-muted">
                            {msg.time}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="chat-input p-3 border-top">
                      <Form>
                        <div className="d-flex gap-2">
                          <Form.Control
                            type="text"
                            placeholder="Type a message..."
                            className="form-control-sm"
                          />
                          <Button variant="primary" size="sm">
                            <FaPaperPlane />
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* AI Assistant Section */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaRobot className="me-2" /> AI Assistant
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="ai-assistant-preview">
                  <p>Ask me anything about your work or schedule</p>
                  <Form>
                    <Form.Group className="mb-0">
                      <Form.Control 
                        type="text" 
                        placeholder="Type your question..." 
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Form>
                </div>
              </Card.Body>
            </Card>

            {/* Drive Preview Section */}
            <Card className="dashboard-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaGoogleDrive className="me-2" /> Drive
                  </h5>
                  <Button variant="outline-primary" size="sm">
                    <FaPlus className="me-1" /> New
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="drive-search mb-3">
                  <Form.Control
                    type="search"
                    placeholder="Search in Drive..."
                    className="form-control-sm"
                  />
                </div>
                <div className="drive-folders mb-3">
                  <div className="d-flex gap-2 mb-2">
                    <Button variant="outline-secondary" size="sm" className="drive-folder-btn">
                      <FaFolder className="me-1" /> My Drive
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="drive-folder-btn">
                      <FaUsers className="me-1" /> Shared
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="drive-folder-btn">
                      <FaStar className="me-1" /> Starred
                    </Button>
                  </div>
                </div>
                <div className="drive-files">
                  {[
                    { name: 'Q4 Sales Report.xlsx', type: 'excel', size: '2.4 MB', modified: '2h ago' },
                    { name: 'Client Presentation.pptx', type: 'powerpoint', size: '4.8 MB', modified: '1d ago' },
                    { name: 'Contract Draft.pdf', type: 'pdf', size: '1.2 MB', modified: '3d ago' },
                    { name: 'Team Meeting Notes.docx', type: 'word', size: '856 KB', modified: '5d ago' }
                  ].map((file, index) => (
                    <div key={index} className="drive-file-item d-flex align-items-center p-2 rounded">
                      <div className="file-icon me-3">
                        {file.type === 'excel' && <FaFileExcel className="text-success" />}
                        {file.type === 'powerpoint' && <FaFilePowerpoint className="text-danger" />}
                        {file.type === 'pdf' && <FaFilePdf className="text-danger" />}
                        {file.type === 'word' && <FaFileWord className="text-primary" />}
                      </div>
                      <div className="file-info flex-grow-1">
                        <div className="file-name">{file.name}</div>
                        <div className="file-meta text-muted small">
                          {file.size} • {file.modified}
                        </div>
                      </div>
                      <div className="file-actions">
                        <Button variant="link" size="sm" className="text-muted">
                          <FaEllipsisV />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {activeTab === 'dialer' && (
          <div className="dialer-layout">
            {/* Contact Form Section - Now on left side for desktop */}
            <Card className="dashboard-card contact-form-section">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaPhone className="me-2" /> Contact Information & Call Details
                  </h5>
                  <div className="search-container" style={{ width: '300px' }}>
                    <Form.Control
                      type="search"
                      placeholder="Search clients..."
                      className="form-control-sm"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                {searchQuery && (
                  <div className="search-results mb-4">
                    <h6 className="mb-3">Search Results</h6>
                    <div className="list-group">
                      {clients
                        .filter(client => 
                          client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          client.phone.includes(searchQuery) ||
                          client.email.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((client, index) => (
                          <div 
                            key={index} 
                            className="list-group-item list-group-item-action"
                            onClick={() => {
                              setPhoneNumber(client.phone);
                              setSelectedClient(client);
                              setShowClientProfile(true);
                              setSearchQuery(''); // Clear search after selection
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="mb-1">{client.name}</h6>
                                <p className="mb-1 text-muted small">{client.company}</p>
                                <p className="mb-0 text-muted small">{client.phone}</p>
                              </div>
                              <div className="text-end">
                                <Badge bg="primary" className="mb-1">View Profile</Badge>
                                <p className="mb-0 text-muted small">Click to load details</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                <div className="contact-form-container">
                <Form>
                  <div className="call-actions-container mb-4">
                    <div className="dialer-actions d-flex justify-content-center gap-2">
                      <Button
                        variant={isCallActive ? "danger" : "success"}
                        className="call-button btn-sm"
                        onClick={() => isCallActive ? handleEndCall() : handleCall(phoneNumber)}
                      >
                        {isCallActive ? (
                          <>
                            <FaPhone className="me-1" /> End Call ({formatDuration(callDuration)})
                          </>
                        ) : (
                          <>
                            <FaPhone className="me-1" /> Start Call
                          </>
                        )}
                      </Button>
                      <Button variant="primary" className="btn-sm">
                        <FaSms className="me-1" /> SMS
                      </Button>
                      <Button variant="info" className="btn-sm">
                        <FaEnvelope className="me-1" /> Email
                      </Button>
                      <Button variant="warning" className="btn-sm">
                        <FaCalendar className="me-1" /> Follow-up
                      </Button>
                    </div>
                    {isCallActive && (
                      <div className="call-status text-center mt-2">
                        <p className="text-success mb-0">Call in progress...</p>
                        <small className="text-muted">Duration: {formatDuration(callDuration)}</small>
                      </div>
                    )}
                  </div>
                  <Row className="mb-4">
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Enter first name" 
                            className="form-control-lg"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onFocus={() => setActiveInputField('firstName')}
                          />
                      </Form.Group>
          </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Middle Name</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Enter middle name" 
                            className="form-control-lg"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            onFocus={() => setActiveInputField('middleName')}
                          />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Enter last name" 
                            className="form-control-lg"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onFocus={() => setActiveInputField('lastName')}
                          />
                      </Form.Group>
          </Col>
        </Row>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                          type="tel" 
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter phone number"
                          className="form-control-lg"
                            onFocus={() => setActiveInputField('phoneNumber')}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                          <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            className="form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setActiveInputField('email')}
                          />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col md={12}>
                      <h6 className="mb-3">Residential Address</h6>
        <Row>
                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Street Number & Name</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="e.g., 123 Main Street" 
                              className="form-control-lg"
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                                onFocus={() => setActiveInputField('streetAddress')}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Apartment/Suite/Unit</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="e.g., Apt 4B" 
                              className="form-control-lg"
                                value={apartment}
                                onChange={(e) => setApartment(e.target.value)}
                                onFocus={() => setActiveInputField('apartment')}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Enter city" 
                              className="form-control-lg"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                onFocus={() => setActiveInputField('city')}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>State/Province</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Enter state/province" 
                              className="form-control-lg"
                                value={stateProvince}
                                onChange={(e) => setStateProvince(e.target.value)}
                                onFocus={() => setActiveInputField('stateProvince')}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>ZIP/Postal Code</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Enter ZIP/postal code" 
                              className="form-control-lg"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                onFocus={() => setActiveInputField('zipCode')}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Enter country" 
                              className="form-control-lg"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                onFocus={() => setActiveInputField('country')}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={12}>
                      <h6 className="mb-3">Mailing Address (if different from residential)</h6>
                      <Row>
                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Street Number & Name</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="e.g., 123 Main Street" 
                              className="form-control-lg"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Apartment/Suite/Unit</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="e.g., Apt 4B" 
                              className="form-control-lg"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Enter city" 
                              className="form-control-lg"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>State/Province</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Enter state/province" 
                              className="form-control-lg"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>ZIP/Postal Code</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Enter ZIP/postal code" 
                              className="form-control-lg"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Enter country" 
                              className="form-control-lg"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Check 
                          type="checkbox"
                          id="sameAsResidential"
                          label="Mailing address is the same as residential address"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Occupation</Form.Label>
                        <Form.Control type="text" placeholder="Enter occupation" className="form-control-lg" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Annual Income</Form.Label>
                        <Form.Control type="text" placeholder="Enter annual income" className="form-control-lg" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={12}>
                      <div className="policy-status-section p-3 border rounded">
                        <h6 className="mb-3">Policy Information</h6>
                        <Row>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Insurance Provider</Form.Label>
                              <Form.Select className="form-select-lg">
                                <option value="">Select Provider</option>
                                <option value="united">United Healthcare</option>
                                <option value="bcbs">Blue Cross Blue Shield</option>
                                <option value="humana">Humana</option>
                                <option value="aetna">Aetna</option>
                                <option value="cigna">Cigna</option>
                                <option value="other">Other</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Policy Status</Form.Label>
                              <Form.Select className="form-select-lg">
                                <option value="">Select Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="expired">Expired</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="none">No Policy</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Policy Type</Form.Label>
                              <Form.Select className="form-select-lg">
                                <option value="">Select Type</option>
                                <option value="individual">Individual</option>
                                <option value="family">Family</option>
                                <option value="group">Group</option>
                                <option value="medicare">Medicare</option>
                                <option value="medicaid">Medicaid</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Policy Number</Form.Label>
                              <Form.Control 
                                type="text" 
                                placeholder="Enter policy number"
                                className="form-control-lg"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Effective Date</Form.Label>
                              <Form.Control 
                                type="date" 
                                className="form-control-lg"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <div className="policy-status-indicator mt-3">
                          <div className="d-flex align-items-center">
                            <div className="status-dot active me-2"></div>
                            <span className="text-success">Active Policy</span>
                            <span className="text-muted ms-2">•</span>
                            <span className="text-muted ms-2">United Healthcare</span>
                            <span className="text-muted ms-2">•</span>
                            <span className="text-muted ms-2">Individual Plan</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Current Call Notes</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={4}
                          placeholder="Enter notes for current call..."
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={12}>
                      <div className="notes-history-section">
                        <h6 className="mb-3">Notes & Disposition History</h6>
                        <div className="history-timeline">
                          {[
                            {
                              date: '2024-03-15 14:30',
                              agent: 'John Smith',
                              type: 'Outbound Call',
                              disposition: 'Follow-up Required',
                              notes: 'Customer requested additional information about policy coverage. Scheduled follow-up for next week.',
                              duration: '8:45'
                            },
                            {
                              date: '2024-03-10 11:15',
                              agent: 'Sarah Johnson',
                              type: 'Inbound Call',
                              disposition: 'Policy Updated',
                              notes: 'Updated billing information and discussed policy renewal options.',
                              duration: '12:30'
                            },
                            {
                              date: '2024-03-05 09:45',
                              agent: 'Mike Wilson',
                              type: 'Outbound Call',
                              disposition: 'Left Voicemail',
                              notes: 'Attempted to reach customer regarding policy expiration. Left detailed voicemail.',
                              duration: '2:15'
                            }
                          ].map((entry, index) => (
                            <div key={index} className="history-entry">
                              <div className="history-entry-header">
                                <div className="history-entry-meta">
                                  <span className="history-date">{entry.date}</span>
                                  <Badge bg="info" className="ms-2">{entry.type}</Badge>
                                  <Badge 
                                    bg={
                                      entry.disposition === 'Follow-up Required' ? 'warning' :
                                      entry.disposition === 'Policy Updated' ? 'success' :
                                      'secondary'
                                    }
                                    className="ms-2"
                                  >
                                    {entry.disposition}
                                  </Badge>
                                </div>
                                <div className="history-entry-details">
                                  <span className="agent-name">
                                    <FaUser className="me-1" /> {entry.agent}
                                  </span>
                                  <span className="call-duration">
                                    <FaClock className="me-1" /> {entry.duration}
                                  </span>
                                </div>
                              </div>
                              <div className="history-entry-notes">
                                {entry.notes}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
                </div>
              </Card.Body>
            </Card>

            {/* Dialer Pad Section - Now on right side for desktop */}
            <Card className="dashboard-card dialer-pad-section mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaPhone className="me-2" /> Dialer Pad
                  </h5>
                  <div className="disposition-status">
                    <Form.Select
                      value={agentDisposition}
                      onChange={(e) => setAgentDisposition(e.target.value)}
                      className="form-select-sm disposition-select"
                    >
                      {dispositions.map((disp) => (
                        <option key={disp.id} value={disp.id}>
                          {disp.label}
                        </option>
                      ))}
                    </Form.Select>
                    {agentDisposition !== 'active' && (
                      <Form.Control
                        type="text"
                        placeholder="Add notes about your status..."
                        value={dispositionNotes}
                        onChange={(e) => setDispositionNotes(e.target.value)}
                        className="form-control-sm disposition-notes mt-2"
                      />
                    )}
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="dialer-pad-container">
                  <div className="dialer-display mb-4">
                    <Form.Control
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter phone number"
                      className="text-center form-control-lg"
                      onFocus={() => setActiveInputField('phoneNumber')}
                    />
                    <div className="active-field-indicator mt-2 text-center">
                      <small className="text-muted">Typing into: {activeInputField.replace(/([A-Z])/g, ' $1').toLowerCase()}</small>
                    </div>
                  </div>
                  <div className="dialer-grid-container">
                    <div className="dialer-grid">
                      {[
                        { num: '1', sub: '' },
                        { num: '2', sub: 'ABC' },
                        { num: '3', sub: 'DEF' },
                        { num: '4', sub: 'GHI' },
                        { num: '5', sub: 'JKL' },
                        { num: '6', sub: 'MNO' },
                        { num: '7', sub: 'PQRS' },
                        { num: '8', sub: 'TUV' },
                        { num: '9', sub: 'WXYZ' },
                        { num: '*', sub: '' },
                        { num: '0', sub: '+' },
                        { num: '#', sub: '' }
                      ].map((key) => (
                        <Button
                          key={key.num}
                          variant="light"
                          className="dialer-key"
                          onClick={() => handleDialerInput(key.num)}
                        >
                          <span className="key-number">{key.num}</span>
                          {key.sub && <span className="key-letters">{key.sub}</span>}
                        </Button>
                      ))}
                    </div>
                    <div className="dialer-actions mt-4">
                      <Button
                        variant="danger"
                        className="btn-circle"
                        onClick={() => handleDialerBackspace()}
                      >
                        <FaPhone className="rotate-135" />
                      </Button>
                      <Button
                        variant="success"
                        className="btn-circle"
                        onClick={() => handleCall(phoneNumber)}
                        disabled={!phoneNumber || isCallActive}
                      >
                        <FaPhone />
                      </Button>
                      <Button
                        variant="secondary"
                        className="btn-circle"
                        onClick={() => handleDialerClear()}
                      >
                        <FaTimes />
                      </Button>
                    </div>
                    {/* Add Transfer Call Button */}
                    <div className="transfer-call-container mt-3">
                      <Button 
                        variant="info" 
                        className="w-100"
                        onClick={() => alert(`Transferring call to ${phoneNumber}`)}
                        disabled={!isCallActive}
                      >
                        <FaExchangeAlt className="me-2" /> Transfer Call
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="dashboard-grid">
            {/* Performance Overview Card */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaChartBar className="me-2" /> Performance Overview
                  </h5>
                  <div className="d-flex gap-2">
                    <Form.Select size="sm" className="w-auto">
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">This Quarter</option>
                      <option value="year">This Year</option>
                    </Form.Select>
                    <Button variant="outline-primary" size="sm">
                      <FaDownload className="me-1" /> Export
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Row className="g-4">
                  <Col md={3}>
                    <div className="stat-card bg-primary bg-opacity-10 p-3 rounded">
                      <h6 className="text-primary">Total Calls</h6>
                      <h3>124</h3>
                      <div className="d-flex align-items-center">
                        <small className="text-success me-2">+12% this week</small>
                        <small className="text-muted">vs last week</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="stat-card bg-success bg-opacity-10 p-3 rounded">
                      <h6 className="text-success">Total Conversions</h6>
                      <h3>84</h3>
                      <div className="d-flex align-items-center">
                        <small className="text-success me-2">+8% this week</small>
                        <small className="text-muted">vs last week</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="stat-card bg-info bg-opacity-10 p-3 rounded">
                      <h6 className="text-info">Conversion Rate</h6>
                      <h3>68%</h3>
                      <div className="d-flex align-items-center">
                        <small className="text-success me-2">+5% this week</small>
                        <small className="text-muted">vs last week</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="stat-card bg-warning bg-opacity-10 p-3 rounded">
                      <h6 className="text-warning">Avg Call Duration</h6>
                      <h3>8:30</h3>
                      <div className="d-flex align-items-center">
                        <small className="text-danger me-2">-2% this week</small>
                        <small className="text-muted">vs last week</small>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={6}>
                    <div className="performance-detail-card p-3 border rounded">
                      <h6 className="mb-3">Conversion Breakdown</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Premium Package</span>
                        <span className="text-success">45 conversions</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Standard Package</span>
                        <span className="text-success">28 conversions</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Basic Package</span>
                        <span className="text-success">11 conversions</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="performance-detail-card p-3 border rounded">
                      <h6 className="mb-3">Call Duration Distribution</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span>0-5 minutes</span>
                        <span className="text-info">32%</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>5-15 minutes</span>
                        <span className="text-info">45%</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>15+ minutes</span>
                        <span className="text-info">23%</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Call History Card */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaHistory className="me-2" /> Call History
                  </h5>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="search"
                      placeholder="Search calls..."
                      className="form-control-sm"
                      style={{ width: '200px' }}
                    />
                    <Button variant="outline-primary" size="sm">
                      <FaDownload className="me-1" /> Export
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Date/Time</th>
                      <th>Phone Number</th>
                      <th>Duration</th>
                      <th>Disposition</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024-03-15 14:30</td>
                      <td>(555) 123-4567</td>
                      <td>8:45</td>
                      <td><Badge bg="success">Sale</Badge></td>
                      <td>Customer purchased premium package</td>
                    </tr>
                    <tr>
                      <td>2024-03-15 13:15</td>
                      <td>(555) 987-6543</td>
                      <td>12:30</td>
                      <td><Badge bg="warning">Follow-up</Badge></td>
                      <td>Customer requested additional information</td>
                    </tr>
                    <tr>
                      <td>2024-03-15 11:45</td>
                      <td>(555) 456-7890</td>
                      <td>5:15</td>
                      <td><Badge bg="secondary">No Answer</Badge></td>
                      <td>Left voicemail</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Support & Help Card */}
            <Card className="dashboard-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaUserShield className="me-2" /> Support & Help
                  </h5>
                  <Button variant="outline-primary" size="sm">
                    <FaPlus className="me-1" /> New Ticket
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="help-desk-container">
                  <div className="search-section mb-4">
                    <Form.Control
                      type="search"
                      placeholder="Search for help articles or technical issues..."
                      className="form-control-lg"
                    />
                  </div>

                  <div className="support-grid">
                    <div className="support-section">
                      <h6 className="mb-3">Quick Support Chat</h6>
                      <div className="d-grid gap-2">
                        <div className="region-card p-3 border rounded mb-3">
                          <h6 className="mb-2">IT Support</h6>
                          <p className="text-muted small mb-2">Technical issues, system access, equipment requests</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <Badge bg="success" className="rounded-pill">Online</Badge>
                            <Button variant="outline-primary" size="sm">
                              <FaComments className="me-1" /> Start Chat
                            </Button>
                          </div>
                        </div>
                        <div className="region-card p-3 border rounded mb-3">
                          <h6 className="mb-2">Manager Support</h6>
                          <p className="text-muted small mb-2">Schedule changes, training requests, policy questions</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <Badge bg="success" className="rounded-pill">Online</Badge>
                            <Button variant="outline-primary" size="sm">
                              <FaComments className="me-1" /> Start Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="support-section">
                      <h6 className="mb-3">Request Status</h6>
                      <div className="list-group list-group-flush">
                        <div className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold">Schedule Change Request</span>
                            <Badge bg="warning" className="rounded-pill">Pending Review</Badge>
                          </div>
                          <p className="text-muted small mb-2">Requested shift change for next week</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">Submitted 2h ago</small>
                            <small className="text-info">Updates sent to your email</small>
                          </div>
                        </div>
                        <div className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold">Training Approval</span>
                            <Badge bg="success" className="rounded-pill">Approved</Badge>
                          </div>
                          <p className="text-muted small mb-2">Advanced sales techniques workshop</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">Updated 1d ago</small>
                            <small className="text-success">Approval sent to your email</small>
                          </div>
                        </div>
                        <div className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold">Equipment Request</span>
                            <Badge bg="info" className="rounded-pill">In Review</Badge>
                          </div>
                          <p className="text-muted small mb-2">New headset replacement</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">Submitted 2d ago</small>
                            <small className="text-info">Updates sent to your email</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="dashboard-grid">
            {/* General Settings Card */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaCog className="me-2" /> General Settings
                </h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Language</Form.Label>
                    <Form.Select defaultValue="en">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Time Zone</Form.Label>
                    <Form.Select defaultValue="utc">
                      <option value="utc">UTC</option>
                      <option value="est">Eastern Time</option>
                      <option value="pst">Pacific Time</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="switch"
                      id="darkMode"
                      label="Dark Mode"
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            {/* Profile Settings Card */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaUser className="me-2" /> Profile Settings
                </h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  <div className="text-center mb-4">
                    <div className="profile-picture-container position-relative d-inline-block">
                      {profilePicture ? (
                        <img 
                          src={profilePicture} 
                          alt="Profile" 
                          className="rounded-circle profile-picture"
                        />
                      ) : (
                        <FaUserCircle size={120} className="text-muted" />
                      )}
                      <label className="profile-picture-upload">
                        <FaCamera className="upload-icon" />
                    <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setProfilePicture(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="d-none"
                        />
                      </label>
                  </div>
                  </div>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" value="Sales Agent" readOnly />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control type="text" value="Sales" readOnly />
                  </Form.Group>

                  <h6 className="mt-4 mb-3">Security Settings</h6>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="switch"
                      id="twoFactorAuth"
                      label="Two-Factor Authentication"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="switch"
                      id="loginNotifications"
                      label="Login Notifications"
                    />
                  </Form.Group>

                  <Button variant="primary" className="mt-3">
                    Save Changes
                      </Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Licensing & Contracting Card */}
            <Card className="dashboard-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaShieldAlt className="me-2" /> Licensing & Contracting
                  </h5>
                  <Button variant="outline-primary" size="sm">
                    <FaPlus className="me-1" /> New Contract
                  </Button>
                  </div>
              </Card.Header>
              <Card.Body>
                <div className="licensing-section">
                  <div className="current-license-status mb-4">
                    <h6 className="mb-3">General Lines License Status</h6>
                    <div className="license-card p-3 border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="mb-1">General Lines License</h6>
                          <Badge bg="success" className="rounded-pill">Active</Badge>
                        </div>
                        <div className="text-end">
                          <small className="text-muted">Expires: Dec 31, 2024</small>
                          <div className="mt-1">
                            <Button variant="outline-primary" size="sm">
                              <FaDownload className="me-1" /> Download
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="license-details">
                        <div className="row">
                          <div className="col-md-6">
                            <p className="mb-1"><strong>License Number:</strong> GL-2024-12345</p>
                            <p className="mb-1"><strong>Issue Date:</strong> Jan 1, 2024</p>
                            <p className="mb-1"><strong>State:</strong> California</p>
                          </div>
                          <div className="col-md-6">
                            <p className="mb-1"><strong>Type:</strong> General Lines</p>
                            <p className="mb-1"><strong>Status:</strong> Active</p>
                            <p className="mb-1"><strong>Agency:</strong> Aligned</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="contract-status mb-4">
                    <h6 className="mb-3">Carrier Contract Status</h6>
                    <div className="contract-card p-3 border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="mb-1">Insurance Carrier Contracts</h6>
                          <Badge bg="success" className="rounded-pill">Active</Badge>
                        </div>
                        <div className="text-end">
                          <small className="text-muted">Last Updated: Mar 15, 2024</small>
                          <div className="mt-1">
                            <Button variant="outline-primary" size="sm">
                              <FaFileAlt className="me-1" /> View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="contract-details">
                        <div className="row">
                          <div className="col-md-6">
                            <p className="mb-1"><strong>Primary State:</strong> California</p>
                            <p className="mb-1"><strong>Carriers:</strong> 8 Active</p>
                            <p className="mb-1"><strong>Types:</strong> Health, Life, P&C</p>
                          </div>
                          <div className="col-md-6">
                            <p className="mb-1"><strong>Status:</strong> Active</p>
                            <p className="mb-1"><strong>Review Date:</strong> Dec 31, 2024</p>
                            <p className="mb-1"><strong>Appointments:</strong> 12</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="compliance-section">
                    <h6 className="mb-3">Compliance & Certifications</h6>
                    <div className="compliance-list">
                      <div className="compliance-item p-2 border rounded mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0 small">HIPAA Compliance</h6>
                            <small className="text-muted">Last completed: Mar 1, 2024</small>
                          </div>
                          <Badge bg="success" className="rounded-pill">Certified</Badge>
                        </div>
                      </div>
                      <div className="compliance-item p-2 border rounded mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0 small">Insurance Ethics</h6>
                            <small className="text-muted">Last completed: Feb 15, 2024</small>
                          </div>
                          <Badge bg="success" className="rounded-pill">Certified</Badge>
                        </div>
                      </div>
                      <div className="compliance-item p-2 border rounded">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0 small">Data Privacy</h6>
                            <small className="text-muted">Last completed: Jan 30, 2024</small>
                          </div>
                          <Badge bg="success" className="rounded-pill">Certified</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-actions mt-3">
                    <h6 className="mb-2">Administrative Actions</h6>
                    <div className="d-flex gap-2">
                      <Button variant="outline-primary" size="sm">
                        <FaFileAlt className="me-1" /> Request License Update
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        <FaUserShield className="me-1" /> Contact Licensing Admin
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        <FaHistory className="me-1" /> View History
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </Container>

      {/* Client Profile Modal */}
      <Modal 
        show={showClientProfile} 
        onHide={() => setShowClientProfile(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex align-items-center">
              <div className="client-avatar me-3">
                <FaUser size={24} />
              </div>
              {selectedClient?.name}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClient && (
            <div className="client-profile">
              <Row>
                <Col md={8}>
                  <Card className="mb-3">
                    <Card.Header>
                      <h6 className="mb-0">Basic Information</h6>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <p className="mb-1">
                            <strong>Company:</strong> {selectedClient.company}
                          </p>
                          <p className="mb-1">
                            <strong>Position:</strong> {selectedClient.position}
                          </p>
                          <p className="mb-1">
                            <strong>Industry:</strong> {selectedClient.industry}
                          </p>
                        </Col>
                        <Col md={6}>
                          <p className="mb-1">
                            <strong>Email:</strong> {selectedClient.email}
                          </p>
                          <p className="mb-1">
                            <strong>Phone:</strong> {selectedClient.phone}
                          </p>
                          <p className="mb-1">
                            <strong>Location:</strong> {selectedClient.location}
                          </p>
                        </Col>
                      </Row>
                      <div className="mt-3">
                        <p className="mb-1"><strong>Address:</strong></p>
                        <p>{selectedClient.address}</p>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Header>
                      <h6 className="mb-0">Interaction History</h6>
                    </Card.Header>
                    <Card.Body>
                      <div className="timeline">
                        {selectedClient.history.map((event, index) => (
                          <div key={index} className="timeline-item">
                            <div className="timeline-icon">
                              {event.type === 'call' ? <FaPhone /> : 
                               event.type === 'email' ? <FaEnvelope /> : 
                               <FaVideo />}
                            </div>
                            <div className="timeline-content">
                              <h6>{event.title}</h6>
                              <p className="text-muted small">{event.date}</p>
                              <p>{event.description}</p>
                              {event.duration && (
                                <Badge bg="info" className="me-2">
                                  Duration: {event.duration}
                                </Badge>
                              )}
                              {event.outcome && (
                                <Badge bg="success">
                                  Outcome: {event.outcome}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="mb-3">
                    <Card.Header>
                      <h6 className="mb-0">Quick Actions</h6>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-grid gap-2">
                        <Button variant="primary" onClick={() => setPhoneNumber(selectedClient.phone)}>
                          <FaPhone className="me-2" /> Call
                    </Button>
                        <Button variant="info" onClick={() => handleSendEmail(selectedClient.email)}>
                          <FaEnvelope className="me-2" /> Email
                        </Button>
                        <Button variant="success" onClick={() => handleStartMeeting(selectedClient)}>
                          <FaVideo className="me-2" /> Schedule Meeting
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Header>
                      <h6 className="mb-0">Notes</h6>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Group>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            value={selectedClient.notes}
                            onChange={(e) => setClientNotes(e.target.value)}
                            placeholder="Add notes about this client..."
                          />
                        </Form.Group>
                        <Button variant="primary" size="sm" className="mt-2">
                          Save Notes
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Header>
                      <h6 className="mb-0">Tags</h6>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedClient.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            bg="light" 
                            text="dark"
                          >
                            {tag}
                          </Badge>
                        ))}
                        <Button variant="outline-primary" size="sm">
                          <FaPlus /> Add Tag
                    </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClientProfile(false)}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} 