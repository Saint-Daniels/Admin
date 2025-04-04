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
  FaEdit, FaPalette, FaTrash, FaExchangeAlt, FaCheckCircle, FaSave, FaBackspace,
  FaMicrophone, FaStop, FaCheck
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Chat from '@/components/Chat';

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
  
  // Add hasActivePolicy state
  const [hasActivePolicy, setHasActivePolicy] = useState(false);
  
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

  // Add these to the existing state declarations at the top
  const [messages, setMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');

  // Add this state near the other state declarations
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  // Add notes state
  const [notes, setNotes] = useState([
    {
      date: '2024-03-15 14:30',
      type: 'Call',
      disposition: 'Follow-up Required',
      agent: 'John Smith',
      duration: '15 minutes',
      notes: 'Client expressed interest in premium package. Requested follow-up with detailed pricing.'
    },
    {
      date: '2024-03-15 11:45',
      type: 'Meeting',
      disposition: 'Completed',
      agent: 'Sarah Johnson',
      duration: '30 minutes',
      notes: 'Reviewed policy options. Client leaning towards standard coverage.'
    },
    {
      date: '2024-03-14 16:00',
      type: 'Email',
      disposition: 'Pending Response',
      agent: 'Mike Brown',
      duration: 'N/A',
      notes: 'Sent follow-up email with requested documentation. Awaiting client response.'
    }
  ]);

  // Add these state variables at the top with other state declarations
  const [hasCoverage, setHasCoverage] = useState(false);
  const [coverageType, setCoverageType] = useState('');
  const [savingStatus, setSavingStatus] = useState('');

  // Add these state variables at the top
  const [isDialing, setIsDialing] = useState(false);
  const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'dialing', 'connected'

  // Add new state variable for enrollment form phone
  const [enrollmentPhone, setEnrollmentPhone] = useState('');

  // Add new state variable for disposition
  const [selectedDisposition, setSelectedDisposition] = useState('');
  const [showDispositionModal, setShowDispositionModal] = useState(false);

  // Add new state variables for spouse and children
  const [showSpouseFields, setShowSpouseFields] = useState(false);
  const [showChildrenFields, setShowChildrenFields] = useState(false);
  const [children, setChildren] = useState([]);

  // Add state for multiple insurance coverages
  const [insuranceCoverages, setInsuranceCoverages] = useState([{}]);

  // Add new state variable for chat search
  const [chatSearchQuery, setChatSearchQuery] = useState('');

  // Add new state for search results dropdown
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessage, setChatMessage] = useState('');

  // Add state for SSN validation
  const [ssnValid, setSsnValid] = useState(false);
  const [ssn, setSsn] = useState('');

  // Add new state variables at the top
  const [isTimedIn, setIsTimedIn] = useState(false);
  const [timeInStart, setTimeInStart] = useState(null);
  const [totalTimeToday, setTotalTimeToday] = useState(0);

  // Add state for form completion tracking
  const [formCompletion, setFormCompletion] = useState({
    personalInfo: false,
    contactInfo: false,
    addressInfo: false,
    spouseInfo: false,
    childrenInfo: false,
    insuranceInfo: false
  });

  // Add new state variables at the top with other state declarations
  const [currentMeetingRoom, setCurrentMeetingRoom] = useState('Manager Room');
  const [isInMeeting, setIsInMeeting] = useState(false);

  // Add form validation function
  const validateForm = (data) => {
    const completion = {
      personalInfo: !!(data.firstName && data.lastName && data.dateOfBirth),
      contactInfo: !!(data.email && data.phone),
      addressInfo: !!(data.address && data.city && data.state && data.zipCode),
      spouseInfo: data.maritalStatus !== 'Married' || !!(data.spouseFirstName && data.spouseLastName),
      childrenInfo: data.children.length === 0 || data.children.every(child => child.firstName && child.lastName),
      insuranceInfo: !!(data.planName && data.deductible && data.premium)
    };
    setFormCompletion(completion);
  };

  // Modify handleInputChange to include validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      validateForm(newData);
      return newData;
    });
  };

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
      type: 'video',
      meetLink: 'https://meet.google.com/abc123'
    },
    { 
      title: 'Project Review', 
      time: new Date(new Date().setHours(14, 0)), 
      participants: 8,
      type: 'video',
      meetLink: 'https://meet.google.com/def456'
    },
    { 
      title: 'Sales Floor', 
      time: new Date(new Date().setHours(16, 0)), 
      participants: 8,
      type: 'video',
      meetLink: 'https://meet.google.com/def456'
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

  // Update the handleCall function
  const handleCall = () => {
    if (phoneNumber.length > 0) {
      setIsDialing(true);
      setCallStatus('dialing');
      setCallDuration(0);
      // Start call duration timer
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
      return () => clearInterval(interval);
    }
  };

  // Update the handleEndCall function
  const handleEndCall = () => {
    if (isDialing) {
      setShowDispositionModal(true);
    } else {
      setIsDialing(false);
      setCallStatus('idle');
    setCallDuration(0);
    }
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

  // Add this function near the other helper functions
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return `(${phoneNumber}`;
    if (phoneNumberLength < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Update the handleDialerInput function
  const handleDialerInput = (key) => {
    if (phoneNumber.replace(/[^\d]/g, '').length < 10) {
      setPhoneNumber(prev => {
        const newValue = prev.replace(/[^\d]/g, '') + key;
        return formatPhoneNumber(newValue);
      });
    }
  };

  // Function to handle input from dialer pad
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

  // Add this handler function before the return statement
  const handleAiSubmit = () => {
    if (!aiInput.trim()) return;
    
    // Add the user's message to the chat
    setMessages(prev => [...prev, aiInput]);
    
    // Clear the input
    setAiInput('');
    
    // Here you would typically make an API call to get the AI's response
    // For now, we'll just add a mock response
    setTimeout(() => {
      setMessages(prev => [...prev, "I'm here to help! However, I'm currently in demo mode."]);
    }, 1000);
  };

  const MeetingTime = ({ meeting, currentTime, timeUntil }) => {
    return (
      <p className="text-muted mb-1">
        <FaClock className="me-1" />
        {formatTime(meeting.time)} ({timeUntil <= 0 ? 'Started' : `in ${timeUntil} min`})
      </p>
    );
  };

  // Add this function before the return statement
  const handleSave = async (type) => {
    setSavingStatus('saving');
    try {
      // Here you would typically make an API call to save the data
      // For now, we'll simulate a save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update coverage status based on the form data
      if (coverageType) {
        setHasCoverage(true);
      }
      
      setSavingStatus('saved');
      setTimeout(() => setSavingStatus(''), 2000);
    } catch (error) {
      console.error('Error saving:', error);
      setSavingStatus('error');
      setTimeout(() => setSavingStatus(''), 2000);
    }
  };

  // Add a function to add a new child
  const addChild = () => {
    setChildren(prev => [...prev, { firstName: '', lastName: '', dob: '' }]);
  };

  // Add a function to remove a child
  const removeChild = (index) => {
    setChildren(prev => prev.filter((_, i) => i !== index));
  };

  // Add a function to update a child's information
  const updateChild = (index, field, value) => {
    const newChildren = [...children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    setChildren(newChildren);
  };

  // Format SSN as user types (###-##-####)
  const formatSSN = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Check if SSN is valid (9 digits)
    setSsnValid(digits.length === 9);
    
    // Add dashes after the 3rd and 5th digits
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
    }
  };

  // Add styles for chat container
  const chatStyles = {
    searchContainer: {
      position: 'relative',
      marginBottom: '1rem'
    },
    searchInput: {
      paddingLeft: '40px',
      borderLeft: 'none',
      width: '100%'
    },
    searchIcon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 4,
      color: '#6c757d'
    }
  };

  // Update the chat section with new search functionality
  const renderChatSection = () => (
    <div className="dashboard-card">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FaComments className="me-2" /> Chat
          </h5>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="chat-container">
          <div className="chat-search p-3 border-bottom" style={chatStyles.searchContainer}>
            <FaSearch style={chatStyles.searchIcon} />
            <div className="position-relative">
              <Form.Control
                type="search"
                placeholder="Search contacts..."
                style={chatStyles.searchInput}
                value={chatSearchQuery}
                onChange={(e) => {
                  setChatSearchQuery(e.target.value);
                  if (e.target.value.length > 0) {
                    const results = clients.filter(client => 
                      client.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      client.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      client.phone.includes(e.target.value)
                    );
                    setSearchResults(results);
                    setShowSearchResults(true);
                  } else {
                    setShowSearchResults(false);
                    setSearchResults([]);
                  }
                }}
                onBlur={() => {
                  // Delay hiding the results to allow for clicking
                  setTimeout(() => setShowSearchResults(false), 200);
                }}
                onFocus={() => {
                  if (chatSearchQuery.length > 0) {
                    setShowSearchResults(true);
                  }
                }}
              />
              {showSearchResults && searchResults.length > 0 && (
                <div className="search-results-dropdown position-absolute w-100 bg-white border rounded-bottom shadow-sm" 
                     style={{ top: '100%', zIndex: 1000, maxHeight: '300px', overflowY: 'auto' }}>
                  {searchResults.map((result, index) => (
                    <div 
                      key={index}
                      className="search-result-item p-2 border-bottom hover-bg-light cursor-pointer"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedClient(result);
                        setShowClientProfile(true);
                        setShowSearchResults(false);
                        setChatSearchQuery('');
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          <FaUserCircle size={24} />
                        </div>
                        <div>
                          <div className="fw-bold">{result.name}</div>
                          <div className="text-muted small">{result.email}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="chat-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {recentChats.map((chat, index) => (
              <div 
                key={index} 
                className="chat-item p-3 border-bottom hover-bg-light cursor-pointer"
                onClick={() => handleOpenChat(chat)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="chat-avatar me-3">
                      <FaUserCircle size={32} />
                    </div>
                    <div>
                      <h6 className="mb-1">{chat.name}</h6>
                      <p className="text-muted small mb-0">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-muted small me-2">{chat.time}</span>
                    {chat.unread && (
                      <Badge bg="primary" className="me-2">New</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </div>
  );

  const handleOpenChat = (chat) => {
    setSelectedChat(chat);
    setShowChatModal(true);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim() && selectedChat) {
      // Here you would typically send the message to your backend
      // For now, we'll just update the UI
      setSelectedChat(prev => ({
        ...prev,
        messages: [...(prev.messages || []), {
          text: chatMessage,
          sender: 'me',
          timestamp: new Date().toLocaleTimeString()
        }]
      }));
      setChatMessage('');
    }
  };

  return (
    <div className="office-container">
      <style jsx>{`
        @media (max-width: 768px) {
          .dialer-content-wrapper {
            flex-direction: column;
          }
          .dialer-pad-section {
            order: 1;
            width: 100%;
            max-width: 100%;
            margin-bottom: 1rem;
          }
          .enrollment-section {
            order: 2;
          }
        }

        .form-control:not(:placeholder-shown) {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 1px #3b82f6 !important;
          background-color: #f8fafc !important;
        }

        .completion-indicator {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6b7280;
          z-index: 1000;
        }

        .completion-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 4px;
        }

        .completion-dot.complete {
          background-color: #3b82f6;
        }

        .completion-dot.incomplete {
          background-color: #e5e7eb;
        }

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        .pulse {
          animation: pulse 1.5s infinite;
        }

        .meeting-room-indicator {
          background-color: #0dcaf0;
          color: white;
          transition: all 0.3s ease;
        }

        .meeting-room-indicator:hover {
          background-color: #0bb5d8;
        }

        .meeting-room-indicator.active {
          background-color: #0bb5d8;
          box-shadow: 0 0 0 2px rgba(13, 202, 240, 0.25);
        }
      `}</style>
      <Container fluid>
        <div className="workspace-header">
          <div className="welcome-section">
            <h1>Office Workspace</h1>
            <p className="text-muted">Welcome back! Here's your overview for today</p>
          </div>
          <div className="quick-actions">
            {/* Meeting Room Status */}
            <div className="status-indicators d-flex align-items-center gap-2 me-3">
              {/* Meeting Room Status */}
              <Button 
                variant="info" 
                size="sm"
                className={`d-flex align-items-center gap-2 meeting-room-indicator ${isInMeeting ? 'active' : ''}`}
                onClick={() => setIsInMeeting(!isInMeeting)}
              >
                <FaVideo className={isInMeeting ? "pulse" : ""} />
                <span className="status-text">
                  {currentMeetingRoom}
                </span>
                {isInMeeting && (
                  <Badge bg="light" text="dark" className="ms-1 px-2">Live</Badge>
                )}
              </Button>

              {/* Phone Status */}
              <Button 
                variant={isDialing ? "danger" : "outline-secondary"} 
                size="sm"
                className="d-flex align-items-center gap-2"
                onClick={() => setActiveTab('dialer')}
              >
                <FaPhone className={isDialing ? "pulse" : ""} />
                <span className="status-text">
                  {isDialing ? "On Call" : "Ready"}
                </span>
                {isDialing && (
                  <span className="call-duration">{formatDuration(callDuration)}</span>
                )}
              </Button>
            </div>

            {/* Disposition Modal */}
            <Modal show={showDispositionModal} onHide={() => setShowDispositionModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Call Disposition Required</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Disposition</Form.Label>
                    <Form.Select 
                      value={selectedDisposition} 
                      onChange={(e) => setSelectedDisposition(e.target.value)}
                    >
                      <option value="">Select a disposition</option>
                      <option value="sold">Sold Enrollment</option>
                      <option value="not_interested">Not Interested</option>
                      <option value="has_plan">Already Has Plan</option>
                      <option value="not_qualified">Does Not Qualify</option>
                      <option value="angry">Angry/Unruly</option>
                      <option value="thinking">Wants to Think About It</option>
                      <option value="wrong_number">Wrong Number</option>
                      <option value="bad_connection">Bad Connection</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="Add any additional notes about the call..."
                      value={dispositionNotes}
                      onChange={(e) => setDispositionNotes(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                {selectedDisposition === 'sold' && (
                  <div className="alert alert-success mt-3">
                    <FaCheckCircle className="me-2" />
                    Congratulations! Enrollment successfully recorded.
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDispositionModal(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    if (selectedDisposition) {
                      // Save the disposition
                      setNotes(prev => [...prev, {
                        date: new Date().toLocaleString(),
                        type: 'Call',
                        disposition: selectedDisposition,
                        agent: 'John Doe',
                        duration: formatDuration(callDuration),
                        notes: dispositionNotes
                      }]);
                      
                      // End the call and reset call state
                      setIsDialing(false);
                      setCallStatus('idle');
                      setCallDuration(0);
                      setPhoneNumber('');
                      
                      // Close the modal and reset form
                      setShowDispositionModal(false);
                      setSelectedDisposition('');
                      setDispositionNotes('');
                    }
                  }}
                  disabled={!selectedDisposition}
                >
                  End Call
                </Button>
              </Modal.Footer>
            </Modal>

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
          <Nav.Item>
            <Nav.Link active={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>
              <FaComments className="me-2" /> Chat
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {activeTab === 'home' && (
          <div className="dashboard-grid">
            {/* Meetings Section */}
            <Card className="dashboard-card meetings-section mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <FaVideo className="me-2" /> Upcoming Schedule
                </h5>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => window.open('https://meet.google.com/abc123', '_blank')}
                >
                  <FaVideo className="me-1" /> Main Office
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="meetings-container">
                  <div className="meetings-list">
                    {upcomingMeetings.map((meeting, index) => {
                      const timeUntil = Math.round((meeting.time - currentTime) / (1000 * 60));
                      const isStartingSoon = timeUntil <= 30 && timeUntil > 0;
                      const isInProgress = timeUntil <= 0 && timeUntil > -meeting.duration;
                      
                      return (
                        <div key={index} className={`meeting-item ${meeting.type} ${isStartingSoon ? 'starting-soon' : ''} ${isInProgress ? 'in-progress' : ''}`}>
                          <div className="meeting-content">
                            <div className="meeting-header">
                              <h6>{meeting.title}</h6>
                              {meeting.title !== "Team Standup" && meeting.title !== "Project Review" && meeting.title !== "Sales Floor" && meeting.type === 'video' && (
                                <Badge bg="primary" className="meeting-type-badge">
                                  VIDEO
                                </Badge>
                              )}
                              {meeting.title !== "Client Meeting" && meeting.type === 'in-person' && (
                                <Badge bg="success" className="meeting-type-badge">
                                  IN-PERSON
                                </Badge>
                              )}
                            </div>
                            <div className="meeting-details">
                              <MeetingTime meeting={meeting} currentTime={currentTime} timeUntil={timeUntil} />
                              <div className="meeting-participants">
                                <FaUsers className="me-2" />
                                {meeting.participants} participants
                              </div>
                            </div>
                          </div>
                          {meeting.title === "Team Standup" || meeting.title === "Project Review" || meeting.title === "Sales Floor" ? (
                            <Button 
                              variant="primary"
                              size="sm"
                              className="px-3"
                              onClick={() => {
                                if (meeting.meetLink) {
                                  window.open(meeting.meetLink, '_blank');
                                }
                              }}
                            >
                              Join Now
                            </Button>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Calendar Section */}
            <Card className="dashboard-card calendar-preview mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-4">
                    <h5 className="mb-0">
                      <FaCalendar className="me-2" /> Calendar
                    </h5>
                    <div className="analog-clock" style={{ width: '40px', height: '40px', position: 'relative', border: '2px solid #3b82f6', borderRadius: '50%', backgroundColor: '#f0f7ff' }}>
                      <div className="clock-marking marking-12" style={{ position: 'absolute', width: '2px', height: '8px', background: '#3b82f6', left: '50%', transform: 'translateX(-50%)', top: '2px' }}></div>
                      <div className="clock-marking marking-3" style={{ position: 'absolute', width: '8px', height: '2px', background: '#3b82f6', right: '2px', top: '50%', transform: 'translateY(-50%)' }}></div>
                      <div className="clock-marking marking-6" style={{ position: 'absolute', width: '2px', height: '8px', background: '#3b82f6', left: '50%', transform: 'translateX(-50%)', bottom: '2px' }}></div>
                      <div className="clock-marking marking-9" style={{ position: 'absolute', width: '8px', height: '2px', background: '#3b82f6', left: '2px', top: '50%', transform: 'translateY(-50%)' }}></div>
                      <div 
                        className="clock-hand hour-hand" 
                        style={{ 
                          position: 'absolute',
                          width: '2px',
                          height: '12px',
                          background: '#2563eb',
                          bottom: '50%',
                          left: '50%',
                          transformOrigin: 'bottom',
                          transform: `rotate(${((currentTime.getHours() % 12) * 30) + (currentTime.getMinutes() * 0.5)}deg) translateX(-50%)`
                        }}
                      ></div>
                      <div 
                        className="clock-hand minute-hand" 
                        style={{ 
                          position: 'absolute',
                          width: '1.5px',
                          height: '16px',
                          background: '#3b82f6',
                          bottom: '50%',
                          left: '50%',
                          transformOrigin: 'bottom',
                          transform: `rotate(${currentTime.getMinutes() * 6}deg) translateX(-50%)`
                        }}
                      ></div>
                      <div 
                        className="clock-hand second-hand" 
                        style={{ 
                          position: 'absolute',
                          width: '1px',
                          height: '18px',
                          background: '#60a5fa',
                          bottom: '50%',
                          left: '50%',
                          transformOrigin: 'bottom',
                          transform: `rotate(${currentTime.getSeconds() * 6}deg) translateX(-50%)`
                        }}
                      ></div>
                      <div className="clock-center" style={{ position: 'absolute', width: '4px', height: '4px', background: '#2563eb', borderRadius: '50%', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Button 
                      variant={isTimedIn ? "success" : "outline-secondary"} 
                      size="sm"
                      className="d-flex align-items-center gap-2"
                      onClick={() => {
                        if (!isTimedIn) {
                          setIsTimedIn(true);
                          setTimeInStart(new Date());
                        } else {
                          setIsTimedIn(false);
                          if (timeInStart) {
                            const endTime = new Date();
                            const duration = (endTime - timeInStart) / 1000;
                            setTotalTimeToday(prev => prev + duration);
                          }
                          setTimeInStart(null);
                        }
                      }}
                    >
                      <FaClock className={isTimedIn ? "text-white" : ""} />
                      <span className="status-text">
                        {isTimedIn ? "Clock Out" : "Clock In"}
                      </span>
                      {isTimedIn && timeInStart && (
                        <span className="time-duration">
                          ({formatDuration(Math.floor((new Date() - timeInStart) / 1000))})
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
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
                          onClick={() => {
                            if (hasEvents) {
                              setSelectedDate(day);
                              setSelectedDateEvents([
                                {
                                  title: 'Team Training',
                                  time: '10:00 AM',
                                  type: 'Training',
                                  participants: 12
                                },
                                {
                                  title: 'Department Meeting',
                                  time: '2:00 PM',
                                  type: 'Meeting',
                                  participants: 8
                                }
                              ]);
                              setShowEventsModal(true);
                            }
                          }}
                          style={{ cursor: hasEvents ? 'pointer' : 'default' }}
                        >
                          {day}
                          {hasEvents && <div className="event-indicator"></div>}
                        </div>
                      );
                    })}
                  </div>
                              </div>
              </Card.Body>
            </Card>

            {/* Events Modal */}
            <Modal
              show={showEventsModal}
              onHide={() => setShowEventsModal(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Events for March {selectedDate}, 2025</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="events-list">
                  {selectedDateEvents.map((event, index) => (
                    <div key={index} className="event-item p-3 border rounded mb-2">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{event.title}</h6>
                              <p className="text-muted mb-1">
                            <FaClock className="me-1" /> {event.time}
                          </p>
                          <div className="d-flex align-items-center">
                            <FaUsers className="me-1" />
                            <span className="text-muted">{event.participants} participants</span>
                              </div>
                            </div>
                        <Badge bg="info">{event.type}</Badge>
                          </div>
                    </div>
                  ))}
                  </div>
              </Modal.Body>
            </Modal>

            {/* Email Preview Section */}
            <Card className="dashboard-card mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <FaEnvelope className="me-2" /> Email
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
                          <h6 className="mb-0">Initial Greeting Script</h6>
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
                          <p className="mb-3">"Hello, this is [Your Name] calling from [Company Name]. How are you today? I'm reaching out to discuss your current insurance coverage and explore how we might be able to help you save money while maintaining or improving your coverage."</p>
                        </div>
                      </div>

                      <div className="note-card p-3 border-0 rounded-3 shadow-sm mb-3" style={{ backgroundColor: '#e6f3ff' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Objection Handling Script</h6>
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
                          <p className="mb-2">"I understand your concern about [specific objection]. Many of our clients had similar concerns before they saw how our solutions could help them. Would you be open to a brief conversation about how we've helped others in similar situations?"</p>
                        </div>
                      </div>

                      <div className="note-card p-3 border-0 rounded-3 shadow-sm" style={{ backgroundColor: '#e6ffe6' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Closing Script</h6>
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
                          <p className="mb-2">"Based on our conversation, I believe we can provide you with [specific benefit]. Would you like to proceed with setting up a time to review the details and get started? I can schedule a follow-up call for [specific time] to go over everything in detail."</p>
                        </div>
                      </div>
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
                  <p>Ask me anything about your workspace or get help with tasks</p>
                  <div className="ai-chat-container">
                    <div className="ai-message">
                      <div className="ai-avatar">
                        <FaRobot />
                    </div>
                      <div className="ai-message-content">
                        Hello! I'm your AI assistant. How can I help you today?
                      </div>
                          </div>
                    {messages.map((message, index) => (
                      <div key={index} className="ai-message">
                        <div className="ai-avatar">
                          <FaRobot />
                      </div>
                        <div className="ai-message-content">
                          {message}
                          </div>
                        </div>
                      ))}
                    </div>
                  <div className="input-group">
                    <input
                            type="text"
                      className="form-control"
                      placeholder="Type your question here..."
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAiSubmit();
                        }
                      }}
                    />
                    <button 
                      className="btn btn-primary" 
                      type="button"
                      onClick={handleAiSubmit}
                    >
                            <FaPaperPlane />
                    </button>
                        </div>
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
          <div className="dialer-page-container">
            <div className="dialer-content-wrapper d-flex flex-column flex-md-row">
              {/* Dialer Pad - Now first in mobile view */}
              <div className="dialer-pad-section order-1 order-md-2" style={{ width: '100%', maxWidth: '400px' }}>
                <Card>
                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <FaPhone className="me-2" /> Dialer Pad
                      </h5>
                      <Form.Select
                        value={agentDisposition}
                        onChange={(e) => setAgentDisposition(e.target.value)}
                        className="form-select-sm"
                        style={{ width: '120px' }}
                      >
                        <option value="active">Active</option>
                        <option value="break">On Break</option>
                        <option value="meeting">In Meeting</option>
                      </Form.Select>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="dialer-pad-container">
                          {/* Dialer Display */}
                        <Form.Control
                          type="tel"
                          value={phoneNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^\d]/g, '');
                              if (value.length <= 10) {
                                setPhoneNumber(formatPhoneNumber(value));
                              }
                            }}
                            onKeyPress={(e) => {
                              if (!/[\d]/.test(e.key) || (phoneNumber.replace(/[^\d]/g, '').length >= 10)) {
                                e.preventDefault();
                              }
                            }}
                            placeholder="(555) 555-5555"
                            className="text-center form-control-lg mb-3"
                          />
                          
                          {/* Call Status Display */}
                          {callStatus !== 'idle' && (
                            <div className="call-status-indicator text-center mb-3">
                              {callStatus === 'dialing' && (
                                <Badge bg="warning" className="px-3 py-2">
                                  <FaPhone className="me-2" /> Dialing...
                                </Badge>
                              )}
                              {callStatus === 'connected' && (
                                <Badge bg="success" className="px-3 py-2">
                                  <FaPhone className="me-2" /> Connected - {formatDuration(callDuration)}
                                </Badge>
                              )}
                    </div>
                          )}

                          {/* Dialer Grid */}
                        <div className="dialer-grid">
                          {[
                              '1', '2', '3',
                              '4', '5', '6',
                              '7', '8', '9',
                              '*', '0', '#'
                          ].map((key) => (
                            <Button
                                key={key}
                              variant="light"
                              className="dialer-key"
                                onClick={() => !isDialing && handleDialerInput(key)}
                                disabled={isDialing}
                              >
                                <div className="key-content">
                                  <span className="key-number">{key}</span>
                                  {key === '2' && <span className="key-letters">ABC</span>}
                                  {key === '3' && <span className="key-letters">DEF</span>}
                                  {key === '4' && <span className="key-letters">GHI</span>}
                                  {key === '5' && <span className="key-letters">JKL</span>}
                                  {key === '6' && <span className="key-letters">MNO</span>}
                                  {key === '7' && <span className="key-letters">PQRS</span>}
                                  {key === '8' && <span className="key-letters">TUV</span>}
                                  {key === '9' && <span className="key-letters">WXYZ</span>}
                                  {key === '0' && <span className="key-letters">+</span>}
                                </div>
                            </Button>
                          ))}
                        </div>

                          {/* Call Action Buttons */}
                          <div className="dialer-actions mt-3 d-flex justify-content-between">
                            {!isDialing ? (
                              <>
                          <Button
                            variant="danger"
                                  className="action-button"
                                  onClick={handleDialerClear}
                          >
                                  <FaTimes />
                          </Button>
                          <Button
                            variant="success"
                                  className="action-button"
                                  onClick={handleCall}
                                  disabled={phoneNumber.length === 0}
                          >
                            <FaPhone />
                          </Button>
                          <Button
                            variant="secondary"
                                  className="action-button"
                                  onClick={() => setPhoneNumber(prev => prev.slice(0, -1))}
                                  disabled={phoneNumber.length === 0}
                          >
                                  <FaBackspace />
                          </Button>
                              </>
                            ) : (
                              <Button 
                                variant="danger" 
                                className="action-button mx-auto"
                                onClick={handleEndCall}
                              >
                                <FaPhone className="rotate-135" />
                              </Button>
                            )}
                        </div>

                          {/* Transfer Button */}
                          {isDialing && (
                          <Button 
                            variant="info" 
                              className="w-100 mt-3 transfer-button"
                              onClick={() => {/* Handle transfer */}}
                          >
                            <FaExchangeAlt className="me-2" /> Transfer Call
                          </Button>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                      </div>

              {/* Enrollment Application - Now second in mobile view */}
              <div className="enrollment-section order-2 order-md-1">
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Enrollment Application</h5>
                  </Card.Header>
                  <Card.Body>
                    {/* Search Bar */}
                    <div className="mb-4">
                      <Form.Group>
                        <div className="input-group">
                          <Form.Control
                            type="text"
                            placeholder="Search applicants by name, phone, or email..."
                            className="form-control-lg"
                          />
                          <Button variant="primary">
                            <FaSearch className="me-2" />
                            Search
                          </Button>
                        </div>
                      </Form.Group>
                    </div>

                    {/* Enrollment Form */}
                    <Form>
                      {/* Lead Source Indicator */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Lead Source</h6>
                        <div className="lead-source-indicator p-3 border rounded">
                          <div className="d-flex align-items-center">
                            <div className="lead-source-icon me-3">
                              <FaUserPlus size={24} className="text-primary" />
                            </div>
                            <div>
                              <h6 className="mb-1">Direct Lead</h6>
                              <p className="text-muted mb-0">Added through direct contact</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Personal Information */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Personal Information</h6>
                        <Row>
                          <Col md={3}>
                            <Form.Group className="mb-3">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control type="text" placeholder="Enter first name" />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mb-3">
                              <Form.Label>Middle Name</Form.Label>
                              <Form.Control type="text" placeholder="Enter middle name" />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mb-3">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control type="text" placeholder="Enter last name" />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mb-3">
                              <Form.Label>Suffix</Form.Label>
                              <Form.Select>
                                <option value="">Select suffix (if applicable)</option>
                                <option value="jr">Jr.</option>
                                <option value="sr">Sr.</option>
                                <option value="ii">II</option>
                                <option value="iii">III</option>
                                <option value="iv">IV</option>
                                <option value="v">V</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control type="date" />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control 
                                type="tel"
                                value={enrollmentPhone}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/[^\d]/g, '');
                                  if (value.length <= 11) {
                                    setEnrollmentPhone(value);
                                  }
                                }}
                                placeholder="Enter phone number"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      {/* Tax Filing Status */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Tax Filing Status</h6>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Tax Filing Status</Form.Label>
                              <Form.Select>
                                <option value="">Select filing status</option>
                                <option value="single">Single</option>
                                <option value="head_of_household">Head of Household</option>
                                <option value="married_jointly">Married Filing Jointly</option>
                                <option value="married_separately">Married Filing Separately</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Marital Status</Form.Label>
                              <Form.Select>
                                <option value="">Select marital status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      {/* Spouse Information */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Spouse Information</h6>
                        <Form.Check
                          type="checkbox"
                          label="I have a spouse to include in the application"
                          className="mb-3"
                          onChange={(e) => setShowSpouseFields(e.target.checked)}
                        />
                        {showSpouseFields && (
                          <div className="spouse-fields p-3 border rounded">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h6 className="mb-0">Spouse Details</h6>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => setShowSpouseFields(false)}
                              >
                                <FaTrash className="me-2" /> Remove
                              </Button>
                            </div>
                            <Row>
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Spouse First Name</Form.Label>
                                  <Form.Control type="text" placeholder="Enter spouse's first name" />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Spouse Last Name</Form.Label>
                                  <Form.Control type="text" placeholder="Enter spouse's last name" />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Spouse Date of Birth</Form.Label>
                                  <Form.Control type="date" />
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                        )}
                      </div>

                      {/* Children Information */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Children Information</h6>
                        <Form.Check
                          type="checkbox"
                          label="I have children to include in the application"
                          className="mb-3"
                          onChange={(e) => setShowChildrenFields(e.target.checked)}
                        />
                        {showChildrenFields && (
                          <div className="children-fields p-3 border rounded">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h6 className="mb-0">Children Details</h6>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => setShowChildrenFields(false)}
                              >
                                <FaTrash className="me-2" /> Remove
                              </Button>
                            </div>
                            <div className="children-list">
                              {children.map((child, index) => (
                                <div key={index} className="child-entry p-3 border rounded mb-3">
                                  <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="mb-0">Child {index + 1}</h6>
                                    <Button 
                                      variant="outline-danger" 
                                      size="sm"
                                      onClick={() => removeChild(index)}
                                    >
                                      <FaTrash />
                                    </Button>
                                  </div>
                                  <Row>
                                    <Col md={4}>
                                      <Form.Group className="mb-3">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control 
                                          type="text" 
                                          placeholder="Enter child's first name"
                                          value={child.firstName}
                                          onChange={(e) => updateChild(index, 'firstName', e.target.value)}
                                        />
                                      </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                      <Form.Group className="mb-3">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control 
                                          type="text" 
                                          placeholder="Enter child's last name"
                                          value={child.lastName}
                                          onChange={(e) => updateChild(index, 'lastName', e.target.value)}
                                        />
                                      </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                      <Form.Group className="mb-3">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control 
                                          type="date"
                                          value={child.dob}
                                          onChange={(e) => updateChild(index, 'dob', e.target.value)}
                                        />
                                      </Form.Group>
                                    </Col>
                                  </Row>
                                </div>
                              ))}
                            </div>
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              className="mt-2"
                              onClick={addChild}
                            >
                              <FaPlus className="me-2" /> Add Child
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Residential Address */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Residential Address</h6>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Street Address</Form.Label>
                              <Form.Control type="text" placeholder="Enter street address" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>City</Form.Label>
                              <Form.Control type="text" placeholder="Enter city" />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>State/Province</Form.Label>
                              <Form.Control type="text" placeholder="Enter state/province" />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>ZIP Code</Form.Label>
                              <Form.Control type="text" placeholder="Enter ZIP code" />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      {/* Mailing Address */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Mailing Address</h6>
                        <Form.Check
                          type="checkbox"
                          label="Same as residential address"
                          className="mb-3"
                        />
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Street Address</Form.Label>
                              <Form.Control type="text" placeholder="Enter mailing address" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>City</Form.Label>
                              <Form.Control type="text" placeholder="Enter city" />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>State/Province</Form.Label>
                              <Form.Control type="text" placeholder="Enter state/province" />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>ZIP Code</Form.Label>
                              <Form.Control type="text" placeholder="Enter ZIP code" />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      {/* Country of Origin */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Country of Origin</h6>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Country of Origin</Form.Label>
                              <Form.Control type="text" placeholder="Enter country of origin" />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>State/Province of Origin</Form.Label>
                              <Form.Control type="text" placeholder="Enter state/province of origin" />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      {/* Employment Information */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Employment Information</h6>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Occupation</Form.Label>
                              <Form.Control type="text" placeholder="Enter occupation" />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Expected Annual Salary</Form.Label>
                              <Form.Control type="number" placeholder="Enter expected annual salary" />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      {/* Social Security Number */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Social Security Number</h6>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Social Security Number (SSN)</Form.Label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text bg-light">SSN</span>
                                </div>
                                <Form.Control 
                                  type="text" 
                                  placeholder="Enter SSN (###-##-####)" 
                                  maxLength={11}
                                  value={ssn}
                                  onChange={(e) => {
                                    // Use the formatSSN function to format as the user types
                                    const formatted = formatSSN(e.target.value);
                                    setSsn(formatted);
                                  }}
                                />
                                {ssnValid && (
                                  <div className="input-group-append">
                                    <span className="input-group-text bg-success text-white">
                                      <FaCheck />
                                    </span>
                                  </div>
                                )}
                              </div>
                              <Form.Text className="text-muted">
                                <strong>Important:</strong> Verify the SSN is correct before submitting
                              </Form.Text>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      {/* Health Insurance Coverage */}
                      <div className="section mb-4">
                        <h6 className="mb-3 d-flex justify-content-between align-items-center">
                          <span>Health Insurance Coverage</span>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            onClick={() => setInsuranceCoverages([...insuranceCoverages, {}])}
                          >
                            <FaPlus className="me-1" /> Add Coverage
                          </Button>
                        </h6>
                        
                        {insuranceCoverages.map((coverage, index) => (
                          <div key={index} className="insurance-coverage-item mb-4 p-3 border rounded">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h6 className="mb-0">Coverage #{index + 1}</h6>
                              {index > 0 && (
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  onClick={() => {
                                    const updatedCoverages = [...insuranceCoverages];
                                    updatedCoverages.splice(index, 1);
                                    setInsuranceCoverages(updatedCoverages);
                                  }}
                                >
                                  <FaTrash className="me-1" /> Remove
                                </Button>
                              )}
                            </div>
                            <Row>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Insurance Provider</Form.Label>
                                  <Form.Select>
                                    <option value="">Select insurance provider</option>
                                    <option value="united">UnitedHealthcare</option>
                                    <option value="cigna">Cigna</option>
                                    <option value="ambetter">Ambetter</option>
                                    <option value="oscar">Oscar</option>
                                    <option value="aetna">Aetna</option>
                                    <option value="anthem">Anthem Blue Cross</option>
                                    <option value="kaiser">Kaiser Permanente</option>
                                    <option value="humana">Humana</option>
                                    <option value="molina">Molina Healthcare</option>
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Plan Name</Form.Label>
                                  <Form.Control type="text" placeholder="Enter plan name" />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Deductible</Form.Label>
                                  <Form.Control type="number" placeholder="Enter deductible amount" />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Premium</Form.Label>
                                  <Form.Control type="number" placeholder="Enter premium amount" />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Coverage Type</Form.Label>
                                  <Form.Select>
                                    <option value="">Select coverage type</option>
                                    <option value="aca">ACA Health</option>
                                    <option value="dental">Dental</option>
                                    <option value="vision">Vision</option>
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                        ))}
                      </div>

                      {/* Recording Verification */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Recording Verification</h6>
                        <div className="recording-status p-3 border rounded mb-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h6 className="mb-1">Call Recording Status</h6>
                              <p className="text-muted mb-0">Recording will be used for verification purposes</p>
                            </div>
                            <div className="recording-controls">
                              <Button variant="outline-primary" className="me-2">
                                <FaMicrophone className="me-2" /> Start Recording
                              </Button>
                              <Button variant="outline-danger">
                                <FaStop className="me-2" /> Stop Recording
                              </Button>
                            </div>
                          </div>
                          <div className="recording-timer mt-3">
                            <span className="text-muted">Recording Duration: 00:00</span>
                          </div>
                        </div>
                        <Form.Check
                          type="checkbox"
                          label="I confirm that the enrollment conversation has been recorded and verified"
                          className="mb-3"
                        />
                      </div>

                      {/* Add this at the bottom of the form, just before the Action Buttons section */}
                      <div className="completion-indicator">
                        <div className="d-flex align-items-center">
                          <span>Application Progress:</span>
                          <div className="d-flex gap-1 ms-2">
                            <div className={`completion-dot ${formCompletion.personalInfo ? 'complete' : 'incomplete'}`} title="Personal Information"></div>
                            <div className={`completion-dot ${formCompletion.contactInfo ? 'complete' : 'incomplete'}`} title="Contact Information"></div>
                            <div className={`completion-dot ${formCompletion.addressInfo ? 'complete' : 'incomplete'}`} title="Address Information"></div>
                            <div className={`completion-dot ${formCompletion.spouseInfo ? 'complete' : 'incomplete'}`} title="Spouse Information"></div>
                            <div className={`completion-dot ${formCompletion.childrenInfo ? 'complete' : 'incomplete'}`} title="Children Information"></div>
                            <div className={`completion-dot ${formCompletion.insuranceInfo ? 'complete' : 'incomplete'}`} title="Insurance Information"></div>
                          </div>
                          <span className="ms-2 text-sm">
                            {Object.values(formCompletion).every(v => v) ? 
                              'Application Complete' : 
                              'In Progress'}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="outline-secondary">
                          <FaHistory className="me-2" /> View History
                        </Button>
                        <div>
                          <Button variant="secondary" className="me-2" onClick={() => handleSave('draft')}>
                            <FaSave className="me-2" /> Save
                          </Button>
                          <Button variant="primary">
                            <FaCheckCircle className="me-2" /> Submit Application
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </div>

            {/* Notes section below */}
            <div className="notes-section mt-4">
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Notes & Disposition History</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="history-timeline" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {notes.map((note, index) => (
                      <div key={index} className="history-entry mb-3 p-3 border rounded">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="text-muted">{note.date}</span>
                              <Badge bg="info">{note.type}</Badge>
                              <Badge bg={note.disposition === 'Follow-up Required' ? 'warning' : 'secondary'}>
                                {note.disposition}
                              </Badge>
                            </div>
                            <div className="mt-1">
                              <small className="text-muted">
                                <FaUser className="me-1" /> {note.agent} • 
                                <FaClock className="ms-2 me-1" /> {note.duration}
                              </small>
                            </div>
                          </div>
                        </div>
                        <p className="mb-0">{note.notes}</p>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="dashboard-grid">
            {/* Time Tracking Overview Card */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaClock className="me-2" /> Time Tracking Overview
                  </h5>
                  <div className="d-flex gap-2">
                    <Form.Select size="sm" className="w-auto">
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </Form.Select>
                    <Button variant="outline-primary" size="sm">
                      <FaDownload className="me-1" /> Export
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="time-tracking-metrics" style={{ overflowX: 'auto' }}>
                  <div style={{ minWidth: '800px' }}>
                    <Row className="g-4">
                      <Col md={3}>
                        <div className="stat-card bg-primary bg-opacity-10 p-3 rounded h-100">
                          <h6 className="text-primary">Hours Today</h6>
                          <h3>7:45</h3>
                          <div className="d-flex align-items-center">
                            <small className="text-success me-2">On Track</small>
                            <small className="text-muted">15 min break</small>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="stat-card bg-success bg-opacity-10 p-3 rounded h-100">
                          <h6 className="text-success">Weekly Hours</h6>
                          <h3>32:15</h3>
                          <div className="d-flex align-items-center">
                            <small className="text-success me-2">+2hrs</small>
                            <small className="text-muted">vs target</small>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="stat-card bg-info bg-opacity-10 p-3 rounded h-100">
                          <h6 className="text-info">Productivity</h6>
                          <h3>92%</h3>
                          <div className="d-flex align-items-center">
                            <small className="text-success me-2">+5%</small>
                            <small className="text-muted">vs last week</small>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="stat-card bg-warning bg-opacity-10 p-3 rounded h-100">
                          <h6 className="text-warning">Break Time</h6>
                          <h3>45min</h3>
                          <div className="d-flex align-items-center">
                            <small className="text-success me-2">Within limit</small>
                            <small className="text-muted">15min left</small>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="time-tracking-details mt-4">
                  <Row>
                    <Col md={6}>
                      <div className="time-card p-3 border rounded h-100">
                        <h6 className="mb-3">Daily Activity</h6>
                        <div className="activity-timeline">
                          <div className="activity-item d-flex justify-content-between mb-2">
                            <span>Clock In</span>
                            <span className="text-success">8:00 AM</span>
                          </div>
                          <div className="activity-item d-flex justify-content-between mb-2">
                            <span>Morning Break</span>
                            <span className="text-warning">10:15 AM (15min)</span>
                          </div>
                          <div className="activity-item d-flex justify-content-between mb-2">
                            <span>Lunch Break</span>
                            <span className="text-warning">12:30 PM (30min)</span>
                          </div>
                          <div className="activity-item d-flex justify-content-between">
                            <span>Current Status</span>
                            <span className="text-primary">Active</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="time-card p-3 border rounded h-100">
                        <h6 className="mb-3">Weekly Hours Distribution</h6>
                        <div className="hours-distribution">
                          <div className="d-flex justify-content-between mb-2">
                            <span>Active Work</span>
                            <span className="text-success">35h 15m (88%)</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Breaks</span>
                            <span className="text-warning">3h 45m (9%)</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span>Training</span>
                            <span className="text-info">1h 15m (3%)</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>

            {/* Time Clock History Card */}
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaHistory className="me-2" /> Time Clock History
                  </h5>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="search"
                      placeholder="Search history..."
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
                      <th>Date</th>
                      <th>Clock In</th>
                      <th>Clock Out</th>
                      <th>Total Hours</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024-03-15</td>
                      <td>8:00 AM</td>
                      <td>4:45 PM</td>
                      <td>7:45</td>
                      <td><Badge bg="success">Completed</Badge></td>
                      <td>Regular shift</td>
                    </tr>
                    <tr>
                      <td>2024-03-14</td>
                      <td>8:15 AM</td>
                      <td>5:00 PM</td>
                      <td>7:45</td>
                      <td><Badge bg="success">Completed</Badge></td>
                      <td>Regular shift</td>
                    </tr>
                    <tr>
                      <td>2024-03-13</td>
                      <td>8:00 AM</td>
                      <td>4:30 PM</td>
                      <td>7:30</td>
                      <td><Badge bg="warning">Early Leave</Badge></td>
                      <td>Approved early departure</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Productivity Analytics Card */}
            <Card className="dashboard-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaChartLine className="me-2" /> Sales & Performance Analytics
                  </h5>
                  <Button variant="outline-primary" size="sm">
                    <FaChartBar className="me-1" /> Detailed Report
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <div className="productivity-card p-3 border rounded mb-3">
                      <h6 className="mb-3">Sales Performance</h6>
                      <div className="performance-stats">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Conversion Rate</span>
                          <span className="text-success">32%</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Avg Sale Value</span>
                          <span className="text-primary">$450</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Cost per Acquisition</span>
                          <span className="text-info">$125</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Revenue per Call</span>
                          <span className="text-warning">$145</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="productivity-card p-3 border rounded mb-3">
                      <h6 className="mb-3">Time Metrics</h6>
                      <div className="time-stats">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Avg Call Duration</span>
                          <span className="text-primary">8:30</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Time to Close</span>
                          <span className="text-success">12:45</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>First Response</span>
                          <span className="text-info">45s</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Talk-to-Listen Ratio</span>
                          <span className="text-warning">40:60</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="productivity-card p-3 border rounded mb-3">
                      <h6 className="mb-3">Quality Metrics</h6>
                      <div className="quality-stats">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Customer Satisfaction</span>
                          <span className="text-success">4.8/5</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Call Quality Score</span>
                          <span className="text-primary">92%</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Script Compliance</span>
                          <span className="text-info">95%</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Follow-up Rate</span>
                          <span className="text-warning">88%</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={6}>
                    <div className="productivity-card p-3 border rounded mb-3">
                      <h6 className="mb-3">Sales Funnel Analytics</h6>
                      <div className="funnel-stats">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Lead to Opportunity</span>
                          <span className="text-primary">45%</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Opportunity to Quote</span>
                          <span className="text-success">65%</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Quote to Close</span>
                          <span className="text-info">48%</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Overall Pipeline Velocity</span>
                          <span className="text-warning">3.2 days</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="productivity-card p-3 border rounded mb-3">
                      <h6 className="mb-3">Performance Trends</h6>
                      <div className="trend-stats">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Peak Performance Hours</span>
                          <span className="text-success">10AM - 2PM</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Best Performing Day</span>
                          <span className="text-primary">Wednesday</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Avg Deals per Day</span>
                          <span className="text-info">3.5</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Success Rate Trend</span>
                          <span className="text-warning">↑ 12% MoM</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={12}>
                    <div className="productivity-card p-3 border rounded">
                      <h6 className="mb-3">Real-Time Activity Indicators</h6>
                      <div className="activity-indicators">
                        <div className="d-flex flex-wrap gap-3">
                          <div className="indicator-item p-3 border rounded">
                            <div className="d-flex align-items-center">
                              <div className={`status-dot ${isTimedIn ? 'bg-success' : 'bg-secondary'} me-2`}></div>
                              <div>
                                <h6 className="mb-1">Time Clock Status</h6>
                                <p className="mb-0 text-muted">
                                  {isTimedIn ? `Active since ${timeInStart.toLocaleTimeString()}` : 'Not clocked in'}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="indicator-item p-3 border rounded">
                            <div className="d-flex align-items-center">
                              <div className={`status-dot ${isDialing ? 'bg-danger' : 'bg-success'} me-2`}></div>
                              <div>
                                <h6 className="mb-1">Call Status</h6>
                                <p className="mb-0 text-muted">
                                  {isDialing ? `On call (${formatDuration(callDuration)})` : 'Available'}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="indicator-item p-3 border rounded">
                            <div className="d-flex align-items-center">
                              <div className="status-dot bg-primary me-2"></div>
                              <div>
                                <h6 className="mb-1">Today's Progress</h6>
                                <p className="mb-0 text-muted">
                                  {`${totalTimeToday > 0 ? formatDuration(totalTimeToday) : '0:00'} / 8:00`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="dashboard-grid">
            {/* Support & Help Card */}
            <Card className="dashboard-card mb-4">
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
        {activeTab === 'chat' && renderChatSection()}
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
                          <FaComments className="me-2" /> Message
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
      
      {/* Chat Modal */}
      <Modal
        show={showChatModal}
        onHide={() => setShowChatModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex align-items-center">
              <div className="chat-avatar me-3">
                <FaUserCircle size={32} />
              </div>
              {selectedChat?.name}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="chat-messages" style={{ height: '400px', overflowY: 'auto' }}>
            {selectedChat?.messages?.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender === 'me' ? 'sent' : 'received'} mb-3`}
              >
                <div className="message-content p-2 rounded">
                  <p className="mb-0">{message.text}</p>
                  <small className="text-muted">{message.timestamp}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input mt-3">
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button variant="primary" onClick={handleSendMessage}>
                <FaPaperPlane />
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
} 