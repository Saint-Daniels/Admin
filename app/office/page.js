'use client';

import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Nav, Tab, Badge, Modal, Spinner } from 'react-bootstrap';
import { 
  // Navigation and UI icons
  FaPhone, FaUser, FaEnvelope, FaCalendar, FaChartLine, FaUsers, 
  FaSearch, FaClock, FaBell, FaCog, FaComments, FaHome, FaRobot,
  FaBuilding, FaBriefcase, FaTasks, FaFileAlt,
  
  // Communication icons
  FaSms, FaVideo, FaMapMarkerAlt, FaLink,
  
  // Status and action icons
  FaCloud, FaChartBar, FaCircle, FaPlus, FaTimes, 
  FaCoffee, FaRestroom, FaUtensils, FaGraduationCap,
  
  // File and document icons
  FaGoogleDrive, FaFolder, FaStar, FaEllipsisV, FaHashtag, FaPaperPlane,
  FaFileExcel, FaFilePowerpoint, FaFilePdf, FaFileWord, FaFilter,
  FaDownload, FaUpload,
  
  // User related icons
  FaUserCircle, FaUserFriends, FaSignOutAlt, FaCamera, FaShieldAlt,
  FaKey, FaVolumeUp, FaUserShield, FaUserCog, FaUserPlus,
  
  // Device and notification icons
  FaDesktop, FaMobile, FaTablet, FaBellSlash,
  
  // Action and state icons
  FaEdit, FaPalette, FaTrash, FaExchangeAlt, FaCheckCircle, 
  FaSave, FaBackspace, FaMicrophone, FaStop, FaCheck,
  
  // Call and connection icons
  FaMicrophoneSlash, FaInfoCircle, FaExclamationTriangle,
  FaPhoneSlash, FaSignInAlt, FaPhoneAlt,
  
  // Integration icons
  FaGoogle, FaHistory, FaSpinner
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

  // Add state for history modal
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Add state variables for active coverage
  const [activeCoverage, setActiveCoverage] = useState({
    isActive: false,
    enrollmentDate: null,
    coverageType: '',
    provider: ''
  });

  // Add state for admin mode
  const [isAdmin, setIsAdmin] = useState(false);

  // Add these state variables near the other state declarations
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSaved, setRecordingSaved] = useState(false);

  // Add these state variables near the other state declarations
  const [agentStatus, setAgentStatus] = useState('available');
  const [dispositionCategory, setDispositionCategory] = useState('lead_contact');

  // Add status code options
  const agentStatusCodes = [
    { value: 'available', label: 'Available / Ready', color: 'success' },
    { value: 'on_call', label: 'On Call', color: 'danger' },
    { value: 'wrap_up', label: 'Wrap-Up / After Call Work (ACW)', color: 'warning' },
    { value: 'break', label: 'Break', color: 'info' },
    { value: 'lunch', label: 'Lunch', color: 'info' },
    { value: 'meeting', label: 'Meeting', color: 'primary' },
    { value: 'training', label: 'Training', color: 'primary' },
    { value: 'admin', label: 'Admin Work', color: 'secondary' },
    { value: 'technical_issue', label: 'Technical Issue / System Down', color: 'danger' },
    { value: 'personal', label: 'Personal / Aux (Auxiliary time)', color: 'secondary' }
  ];

  // Add disposition code options
  const dispositionCodes = {
    lead_contact: [
      { value: 'interested_quote', label: 'Interested – Send Quote' },
      { value: 'interested_transfer', label: 'Interested – Transferred to Licensed Agent' },
      { value: 'not_interested', label: 'Not Interested' },
      { value: 'do_not_call', label: 'Do Not Call' },
      { value: 'callback', label: 'Call Back Later' },
      { value: 'voicemail', label: 'Left Voicemail' },
      { value: 'no_answer', label: 'No Answer' },
      { value: 'wrong_number', label: 'Disconnected / Wrong Number' }
    ],
    qualification: [
      { value: 'qualified_docs', label: 'Qualified – Awaiting Documents' },
      { value: 'qualified_submitted', label: 'Qualified – Application Submitted' },
      { value: 'not_qualified_age', label: 'Not Qualified – Age' },
      { value: 'not_qualified_income', label: 'Not Qualified – Income' },
      { value: 'has_insurance', label: 'Already Has Insurance' },
      { value: 'needs_spouse', label: 'Needs Spouse Approval' },
      { value: 'out_of_area', label: 'Out of Service Area' },
      { value: 'medicare_only', label: 'Medicare Only / Not ACA Eligible' }
    ],
    sales: [
      { value: 'sale_bound', label: 'Sale – Policy Bound' },
      { value: 'sale_pending', label: 'Sale – Payment Pending' },
      { value: 'sale_emailed', label: 'Sale – Policy Emailed' },
      { value: 'sale_followup', label: 'Sale – Follow-up Required' },
      { value: 'no_sale_declined', label: 'No Sale – Declined' },
      { value: 'no_sale_bad_info', label: 'No Sale – Bad Info' },
      { value: 'no_sale_competitor', label: 'No Sale – Lost to Competitor' }
    ]
  };

  // Add these state variables at the top with other state declarations
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    taxFilingStatus: '',
    maritalStatus: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    mailingAddress: '',
    mailingCity: '',
    mailingState: '',
    mailingZipCode: '',
    countryOfOrigin: '',
    stateOfOrigin: '',
    occupation: '',
    annualSalary: '',
    planName: '',
    deductible: '',
    premium: '',
    coverageType: '',
    spouseFirstName: '',
    spouseLastName: '',
    spouseDateOfBirth: '',
    hasVoiceRecording: false
  });

  // Add these state variables at the top
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isMailingSameAsResidential, setIsMailingSameAsResidential] = useState(false);

  // Update validateForm function
  const validateForm = () => {
    const errors = {};
    
    // Required fields by section
    const requiredFields = {
      personalInfo: {
        firstName: 'First Name',
        middleName: 'Middle Name',
        lastName: 'Last Name',
        dateOfBirth: 'Date of Birth',
        email: 'Email',
        phone: 'Phone Number',
        taxFilingStatus: 'Tax Filing Status',
        maritalStatus: 'Marital Status'
      },
      addressInfo: {
        address: 'Street Address',
        city: 'City',
        state: 'State',
        zipCode: 'ZIP Code'
      },
      mailingAddress: !isMailingSameAsResidential ? {
        mailingAddress: 'Mailing Street Address',
        mailingCity: 'Mailing City',
        mailingState: 'Mailing State',
        mailingZipCode: 'Mailing ZIP Code'
      } : {},
      originInfo: {
        countryOfOrigin: 'Country of Origin',
        stateOfOrigin: 'State/Province of Origin'
      },
      employmentInfo: {
        occupation: 'Occupation',
        annualSalary: 'Expected Annual Salary'
      },
      insuranceInfo: {
        planName: 'Plan Name',
        deductible: 'Deductible',
        premium: 'Premium',
        coverageType: 'Coverage Type'
      }
    };

    // Check each required field
    Object.entries(requiredFields).forEach(([section, fields]) => {
      Object.entries(fields).forEach(([field, label]) => {
        if (!formData[field] || formData[field].toString().trim() === '') {
          errors[field] = `${label} is required`;
        }
      });
    });

    // Special validation for email format
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Special validation for phone number format (assuming US format)
    if (formData.phone && !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number in (XXX) XXX-XXXX format';
    }

    // Special handling for spouse information if married
    if (formData.maritalStatus === 'married') {
      if (!formData.spouseFirstName?.trim()) errors.spouseFirstName = 'Spouse First Name is required';
      if (!formData.spouseLastName?.trim()) errors.spouseLastName = 'Spouse Last Name is required';
      if (!formData.spouseDateOfBirth?.trim()) errors.spouseDateOfBirth = 'Spouse Date of Birth is required';
    }

    // Check for voice recording
    if (!formData.hasVoiceRecording) {
      errors.voiceRecording = 'Voice recording verification is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Update handleInputChange to use the new formData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Update handleSave function to include validation
  const handleSave = async (type) => {
    if (type === 'submit') {
      if (!validateForm()) {
        setShowValidationModal(true);
        // If voice recording is missing, show the recording modal after a short delay
        if (!formData.hasVoiceRecording) {
          setTimeout(() => {
            setShowValidationModal(false);
            setShowVerificationModal(true);
          }, 2000);
        }
        return;
      }
      setIsSubmitting(true);
    } else {
      setIsDraftSaving(true);
    }
    
    setSavingStatus('saving');
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update coverage status based on the form data
      if (formData.coverageType) {
        setHasCoverage(true);
      }
      
      setSavingStatus(type === 'draft' ? 'draft-saved' : 'submitted');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSavingStatus('');
        setIsDraftSaving(false);
        setIsSubmitting(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving:', error);
      setSavingStatus('error');
      setIsDraftSaving(false);
      setIsSubmitting(false);
      setTimeout(() => setSavingStatus(''), 3000);
    }
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

  // Add effect to sync agent status across tabs
  useEffect(() => {
    // Update agent status when tab changes
    if (activeTab === 'dialer' && !isDialing) {
      setAgentStatus('available');
    }
  }, [activeTab]);

  // Add callTimer state
  const [callTimer, setCallTimer] = useState(null);

  // Update handleCall function
  const handleCall = async () => {
    // Check connection first
    if (!isConnected) {
      console.error('Cannot place call: Not connected to phone service');
      return;
    }

    if (phoneNumber.length > 0) {
      try {
        // Reset disposition completed flag when starting new call
        setDispositionCompleted(false);
        setIsDialing(true);
        setCallStatus('connected');
        setIsCallActive(true);
        
        // Start call duration timer
        const startTime = Date.now();
        const timer = setInterval(() => {
          const duration = Math.floor((Date.now() - startTime) / 1000);
          setCallDuration(duration);
        }, 1000);
        
        // Store the timer reference
        setCallTimer(timer);
        
        // Update agent status
        setAgentStatus('on_call');
      } catch (error) {
        console.error('Call failed:', error);
        handleEndCall();
      }
    }
  };

  // Update handleEndCall function
  const handleEndCall = async () => {
    try {
      // Show disposition modal
      setShowDispositionModal(true);
    } catch (error) {
      console.error('Error ending call:', error);
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

  // Add function to get status color and label based on disposition
  const getStatusFromDisposition = (category, disposition) => {
    // Handle non-call dispositions first
    switch (disposition) {
      case 'break':
        return { status: 'break', label: 'On Break', variant: 'warning' };
      case 'lunch':
        return { status: 'lunch', label: 'Lunch Break', variant: 'warning' };
      case 'meeting':
        return { status: 'meeting', label: 'In Meeting', variant: 'info' };
      case 'training':
        return { status: 'training', label: 'Training', variant: 'primary' };
      case 'admin':
        return { status: 'admin', label: 'Admin Work', variant: 'secondary' };
      case 'technical_issue':
        return { status: 'technical_issue', label: 'System Down', variant: 'danger' };
      case 'personal':
        return { status: 'personal', label: 'Personal Time', variant: 'secondary' };
    }

    // Lead Contact Results status mapping
    if (category === 'lead_contact') {
      switch (disposition) {
        case 'interested_quote':
        case 'interested_transfer':
          return { status: 'wrap_up-quote', label: 'Wrap-Up - Quote', variant: 'info' };
        case 'callback':
          return { status: 'wrap_up-callback', label: 'Wrap-Up - Callback', variant: 'purple' };
        case 'not_interested':
        case 'do_not_call':
          return { status: 'wrap_up-dnc', label: 'Wrap-Up - DNC', variant: 'danger' };
        case 'voicemail':
        case 'no_answer':
        case 'wrong_number':
          return { status: 'wrap_up-no-contact', label: 'Wrap-Up - No Contact', variant: 'secondary' };
        default:
          return { status: 'wrap_up', label: 'Wrap-Up', variant: 'warning' };
      }
    }
    // Qualification status mapping
    else if (category === 'qualification') {
      switch (disposition) {
        case 'qualified_docs':
        case 'qualified_submitted':
          return { status: 'wrap_up-qualified', label: 'Wrap-Up - Qualified', variant: 'success' };
        case 'not_qualified_age':
        case 'not_qualified_income':
          return { status: 'wrap_up-not-qualified', label: 'Wrap-Up - Not Qualified', variant: 'danger' };
        case 'has_insurance':
        case 'needs_spouse':
        case 'out_of_area':
        case 'medicare_only':
          return { status: 'wrap_up-not-eligible', label: 'Wrap-Up - Not Eligible', variant: 'warning' };
        default:
          return { status: 'wrap_up', label: 'Wrap-Up', variant: 'info' };
      }
    }
    // Sales status mapping
    else if (category === 'sales') {
      switch (disposition) {
        case 'sale_bound':
        case 'sale_pending':
        case 'sale_emailed':
          return { status: 'wrap_up-sale', label: 'Wrap-Up - Sale', variant: 'success' };
        case 'sale_followup':
          return { status: 'wrap_up-follow-up', label: 'Wrap-Up - Follow Up', variant: 'info' };
        case 'no_sale_declined':
        case 'no_sale_bad_info':
        case 'no_sale_competitor':
          return { status: 'wrap_up-no-sale', label: 'Wrap-Up - No Sale', variant: 'danger' };
        default:
          return { status: 'wrap_up', label: 'Wrap-Up', variant: 'warning' };
      }
    }
    return { status: 'wrap_up', label: 'Wrap-Up', variant: 'info' };
  };

  // WebRTC and Connection States
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // 'disconnected', 'connecting', 'connected'
  const [webrtcSession, setWebrtcSession] = useState(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const MAX_RECONNECT_ATTEMPTS = 3;

  // Connection monitoring
  useEffect(() => {
    let heartbeatInterval;

    if (isConnected) {
      heartbeatInterval = setInterval(() => {
        checkConnection();
      }, 5000); // Check connection every 5 seconds
    }

    return () => {
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
    };
  }, [isConnected]);

  // Connection status monitoring
  useEffect(() => {
    if (connectionStatus === 'disconnected' && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      handleReconnect();
    }
  }, [connectionStatus, reconnectAttempts]);

  // Connection handlers
  const handleConnect = async () => {
    try {
      setConnectionStatus('connecting');
      
      // Placeholder for WebRTC session initialization
      // This will be replaced with actual RingCentral SDK implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsConnected(true);
      setConnectionStatus('connected');
      setReconnectAttempts(0);
      
      // Initialize session monitoring
      startSessionMonitoring();
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionStatus('disconnected');
      handleConnectionError(error);
    }
  };

  const handleDisconnect = async () => {
    try {
      // Placeholder for WebRTC session cleanup
      if (webrtcSession) {
        // Clean up WebRTC session
        setWebrtcSession(null);
      }
      
      setIsConnected(false);
      setConnectionStatus('disconnected');
      setReconnectAttempts(0);
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  };

  const handleReconnect = async () => {
    try {
      setReconnectAttempts(prev => prev + 1);
      await handleConnect();
    } catch (error) {
      console.error('Reconnection failed:', error);
      setConnectionStatus('disconnected');
    }
  };

  const checkConnection = async () => {
    try {
      // Placeholder for connection check
      // This will be replaced with actual WebRTC session status check
      if (webrtcSession) {
        // Check session status
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setConnectionStatus('disconnected');
    }
  };

  const handleConnectionError = (error) => {
    // Handle different types of connection errors
    console.error('Connection error:', error);
    setIsConnected(false);
    setConnectionStatus('disconnected');
  };

  const startSessionMonitoring = () => {
    // Initialize WebRTC session monitoring
    // This will be replaced with actual RingCentral SDK implementation
  };

  // Update the recording save handler to set hasVoiceRecording
  const handleRecordingSave = () => {
    setIsRecording(false);
    setRecordingSaved(true);
    setFormData(prev => ({
      ...prev,
      hasVoiceRecording: true
    }));
    setTimeout(() => {
      setShowVerificationModal(false);
      setRecordingSaved(false);
    }, 2000);
  };

  const [dispositionCompleted, setDispositionCompleted] = useState(false);

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

              {/* Agent Status Button */}
              <Button 
                variant={
                  agentStatus === 'on_call' ? "danger" : 
                  agentStatus === 'break' || agentStatus === 'lunch' ? "warning" :
                  agentStatus === 'meeting' ? "info" :
                  agentStatus === 'training' ? "primary" :
                  agentStatus === 'admin' || agentStatus === 'personal' ? "secondary" :
                  agentStatus === 'technical_issue' ? "danger" :
                  agentStatus.startsWith('wrap_up') ? "warning" : 
                  "success"
                } 
                size="sm"
                className="d-flex align-items-center gap-2"
                onClick={() => {
                  if (!isDialing && agentStatus !== 'on_call') {
                    setActiveTab('dialer');
                    setAgentStatus('available');
                  }
                }}
                disabled={isDialing}
                data-status={agentStatus}
              >
                {agentStatus === 'on_call' ? <FaPhone className="pulse" /> :
                 agentStatus === 'break' || agentStatus === 'lunch' ? <FaCoffee /> :
                 agentStatus === 'meeting' ? <FaUsers /> :
                 agentStatus === 'training' ? <FaGraduationCap /> :
                 agentStatus === 'admin' ? <FaCog /> :
                 agentStatus === 'technical_issue' ? <FaExclamationTriangle /> :
                 agentStatus === 'personal' ? <FaUser /> :
                 <FaPhone />}
                <span className="status-text">
                  {agentStatus === 'on_call' ? "On Call" :
                   agentStatus === 'break' ? "On Break" :
                   agentStatus === 'lunch' ? "Lunch Break" :
                   agentStatus === 'meeting' ? "In Meeting" :
                   agentStatus === 'training' ? "Training" :
                   agentStatus === 'admin' ? "Admin Work" :
                   agentStatus === 'technical_issue' ? "System Down" :
                   agentStatus === 'personal' ? "Personal Time" :
                   agentStatus.startsWith('wrap_up') ? selectedDisposition ? 
                     getStatusFromDisposition(dispositionCategory, selectedDisposition).label : 
                     "Wrap-Up" : 
                   "Ready"}
                </span>
                {agentStatus === 'on_call' && (
                  <span className="call-duration">{formatDuration(callDuration)}</span>
                )}
              </Button>
            </div>

            {/* Disposition Modal */}
            <Modal 
              show={showDispositionModal} 
              onHide={() => {
                setShowDispositionModal(false);
                // Don't end the call if they cancel - keep it active
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Call Disposition</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Disposition Category</Form.Label>
                    <Form.Select 
                      value={dispositionCategory}
                      onChange={(e) => setDispositionCategory(e.target.value)}
                      className="mb-3"
                    >
                      <option value="lead_contact">Lead Contact Results</option>
                      <option value="qualification">Qualification Outcomes</option>
                      <option value="sales">Sales / Enrollment Outcomes</option>
                    </Form.Select>

                    <Form.Label>Select Disposition</Form.Label>
                    <Form.Select 
                      value={selectedDisposition} 
                      onChange={(e) => setSelectedDisposition(e.target.value)}
                    >
                      <option value="">Select a disposition</option>
                      {dispositionCodes[dispositionCategory].map((code) => (
                        <option key={code.value} value={code.value}>
                          {code.label}
                        </option>
                      ))}
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

                {selectedDisposition && selectedDisposition.startsWith('sale_') && (
                  <div className="alert alert-success mt-3">
                    <FaCheckCircle className="me-2" />
                    Sale recorded! Please complete the enrollment process.
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setShowDispositionModal(false);
                    // Don't end the call if they cancel - keep it active
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    if (selectedDisposition) {
                      // Get status from disposition
                      const newStatus = getStatusFromDisposition(dispositionCategory, selectedDisposition);
                      
                      // Save the disposition
                      setNotes(prev => [...prev, {
                        date: new Date().toLocaleString(),
                        type: 'Status Change',
                        disposition: dispositionCodes[dispositionCategory]?.find(code => code.value === selectedDisposition)?.label || selectedDisposition,
                        agent: 'John Doe',
                        duration: agentStatus === 'on_call' ? formatDuration(callDuration) : 'N/A',
                        notes: dispositionNotes
                      }]);
                      
                      // Now we can end the call since disposition is complete
                      if (callTimer) {
                        clearInterval(callTimer);
                        setCallTimer(null);
                      }
                      
                      // Reset all call states
                      setIsCallActive(false);
                      setIsDialing(false);
                      setCallStatus('idle');
                      setCallDuration(0);
                      
                      // Set agent status back to available/ready
                      setAgentStatus('available');
                      
                      // Close modal and reset form
                      setShowDispositionModal(false);
                      setSelectedDisposition('');
                      setDispositionNotes('');
                      setDispositionCategory('lead_contact');
                      
                      // Reset phone number
                      setPhoneNumber('');
                    }
                  }}
                  disabled={!selectedDisposition}
                >
                  Submit & End Call
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
                        value={agentStatus}
                        onChange={(e) => setAgentStatus(e.target.value)}
                        className="form-select-sm"
                        style={{ width: '120px' }}
                      >
                        {agentStatusCodes.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
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
                          {isCallActive && (
                            <div className="call-status-indicator text-center mb-3">
                              <Badge bg="success" className="px-3 py-2">
                                <FaPhone className="me-2" /> Connected - {formatDuration(callDuration)}
                              </Badge>
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
                          <div className="dialer-actions mt-3">
                            {!isCallActive ? (
                              <div className="d-flex justify-content-between w-100">
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
                                  disabled={phoneNumber.length === 0 || !isConnected}
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
                              </div>
                            ) : (
                              <div className="w-100 d-flex justify-content-center">
                                <Button 
                                  variant="danger" 
                                  size="lg"
                                  className="action-button"
                                  onClick={handleEndCall}
                                >
                                  <FaPhone className="rotate-135" />
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* RingCentral Authentication Button */}
                          <div className="mt-3">
                            <Button
                              variant={isConnected ? "success" : "primary"}
                              className="w-100 d-flex align-items-center justify-content-center gap-2"
                              onClick={handleConnect}
                              disabled={connectionStatus === 'connecting'}
                            >
                              {connectionStatus === 'connecting' ? (
                                <>
                                  <Spinner animation="border" size="sm" />
                                  <span>Connecting...</span>
                                </>
                              ) : (
                                <>
                                  <FaPhoneAlt />
                                  <span>Connect to RingCentral</span>
                                </>
                              )}
                            </Button>
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
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter first name"
                                isInvalid={!!validationErrors.firstName}
                              />
                              {validationErrors.firstName && (
                                <Form.Text className="text-danger">{validationErrors.firstName}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Middle Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                                placeholder="Enter middle name"
                                isInvalid={!!validationErrors.middleName}
                              />
                              {validationErrors.middleName && (
                                <Form.Text className="text-danger">{validationErrors.middleName}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter last name"
                                isInvalid={!!validationErrors.lastName}
                              />
                              {validationErrors.lastName && (
                                <Form.Text className="text-danger">{validationErrors.lastName}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3}>
                            <Form.Group className="mb-3">
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.dateOfBirth}
                              />
                              {validationErrors.dateOfBirth && (
                                <Form.Text className="text-danger">{validationErrors.dateOfBirth}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email"
                                isInvalid={!!validationErrors.email}
                              />
                              {validationErrors.email && (
                                <Form.Text className="text-danger">{validationErrors.email}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mb-3">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control 
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="(XXX) XXX-XXXX"
                                isInvalid={!!validationErrors.phone}
                              />
                              {validationErrors.phone && (
                                <Form.Text className="text-danger">{validationErrors.phone}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mb-3">
                              <Form.Label>Marital Status</Form.Label>
                              <Form.Select
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.maritalStatus}
                              >
                                <option value="">Select status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                              </Form.Select>
                              {validationErrors.maritalStatus && (
                                <Form.Text className="text-danger">{validationErrors.maritalStatus}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Tax Filing Status</Form.Label>
                              <Form.Select
                                name="taxFilingStatus"
                                value={formData.taxFilingStatus}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.taxFilingStatus}
                              >
                                <option value="">Select tax filing status</option>
                                <option value="single">Single</option>
                                <option value="married_joint">Married Filing Jointly</option>
                                <option value="married_separate">Married Filing Separately</option>
                                <option value="head_household">Head of Household</option>
                                <option value="qualifying_widow">Qualifying Widow(er)</option>
                              </Form.Select>
                              {validationErrors.taxFilingStatus && (
                                <Form.Text className="text-danger">{validationErrors.taxFilingStatus}</Form.Text>
                              )}
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
                                  <Form.Control
                                    type="text"
                                    name="spouseFirstName"
                                    value={formData.spouseFirstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter spouse's first name"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Spouse Last Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="spouseLastName"
                                    value={formData.spouseLastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter spouse's last name"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Spouse Date of Birth</Form.Label>
                                  <Form.Control
                                    type="date"
                                    name="spouseDateOfBirth"
                                    value={formData.spouseDateOfBirth}
                                    onChange={handleInputChange}
                                  />
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
                              <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter street address"
                                isInvalid={!!validationErrors.address}
                                className={validationErrors.address ? 'border-danger' : ''}
                              />
                              {validationErrors.address && (
                                <Form.Text className="text-danger">{validationErrors.address}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="Enter city"
                                isInvalid={!!validationErrors.city}
                              />
                              {validationErrors.city && (
                                <Form.Text className="text-danger">{validationErrors.city}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>State/Province</Form.Label>
                              <Form.Control
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                placeholder="Enter state/province"
                                isInvalid={!!validationErrors.state}
                              />
                              {validationErrors.state && (
                                <Form.Text className="text-danger">{validationErrors.state}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>ZIP Code</Form.Label>
                              <Form.Control
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                placeholder="Enter ZIP code"
                                isInvalid={!!validationErrors.zipCode}
                              />
                              {validationErrors.zipCode && (
                                <Form.Text className="text-danger">{validationErrors.zipCode}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      {/* Mailing Address */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Mailing Address</h6>
                        <Form.Check
                          type="checkbox"
                          label="Same as Residential Address"
                          className="mb-3"
                          checked={isMailingSameAsResidential}
                          onChange={(e) => setIsMailingSameAsResidential(e.target.checked)}
                        />
                        {!isMailingSameAsResidential && (
                          <>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Street Address</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="mailingAddress"
                                    value={formData.mailingAddress}
                                    onChange={handleInputChange}
                                    placeholder="Enter mailing address"
                                    isInvalid={!!validationErrors.mailingAddress}
                                  />
                                  {validationErrors.mailingAddress && (
                                    <Form.Text className="text-danger">{validationErrors.mailingAddress}</Form.Text>
                                  )}
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>City</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="mailingCity"
                                    value={formData.mailingCity}
                                    onChange={handleInputChange}
                                    placeholder="Enter city"
                                    isInvalid={!!validationErrors.mailingCity}
                                  />
                                  {validationErrors.mailingCity && (
                                    <Form.Text className="text-danger">{validationErrors.mailingCity}</Form.Text>
                                  )}
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>State/Province</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="mailingState"
                                    value={formData.mailingState}
                                    onChange={handleInputChange}
                                    placeholder="Enter state/province"
                                    isInvalid={!!validationErrors.mailingState}
                                  />
                                  {validationErrors.mailingState && (
                                    <Form.Text className="text-danger">{validationErrors.mailingState}</Form.Text>
                                  )}
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>ZIP Code</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="mailingZipCode"
                                    value={formData.mailingZipCode}
                                    onChange={handleInputChange}
                                    placeholder="Enter ZIP code"
                                    isInvalid={!!validationErrors.mailingZipCode}
                                  />
                                  {validationErrors.mailingZipCode && (
                                    <Form.Text className="text-danger">{validationErrors.mailingZipCode}</Form.Text>
                                  )}
                            </Form.Group>
                          </Col>
                        </Row>
                          </>
                        )}
                      </div>

                      {/* Country of Origin */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Country of Origin</h6>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Country of Origin</Form.Label>
                              <Form.Control
                                type="text"
                                name="countryOfOrigin"
                                value={formData.countryOfOrigin}
                                onChange={handleInputChange}
                                placeholder="Enter country of origin"
                                isInvalid={!!validationErrors.countryOfOrigin}
                              />
                              {validationErrors.countryOfOrigin && (
                                <Form.Text className="text-danger">{validationErrors.countryOfOrigin}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>State/Province of Origin</Form.Label>
                              <Form.Control
                                type="text"
                                name="stateOfOrigin"
                                value={formData.stateOfOrigin}
                                onChange={handleInputChange}
                                placeholder="Enter state/province of origin"
                                isInvalid={!!validationErrors.stateOfOrigin}
                              />
                              {validationErrors.stateOfOrigin && (
                                <Form.Text className="text-danger">{validationErrors.stateOfOrigin}</Form.Text>
                              )}
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
                              <Form.Control
                                type="text"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleInputChange}
                                placeholder="Enter occupation"
                                isInvalid={!!validationErrors.occupation}
                              />
                              {validationErrors.occupation && (
                                <Form.Text className="text-danger">{validationErrors.occupation}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Expected Annual Salary (Current Tax Year)</Form.Label>
                              <Form.Control
                                type="number"
                                name="annualSalary"
                                value={formData.annualSalary}
                                onChange={handleInputChange}
                                placeholder="Enter expected annual salary"
                                isInvalid={!!validationErrors.annualSalary}
                              />
                              {validationErrors.annualSalary && (
                                <Form.Text className="text-danger">{validationErrors.annualSalary}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      {/* Recording Verification */}
                      <div className="section mb-4">
                        <h6 className="mb-3 d-flex justify-content-between align-items-center">
                          <span>Recording Verification</span>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => setShowVerificationModal(true)}
                              disabled={isRecording}
                            >
                              <FaMicrophone className="me-2" /> Start New Recording
                            </Button>
                                </div>
                        </h6>
                        <div className="recording-status p-3 border rounded">
                          <div className="d-flex align-items-center">
                            <div className="recording-icon me-3">
                              {isRecording ? (
                                <FaMicrophone size={24} className="text-danger pulse" />
                              ) : recordingSaved ? (
                                <FaCheckCircle size={24} className="text-success" />
                              ) : (
                                <FaMicrophoneSlash size={24} className="text-secondary" />
                              )}
                            </div>
                            <div>
                              <h6 className="mb-1">
                                {isRecording ? 'Recording in Progress' : 
                                 recordingSaved ? 'Recording Saved' : 
                                 'No Recording'}
                              </h6>
                              <p className="text-muted mb-0">
                                {isRecording ? 'Recording verification script...' : 
                                 recordingSaved ? 'Verification completed successfully' : 
                                 'Click "Start New Recording" to begin verification'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Active Coverage Indicator */}
                      <div className="section mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="mb-0">Active Coverage Status</h6>
                          {isAdmin && (
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => {
                                // This would typically open a modal or form to update coverage status
                                setActiveCoverage(prev => ({
                                  ...prev,
                                  isActive: !prev.isActive,
                                  enrollmentDate: prev.isActive ? null : new Date()
                                }));
                              }}
                            >
                              <FaEdit className="me-1" /> Update Status
                            </Button>
                          )}
                        </div>
                        <div className="coverage-status-indicator p-3 border rounded">
                          <div className="d-flex align-items-center gap-3">
                            <div className={`status-dot ${activeCoverage.isActive ? 'bg-success' : 'bg-secondary'}`} 
                                 style={{ width: '12px', height: '12px', borderRadius: '50%' }}>
                            </div>
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <span className={`fw-semibold ${activeCoverage.isActive ? 'text-success' : 'text-secondary'}`}>
                                  {activeCoverage.isActive ? 'Active Coverage' : 'No Active Coverage'}
                                    </span>
                                {activeCoverage.isActive && (
                                  <Badge bg="success" className="rounded-pill">Verified</Badge>
                                )}
                                  </div>
                              {activeCoverage.isActive && activeCoverage.enrollmentDate && (
                                <small className="text-muted d-block">
                                  Enrolled: {new Date(activeCoverage.enrollmentDate).toLocaleDateString('en-US', { 
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </small>
                                )}
                              </div>
                          </div>
                        </div>
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

                      {/* Add this at the bottom of the form, just before the Action Buttons section */}
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <Button variant="outline-secondary" onClick={() => setShowHistoryModal(true)}>
                          <FaHistory className="me-2" /> View History
                        </Button>
                            <div>
                          <Button 
                            variant="secondary" 
                            className="me-2" 
                            onClick={() => handleSave('draft')}
                            disabled={savingStatus === 'saving' || isSubmitting}
                          >
                            {savingStatus === 'saving' && !isSubmitting ? (
                              <>
                                <FaSpinner className="me-2 spin" /> Saving...
                              </>
                            ) : savingStatus === 'draft-saved' ? (
                              <>
                                <FaCheck className="me-2 text-success" /> Draft Saved!
                              </>
                            ) : (
                              <>
                                <FaSave className="me-2" /> Save Draft
                              </>
                            )}
                              </Button>
                          <Button 
                            variant="primary"
                            onClick={() => handleSave('submit')}
                            disabled={savingStatus === 'saving' || isDraftSaving}
                          >
                            {savingStatus === 'saving' && !isDraftSaving ? (
                              <>
                                <FaSpinner className="me-2 spin" /> Submitting...
                              </>
                            ) : savingStatus === 'submitted' ? (
                              <>
                                <FaCheck className="me-2 text-success" /> Submitted!
                              </>
                            ) : (
                              <>
                                <FaCheckCircle className="me-2" /> Submit Application
                              </>
                            )}
                              </Button>
                            </div>
                          </div>
                    </Form>
                  </Card.Body>
                </Card>
                          </div>
                        </div>
                      </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-container">
            <div className="analytics-sidebar">
              {/* Sales Performance Analytics */}
              <div className="analytics-section">
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

              {/* Time Metrics */}
              <div className="analytics-section">
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

              {/* Sales Funnel Analytics */}
              <div className="analytics-section">
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

              {/* Performance Trends */}
              <div className="analytics-section">
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
            </div>

            <div className="analytics-main">
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
                  <div className="time-tracking-metrics">
                    <Row className="g-4">
                      <Col md={3}>
                        <div className="stat-card bg-primary bg-opacity-10 p-3 rounded">
                          <h6 className="text-primary">Hours Today</h6>
                          <h3>7:45</h3>
                          <div className="d-flex align-items-center">
                            <small className="text-success me-2">On Track</small>
                            <small className="text-muted">15 min break</small>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="stat-card bg-success bg-opacity-10 p-3 rounded">
                          <h6 className="text-success">Weekly Hours</h6>
                          <h3>32:15</h3>
                          <div className="d-flex align-items-center">
                            <small className="text-success me-2">+2hrs</small>
                            <small className="text-muted">vs target</small>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="stat-card bg-info bg-opacity-10 p-3 rounded">
                          <h6 className="text-info">Productivity</h6>
                          <h3>92%</h3>
                          <div className="d-flex align-items-center">
                            <small className="text-success me-2">+5%</small>
                            <small className="text-muted">vs last week</small>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="stat-card bg-warning bg-opacity-10 p-3 rounded">
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

                <div className="time-tracking-details mt-4">
                  <Row>
                    <Col md={6}>
                        <div className="time-card p-3 border rounded">
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
                        <div className="time-card weekly-hours p-3 border rounded">
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

              {/* Real-time Activity Indicators */}
              <div className="real-time-activity">
                <h6 className="mb-3">Today's Sales Performance</h6>
                <div className="activity-indicators">
                  <div className="d-flex flex-wrap gap-3">
                    {/* Sales Counter */}
                    <div className="indicator-item p-3 border rounded flex-grow-1">
                      <div className="d-flex align-items-center">
                        <div className="status-dot bg-success me-2"></div>
                        <div>
                          <h6 className="mb-1">Sales Today</h6>
                          <div className="d-flex align-items-center">
                            <h3 className="mb-0 me-2 text-success">3</h3>
                            <span className="text-muted small">Sales</span>
                  </div>
                </div>
                </div>
                        </div>

                    {/* Call Time */}
                    <div className="indicator-item p-3 border rounded flex-grow-1">
                      <div className="d-flex align-items-center">
                        <div className="status-dot bg-primary me-2"></div>
                        <div>
                          <h6 className="mb-1">Total Call Time</h6>
                          <div className="d-flex align-items-center">
                            <h3 className="mb-0 me-2">4:15</h3>
                            <span className="text-muted small">Hours</span>
                        </div>
                        </div>
                        </div>
                        </div>

                    {/* Average Call Time */}
                    <div className="indicator-item p-3 border rounded flex-grow-1">
                            <div className="d-flex align-items-center">
                        <div className="status-dot bg-info me-2"></div>
                              <div>
                          <h6 className="mb-1">Avg Time Per Sale</h6>
                            <div className="d-flex align-items-center">
                            <h3 className="mb-0 me-2">45</h3>
                            <span className="text-muted small">Minutes</span>
                              </div>
                            </div>
                          </div>
                              </div>
                            </div>

                  {/* Sales Details */}
                  <div className="mt-4">
                    <h6 className="mb-3">Sales Details</h6>
                    <div className="sales-details-section">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Time</th>
                            <th>Client</th>
                            <th>Plan</th>
                            <th>Premium</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>9:15 AM</td>
                            <td>John Smith</td>
                            <td>Gold Plan</td>
                            <td>$450/mo</td>
                          </tr>
                          <tr>
                            <td>11:30 AM</td>
                            <td>Sarah Johnson</td>
                            <td>Silver Plan</td>
                            <td>$325/mo</td>
                          </tr>
                          <tr>
                            <td>2:45 PM</td>
                            <td>Michael Brown</td>
                            <td>Gold Plan</td>
                            <td>$450/mo</td>
                          </tr>
                          <tr>
                            <td>3:20 PM</td>
                            <td>Emily Davis</td>
                            <td>Platinum Plan</td>
                            <td>$575/mo</td>
                          </tr>
                          <tr>
                            <td>4:10 PM</td>
                            <td>Robert Wilson</td>
                            <td>Gold Plan</td>
                            <td>$450/mo</td>
                          </tr>
                          <tr>
                            <td>4:45 PM</td>
                            <td>Lisa Anderson</td>
                            <td>Silver Plan</td>
                            <td>$325/mo</td>
                          </tr>
                        </tbody>
                      </table>
                          </div>
                        </div>
                      </div>
                    </div>
            </div>
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
                        <Button variant="success" onClick={() => handleOpenChat(selectedClient)}>
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

      {/* History Modal */}
      <Modal 
        show={showHistoryModal} 
        onHide={() => setShowHistoryModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Application History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <h6 className="mb-3">Application Progress</h6>
            <div className="completion-indicator">
              <div className="d-flex align-items-center">
                <div className="d-flex gap-1">
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
          </div>

          <div className="history-timeline">
            <h6 className="mb-3">Notes & Disposition History</h6>
            {notes.map((note, index) => (
              <div key={index} className="history-entry mb-3">
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHistoryModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add the Verification Script Modal */}
      <Modal 
        show={showVerificationModal} 
        onHide={() => {
          if (!isRecording) {
            setShowVerificationModal(false);
          }
        }}
        size="lg"
        centered
        backdrop={isRecording ? 'static' : true}
        keyboard={!isRecording}
      >
        <Modal.Header closeButton={!isRecording}>
          <Modal.Title>Verification Script</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="verification-script p-4 bg-light rounded mb-4">
            <h6 className="text-primary mb-4">Please read the following script to obtain legal consent:</h6>
            <div className="script-content">
              <p className="mb-4 lead">
                "Hello, I am recording this call to verify your consent for health insurance enrollment. 
                Today's date is {new Date().toLocaleDateString()}."
              </p>
              <p className="mb-4 lead">
                "Could you please state your full name and confirm that you authorize our office to assist you with your health insurance enrollment?"
              </p>
              <p className="mb-4 lead">
                "Do you understand that by providing this consent, you are allowing us to:
                <br/>1. Access and handle your personal information for enrollment purposes
                <br/>2. Submit applications on your behalf to health insurance providers
                <br/>3. Communicate with insurance companies regarding your coverage"
              </p>
              <p className="lead">
                "Please respond with 'Yes, I understand and consent' if you agree."
              </p>
            </div>
          </div>
          <div className="recording-status text-center">
            {isRecording ? (
              <div className="alert alert-danger">
                <FaMicrophone className="me-2 pulse" />
                Recording in progress... Please read the entire script
              </div>
            ) : recordingSaved ? (
              <div className="alert alert-success">
                <FaCheckCircle className="me-2" />
                Recording saved successfully
              </div>
            ) : (
              <div className="alert alert-info">
                <FaInfoCircle className="me-2" />
                Click "Start Recording" when ready to read the script
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          {!isRecording && !recordingSaved && (
            <Button 
              variant="secondary" 
              onClick={() => setShowVerificationModal(false)}
            >
              Cancel
            </Button>
          )}
          <Button 
            variant={isRecording ? "danger" : recordingSaved ? "success" : "primary"}
            onClick={() => {
              if (!isRecording && !recordingSaved) {
                setIsRecording(true);
              } else if (isRecording) {
                setIsRecording(false);
                setRecordingSaved(true);
                setTimeout(() => {
                  setShowVerificationModal(false);
                  setRecordingSaved(false);
                }, 2000);
              }
            }}
            className="d-flex align-items-center"
          >
            {isRecording ? (
              <>
                <FaStop className="me-2" /> Stop Recording & Save
              </>
            ) : recordingSaved ? (
              <>
                <FaCheck className="me-2" /> Recording Verified
              </>
            ) : (
              <>
                <FaMicrophone className="me-2" /> Start Recording
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Validation Modal */}
      <Modal show={showValidationModal} onHide={() => setShowValidationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Required Fields Missing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-danger">
            Please fill out all required fields before submitting the application:
            <ul className="mt-2 mb-0">
              {Object.entries(validationErrors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowValidationModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} 