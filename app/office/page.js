'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Nav, Tab, Badge, Modal, Spinner, ListGroup, InputGroup, Alert, Dropdown, Pagination, ProgressBar } from 'react-bootstrap';
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
  FaGoogle, FaHistory, FaSpinner, FaSync, FaFire,
  FaTimesCircle,
  FaHeadset, FaBullhorn,
  FaUserTie, FaExternalLinkAlt, FaUnlink,
  FaQuestionCircle, FaEye,
  FaInbox, FaArrowLeft, FaReply, FaReplyAll, FaForward, FaChartPie,
  FaCalendarCheck, FaNewspaper, FaRegStar, FaChevronLeft, FaChevronRight,
  FaUserCheck, FaUserClock,
  FaSignature, FaIdCard,
  FaGlobe, FaSnapchat, FaTiktok, FaInstagram, FaFacebook,
  FaGift, FaPaperclip,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Chat from '@/components/Chat';
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy, updateDoc, doc, addDoc, serverTimestamp, limit, where } from 'firebase/firestore';
import { auth } from '../firebase/config';
import Cookies from 'js-cookie';

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
    },
    {
      date: '2024-03-13 09:15',
      type: 'Application',
      disposition: 'Submitted',
      agent: 'Agent ID: AGT-78945',
      duration: 'N/A',
      notes: 'Application submitted successfully. Application ID: APP-2024-00321. Client completed all required documentation and signed electronically.',
      policyDetails: {
        planName: 'Premium Coverage Plan',
        coverageType: 'Family',
        deductible: '1,500',
        premium: '350',
        effectiveDate: '2024-04-01',
        status: 'Pending Review'
      }
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
  const [showSearchResults, setShowSearchResults] = useState(true);
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
    { value: 'available', label: 'Available' },
    { value: 'on_call', label: 'On Call' },
    { value: 'break', label: 'On Break' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'meeting', label: 'In Meeting' },
    { value: 'training', label: 'Training' },
    { value: 'admin', label: 'Admin' },
    { value: 'personal', label: 'Personal' },
    { value: 'technical_issue', label: 'Technical Issue' },
    { value: 'not_connected', label: 'Not Connected' }
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

// State declarations
const [isDraftSaving, setIsDraftSaving] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [showValidationModal, setShowValidationModal] = useState(false);
const [validationErrors, setValidationErrors] = useState({});
const [isMailingSameAsResidential, setIsMailingSameAsResidential] = useState(false);

// Initial form data state with lowercase fields
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
  hasVoiceRecording: false,
  effectiveDate: '',
  policyId: '',
  spouseSSN: '',
  ssn: '',
  willBeClaimedOnTaxes: '',
  isWebLead: false,
  // Add all other fields you use in the form, with default values
});

// Form validation
const validateForm = () => {
  const errors = {};

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

  Object.entries(requiredFields).forEach(([_, fields]) => {
    Object.entries(fields).forEach(([field, label]) => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        errors[field] = `${label} is required`;
      }
    });
  });

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formData.phone && !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number in (XXX) XXX-XXXX format';
  }

  if (formData.maritalStatus === 'married') {
    if (!formData.spouseFirstName?.trim()) errors.spouseFirstName = 'Spouse First Name is required';
    if (!formData.spouseLastName?.trim()) errors.spouseLastName = 'Spouse Last Name is required';
    if (!formData.spouseDateOfBirth?.trim()) errors.spouseDateOfBirth = 'Spouse Date of Birth is required';
  }

  if (!formData.hasVoiceRecording) {
    errors.voiceRecording = 'Voice recording verification is required';
  }

  // Add deductible validation
  if (formData.deductible) {
    const deductibleValue = parseInt(formData.deductible.replace(/[^0-9]/g, ''));
    if (isNaN(deductibleValue)) {
      errors.deductible = 'Please enter a valid number';
    } else if (deductibleValue > 10000) {
      errors.deductible = 'Deductible cannot exceed $10,000';
    }
  }

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};

// Input change handler
const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === 'phone') {
    const formattedValue = formatPhoneNumber(value);
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  } else if (name === 'deductible') {
    // Remove any non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    // Format as currency
    const formattedValue = numericValue ? `$${parseInt(numericValue).toLocaleString()}` : '';
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};

// Save handler
const handleSave = async (type) => {
  try {
    console.log('Starting form submission process...');
    console.log('Form data:', formData);

    if (type === 'draft') {
      setIsDraftSaving(true);
      setSavingStatus('saving');
    } else {
      setIsSubmitting(true);
      setSavingStatus('saving');
    }

    // Generate a unique ID for the application
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    const clientId = `CLT-${timestamp}-${randomNum}`;
    console.log('Generated client ID:', clientId);

    // Prepare the application data
    const applicationData = {
      ...formData,
      clientId,
      clientName: `${formData.firstName} ${formData.lastName}`.trim(),
      submissionDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: type === 'draft' ? 'Draft' : 'Submitted',
      enrollmentDate: type === 'draft' ? null : new Date().toISOString(),
      hasRecording: formData.hasVoiceRecording || false,
      hasESignature: formData.hasESignature || false
    };
    console.log('Prepared application data:', applicationData);

    // Write to Firestore
    console.log('Attempting to write to Firestore...');
    const applicationsRef = collection(db, 'applications');
    const docRef = await addDoc(applicationsRef, applicationData);
    console.log('Successfully wrote to Firestore. Document ID:', docRef.id);

    if (type === 'draft') {
      setSavingStatus('draft-saved');
      setIsDraftSaving(false);
    } else {
      setSavingStatus('submitted');
      setIsSubmitting(false);
      // Update form data with new enrollment date and status
      setFormData(prev => ({
        ...prev,
        enrollmentDate: new Date().toISOString(),
        status: 'Submitted'
      }));
    }

    // Update enrollment title if name is available
    if (formData.firstName && formData.lastName) {
      setEnrollmentTitle(`${formData.firstName} ${formData.lastName}'s Enrollment`);
    }
  } catch (error) {
    console.error('Error saving application:', error);
    setSavingStatus('error');
    if (type === 'draft') {
      setIsDraftSaving(false);
    } else {
      setIsSubmitting(false);
    }
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

  const upcomingMeetings = [];

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
    // Only update status for active calls
    if (activeTab === 'dialer' && isDialing) {
      setAgentStatus('on_call');
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
    setEnrollmentTitle(`${client.firstName} ${client.lastName}'s Enrollment`);
    setShowClientProfile(false);
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

  // Get first day of month dynamically
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
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
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format based on length
    if (phoneNumber.length <= 3) {
      return `(${phoneNumber}`;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
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
      // Status will remain as not_connected until explicitly changed
      
      // Initialize session monitoring
      startSessionMonitoring();
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionStatus('disconnected');
      setAgentStatus('not_connected');  // Set status to not_connected on failure
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
      setAgentStatus('not_connected');  // Set status to not_connected when disconnected
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
    // Generate a new application ID
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    const applicationId = `APP-${timestamp}-${randomNum}`;

    // Update the application ID in the form header
    const applicationIdElement = document.querySelector('.application-id-badge');
    if (applicationIdElement) {
      applicationIdElement.textContent = `Application ID: ${applicationId}`;
    }

    // Update form data with the new application ID
    setFormData(prev => ({
      ...prev,
      applicationId: applicationId,
      hasVoiceRecording: true
    }));

    // Add a note about the recording and application ID
    const note = {
      date: new Date().toLocaleString(),
      type: 'Recording',
      disposition: 'Completed',
      agent: 'Current Agent',
      duration: 'N/A',
      notes: `Voice recording completed. Application ID: ${applicationId}`,
      policyDetails: {
        planName: formData.planName,
        coverageType: formData.coverageType,
        deductible: formData.deductible,
        premium: formData.premium,
        effectiveDate: formData.effectiveDate,
        status: 'Pending'
      }
    };
    
    setNotes(prev => [note, ...prev]);
    setShowRecordingModal(false);
  };

  const [dispositionCompleted, setDispositionCompleted] = useState(false);

  // Add state for points history modal
  const [showPointsHistoryModal, setShowPointsHistoryModal] = useState(false);

  // Add state for new note form
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [newNote, setNewNote] = useState({
    type: 'Note',
    disposition: 'General',
    notes: ''
  });

  // Add handler for saving new notes
  const handleSaveNote = () => {
    if (!newNote.notes.trim()) return;
    
    const note = {
      date: new Date().toLocaleString(),
      type: newNote.type,
      disposition: newNote.disposition,
      agent: 'Current Agent',
      duration: 'N/A',
      notes: newNote.notes
    };
    
    setNotes(prev => [note, ...prev]);
    setNewNote({
      type: 'Note',
      disposition: 'General',
      notes: ''
    });
    setShowNewNoteForm(false);
  };

  // Add state for Sunfire submission
  const [isSunfireSubmitting, setIsSunfireSubmitting] = useState(false);
  const [sunfireStatus, setSunfireStatus] = useState('');

  // Add handler for Sunfire submission
  const handleSunfireSubmit = async () => {
    try {
      setIsSunfireSubmitting(true);
      setSunfireStatus('connecting');

      // Validate form before submitting to Sunfire
      if (!validateForm()) {
        setSunfireStatus('validation-error');
        setIsSunfireSubmitting(false);
        return;
      }

      // Simulate Sunfire API connection
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update status to show successful connection
      setSunfireStatus('connected');
      
      // Add a note about Sunfire submission
      const note = {
        date: new Date().toLocaleString(),
        type: 'Application',
        disposition: 'Submitted',
        agent: 'Current Agent',
        duration: 'N/A',
        notes: 'Application submitted to Sunfire successfully',
        policyDetails: {
          planName: formData.planName,
          coverageType: formData.coverageType,
          deductible: formData.deductible,
          premium: formData.premium,
          effectiveDate: formData.effectiveDate,
          status: 'Pending'
        }
      };
      
      setNotes(prev => [note, ...prev]);

      // Reset status after 3 seconds
      setTimeout(() => {
        setSunfireStatus('');
        setIsSunfireSubmitting(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting to Sunfire:', error);
      setSunfireStatus('error');
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        setSunfireStatus('');
        setIsSunfireSubmitting(false);
      }, 3000);
    }
  };

  // Add state for enrollment title
  const [enrollmentTitle, setEnrollmentTitle] = useState('Untitled Enrollment');

  // Add state for notes history modal
  const [showNotesHistoryModal, setShowNotesHistoryModal] = useState(false);

  const [showSalesModal, setShowSalesModal] = useState(false);

  // State for Admin Tab
  const [applications, setApplications] = useState([]);
  const [isLoadingApplications, setIsLoadingApplications] = useState(true);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationSearchTerm, setApplicationSearchTerm] = useState('');
  const [applicationTimeframe, setApplicationTimeframe] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;

  // Filter applications based on search term and timeframe
  const filteredApplications = useMemo(() => {
    console.log('=== FILTERING APPLICATIONS ===');
    console.log('Search term:', applicationSearchTerm);
    console.log('Timeframe:', applicationTimeframe);
    console.log('Total applications before filtering:', applications.length);

    let filtered = [...applications]; // Create a new array to avoid mutating the original

    // Search filter
    if (applicationSearchTerm) {
      const searchLower = applicationSearchTerm.toLowerCase().trim();
      console.log('Searching for:', searchLower);
      
      filtered = filtered.filter(app => {
        // Get all searchable fields
        const searchableFields = [
          app.firstName,
          app.lastName,
          app.middleName,
          app.email,
          app.phone,
          app.ssn,
          app.client_id,
          app.lead_id,
          app.clientName, // Add clientName as it might be stored separately
          `${app.firstName} ${app.lastName}`, // Full name combination
          `${app.firstName} ${app.middleName} ${app.lastName}` // Full name with middle name
        ].map(field => (field || '').toLowerCase());

        // Log the searchable fields for debugging
        console.log('Searchable fields for document:', {
          id: app.id,
          fields: searchableFields
        });

        // Check if any field contains the search term
        const matches = searchableFields.some(field => field.includes(searchLower));
        console.log('Document matches search:', {
          id: app.id,
          matches
        });

        return matches;
      });
    }

    // Timeframe filter
    if (applicationTimeframe !== 'all') {
      const now = new Date();
      const cutoff = new Date();

      switch (applicationTimeframe) {
        case 'today':
          cutoff.setHours(0, 0, 0, 0);
          break;
        case 'week':
          cutoff.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoff.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoff.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(app => {
        const appDate = new Date(app.applicationDate || app.submissionDate || app.timestamp);
        return appDate >= cutoff;
      });
    }

    console.log('Filtered applications count:', filtered.length);
    console.log('Filtered applications:', filtered);
    return filtered;
  }, [applications, applicationSearchTerm, applicationTimeframe]);

  // Add logging for search term changes
  useEffect(() => {
    console.log('Search term changed:', applicationSearchTerm);
  }, [applicationSearchTerm]);

  // Add logging for applications state
  useEffect(() => {
    console.log('Applications state:', {
      total: applications.length,
      applications: applications
    });
  }, [applications]);

  // Calculate pagination
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  // Fetch applications from Firestore
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoadingApplications(true);
        console.log('=== STARTING FIRESTORE FETCH ===');
        
        if (!db) {
          console.error('❌ Firestore db instance is null or undefined');
          throw new Error('Firestore database instance is not initialized');
        }
        
        const applicationsRef = collection(db, 'applications');
        console.log('Fetching from applications collection...');
        
        // First, let's check what's in the collection
        const allDocs = await getDocs(applicationsRef);
        console.log('Raw collection contents:', allDocs.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })));
        
        // Now fetch with ordering
        const q = query(applicationsRef, orderBy('timestamp', 'desc'));
        console.log('Query created:', q);
        
        const snapshot = await getDocs(q);
        console.log('Total documents found:', snapshot.size);
        
        if (snapshot.empty) {
          console.log('No documents found in applications collection');
          setApplications([]);
          return;
        }
        
        const applicationsData = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Processing document:', {
            id: doc.id,
            rawData: data
          });
          
          // Ensure we have all required fields with fallbacks
          const processedData = {
            id: doc.id,
            firstName: data.firstname || '',
            lastName: data.lastname || '',
            middleName: data.middlename || '',
            email: data.email || '',
            phone: data.phone || '',
            dateOfBirth: data.dateofbirth || '',
            countryOfOrigin: data.countryoforigin || '',
            stateOfOrigin: data.stateoforigin || '',
            status: data.status || 'Pending',
            applicationDate: data.timestamp || new Date().toISOString(),
            ssn: data.ssn || '',
            client_id: data.client_id || '',
            lead_id: data.lead_id || '',
            ...data // Include any other fields
          };
          
          console.log('Processed document data:', processedData);
          return processedData;
        });
        
        console.log('Successfully loaded', applicationsData.length, 'applications');
        console.log('First application sample:', applicationsData[0]);
        
        // Update state with the processed applications
        setApplications(applicationsData);
        
        // Log the current state after update
        console.log('Current applications state:', applicationsData);
        
      } catch (error) {
        console.error('Error fetching applications:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          stack: error.stack
        });
        setApplications([]);
      } finally {
        setIsLoadingApplications(false);
      }
    };

    fetchApplications();
  }, []);

  // Add logging for applications state changes
  useEffect(() => {
    console.log('Applications state updated:', applications);
  }, [applications]);

  // Add logging for filtered applications
  useEffect(() => {
    console.log('Filtered applications updated:', filteredApplications);
  }, [filteredApplications]);

  // --- Admin Tab Functions ---
  const handleViewApplication = (app) => {
    setSelectedApplication(app);
    setShowAdminModal(true);
  };

  const handleConfirmApplication = async (appId) => {
    try {
      // Update the application status in Firestore
      const applicationRef = doc(db, 'applications', appId);
      await updateDoc(applicationRef, {
        status: 'Confirmed',
        updatedAt: new Date().toISOString()
      });

      // Update local state
      setApplications(prevApps =>
        prevApps.map(app =>
          app.id === appId ? { ...app, status: 'Confirmed' } : app
        )
      );
    } catch (error) {
      console.error('Error confirming application:', error);
    }
  };

  const handleSaveChanges = async () => {
    if (selectedApplication) {
      try {
        // Update the application in Firestore
        const applicationRef = doc(db, 'applications', selectedApplication.id);
        await updateDoc(applicationRef, {
          ...selectedApplication,
          updatedAt: new Date().toISOString()
        });

        // Update local state
        setApplications(prevApps =>
          prevApps.map(app =>
            app.id === selectedApplication.id ? selectedApplication : app
          )
        );
      } catch (error) {
        console.error('Error saving application changes:', error);
      }
    }
    setShowAdminModal(false);
    setSelectedApplication(null);
  };
  // --- End Admin Tab Functions ---

  // State for Agents Tab
  const [agentsData, setAgentsData] = useState([
    // Mock Data - Replace with actual data fetching later
    { id: 'AGT-78945', name: 'John Doe', connectionStatus: 'Connected', activityStatus: 'Ready', lastActivity: '2m ago' },
    { id: 'AGT-12345', name: 'Jane Smith', connectionStatus: 'Connected', activityStatus: 'On Call', lastActivity: 'Active Now' },
    { id: 'AGT-67890', name: 'Mike Brown', connectionStatus: 'Disconnected', activityStatus: 'Offline', lastActivity: '1h ago' },
    { id: 'AGT-11223', name: 'Sarah Johnson', connectionStatus: 'Connected', activityStatus: 'On Break', lastActivity: '15m ago' },
  ]);
  const [callLogSearchQuery, setCallLogSearchQuery] = useState('');

  // State for Support Tab
  const [supportRequestsData, setSupportRequestsData] = useState([
    // Mock Data - Replace with actual data fetching later
    { id: 'REQ-001', agentName: 'John Doe', agentId: 'AGT-78945', category: 'IT', request: 'Cannot connect to VPN.', dateSubmitted: '2024-07-29 09:15', status: 'Pending', resolution: '' },
    { id: 'REQ-002', agentName: 'Jane Smith', agentId: 'AGT-12345', category: 'Management', request: 'Requesting schedule change for next week.', dateSubmitted: '2024-07-29 10:30', status: 'In Progress', resolution: 'Manager reviewing schedule.' },
    { id: 'REQ-003', agentName: 'Mike Brown', agentId: 'AGT-67890', category: 'IT', request: 'Headset audio not working.', dateSubmitted: '2024-07-28 14:00', status: 'Resolved', resolution: 'Replaced headset cable.' },
    { id: 'REQ-004', agentName: 'Sarah Johnson', agentId: 'AGT-11223', category: 'Management', request: 'Inquiry about commission structure.', dateSubmitted: '2024-07-28 11:00', status: 'Resolved', resolution: 'Provided commission documentation.' },
    { id: 'REQ-005', agentName: 'John Doe', agentId: 'AGT-78945', category: 'IT', request: 'Software update causing errors.', dateSubmitted: '2024-07-29 11:45', status: 'Pending', resolution: '' },
  ]);
  const [showSupportRequestModal, setShowSupportRequestModal] = useState(false);
  const [selectedSupportRequest, setSelectedSupportRequest] = useState(null);

  // --- Support Tab Functions ---
  const handleViewSupportRequest = (req) => {
    setSelectedSupportRequest({ ...req }); // Clone to avoid direct state mutation in modal
    setShowSupportRequestModal(true);
  };

  const handleSupportRequestChange = (field, value) => {
    setSelectedSupportRequest(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSaveSupportRequest = () => {
    if (selectedSupportRequest) {
      setSupportRequestsData(prevReqs =>
        prevReqs.map(req =>
          req.id === selectedSupportRequest.id ? selectedSupportRequest : req
        )
      );
    }
    setShowSupportRequestModal(false);
    setSelectedSupportRequest(null);
  };
  // --- End Support Tab Functions ---

  // State for Email Tab
  const [emailsData, setEmailsData] = useState([]); // Empty array instead of placeholder data
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailFolder, setEmailFolder] = useState('inbox');
  
  // State for Marketing Tab
  const [marketingCampaigns, setMarketingCampaigns] = useState([
    { id: 'camp-001', name: 'Summer Health Awareness', status: 'Active', startDate: '2024-06-01', endDate: '2024-08-31', audience: 'General', engagement: '32%', leads: 215, conversions: 43 },
    { id: 'camp-002', name: 'Senior Care Special', status: 'Scheduled', startDate: '2024-08-15', endDate: '2024-10-15', audience: 'Seniors', engagement: 'N/A', leads: 0, conversions: 0 },
    { id: 'camp-003', name: 'Family Plan Promotion', status: 'Active', startDate: '2024-07-01', endDate: '2024-09-30', audience: 'Families', engagement: '28%', leads: 187, conversions: 36 },
    { id: 'camp-004', name: 'Spring Coverage Drive', status: 'Completed', startDate: '2024-03-01', endDate: '2024-05-31', audience: 'General', engagement: '35%', leads: 341, conversions: 72 },
  ]);
  const [marketingTemplates, setMarketingTemplates] = useState([
    { id: 'temp-001', name: 'Health Insurance Overview', type: 'Email', lastModified: '2024-07-15', usageCount: 45 },
    { id: 'temp-002', name: 'Family Plan Benefits', type: 'Email', lastModified: '2024-07-10', usageCount: 32 },
    { id: 'temp-003', name: 'Senior Care Options', type: 'Social Media', lastModified: '2024-07-05', usageCount: 28 },
    { id: 'temp-004', name: 'Preventive Care Importance', type: 'Landing Page', lastModified: '2024-06-30', usageCount: 19 },
  ]);
  
  // Email Tab Functions
  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    // Mark as read if it was unread
    if (!email.read) {
      setEmailsData(prevEmails => 
        prevEmails.map(e => 
          e.id === email.id ? { ...e, read: true } : e
        )
      );
    }
  };
  
  const handleStarEmail = (emailId, event) => {
    event.stopPropagation(); // Prevent triggering email selection
    setEmailsData(prevEmails => 
      prevEmails.map(email => 
        email.id === emailId ? { ...email, starred: !email.starred } : email
      )
    );
  };
  
  const handleDeleteEmail = (emailId, event) => {
    event.stopPropagation(); // Prevent triggering email selection
    setEmailsData(prevEmails => prevEmails.filter(email => email.id !== emailId));
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail(null);
    }
  };

  // Add this to the existing state declarations
  const clockHourHandRef = useRef(null);
  const clockMinuteHandRef = useRef(null);
  const clockSecondHandRef = useRef(null);
  
  // Add this useEffect to update the clock hands
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateClock = () => {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        if (clockHourHandRef.current) {
          clockHourHandRef.current.style.transform = `rotate(${(hours * 30) + (minutes * 0.5)}deg) translateX(-50%)`;
        }
        
        if (clockMinuteHandRef.current) {
          clockMinuteHandRef.current.style.transform = `rotate(${minutes * 6}deg) translateX(-50%)`;
        }
        
        if (clockSecondHandRef.current) {
          clockSecondHandRef.current.style.transform = `rotate(${seconds * 6}deg) translateX(-50%)`;
        }
      };
      
      updateClock(); // Initial update
      const intervalId = setInterval(updateClock, 1000);
      
      return () => clearInterval(intervalId);
    }
  }, []);

  // State for Google Drive Tab
  const [driveFiles, setDriveFiles] = useState([
    { id: 'file-001', name: 'Client Intake Form.docx', type: 'document', size: '45 KB', lastModified: '2024-07-15', owner: 'You' },
    { id: 'file-002', name: 'Insurance Policy Templates', type: 'folder', size: '4 folders, 12 files', lastModified: '2024-07-10', owner: 'You' },
    { id: 'file-003', name: 'Meeting Notes - July.pdf', type: 'pdf', size: '156 KB', lastModified: '2024-07-05', owner: 'John Doe' },
    { id: 'file-004', name: 'Sales Report Q2.xlsx', type: 'spreadsheet', size: '1.2 MB', lastModified: '2024-06-30', owner: 'Jane Smith' },
    { id: 'file-005', name: 'Agent Training Materials', type: 'folder', size: '3 folders, 25 files', lastModified: '2024-06-25', owner: 'Training Dept' },
  ]);
  const [currentDriveFolder, setCurrentDriveFolder] = useState('My Drive');
  
  // State for Gemini Tab
  const [geminiPrompt, setGeminiPrompt] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');
  const [geminiHistory, setGeminiHistory] = useState([
    { role: 'assistant', content: 'Hello! I\'m Gemini AI. How can I assist you today?' }
  ]);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  
  // Gemini Tab Functions
  const handleGeminiSubmit = () => {
    if (!geminiPrompt.trim()) return;
    
    // Add user prompt to history
    const updatedHistory = [
      ...geminiHistory,
      { role: 'user', content: geminiPrompt }
    ];
    setGeminiHistory(updatedHistory);
    setGeminiPrompt('');
    setIsGeminiLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { 
        role: 'assistant', 
        content: 'This is a simulated response from Gemini. In a real implementation, this would connect to the Gemini API to get an actual response based on your prompt.' 
      };
      setGeminiHistory([...updatedHistory, aiResponse]);
      setIsGeminiLoading(false);
    }, 1500);
  };
  
  // Google Drive Tab Functions
  const handleFolderClick = (folderId, folderName) => {
    setCurrentDriveFolder(folderName);
    // In a real implementation, this would fetch the contents of the folder
  };
  
  const handleFileAction = (fileId, action) => {
    // In a real implementation, this would perform actions like download, share, etc.
    console.log(`Performing ${action} on file ${fileId}`);
  };

  // State variables for the app
  const [meetingStartTime, setMeetingStartTime] = useState(null);
  const [callClient, setCallClient] = useState(null);
  // Add state for selected agent
  const [selectedAgent, setSelectedAgent] = useState(null);

  // First add a new function to handle the e-signature download
  // Add this after the handleSaveChanges function around line 1579

  const downloadESignature = (application) => {
    // Create a mock e-signature stamp with client info
    const generateStamp = () => {
      // In a real app, this would fetch the actual e-signature from a server
      // For now, we'll create a simple mock data structure with a timestamp
      return {
        clientName: application.clientName,
        clientId: application.clientId,
        applicationId: application.id,
        agentId: application.agentId,
        timestamp: new Date().toISOString(),
        verificationCode: `ES-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        signature: "Client Electronic Signature",
        policyType: "Health Insurance Enrollment",
        stampId: `STAMP-${Date.now()}`
      };
    };

    const stampData = generateStamp();
    
    // Create formatted text content for the stamp
    const stampContent = 
`INSURANCE MARKETPLACE E-SIGNATURE VERIFICATION
-----------------------------------------------
CLIENT NAME: ${stampData.clientName}
CLIENT ID: ${stampData.clientId}
APPLICATION ID: ${stampData.applicationId}
AGENT ID: ${stampData.agentId}
TIMESTAMP: ${new Date(stampData.timestamp).toLocaleString()}
VERIFICATION CODE: ${stampData.verificationCode}
POLICY TYPE: ${stampData.policyType}
STAMP ID: ${stampData.stampId}

This document certifies that ${stampData.clientName} has provided an electronic 
signature for the purpose of health insurance enrollment through the authorized 
marketplace system. This signature is legally binding in accordance with the 
Electronic Signatures in Global and National Commerce Act (E-SIGN Act).
`;

    // Create a Blob containing the text data
    const blob = new Blob([stampContent], { type: 'text/plain' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `esignature-${application.clientId.toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  // Add a state for clocking in status around line 1550
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);

  // Add handler function for clocking in
  const handleClockIn = () => {
    setClockedIn(true);
    setClockInTime(new Date());
    setShowClockInModal(false);
  };

  // Add CSS styles for mobile responsiveness
  const mobileStyles = `
    @media (max-width: 768px) {
      .home-calendar-row {
        flex-direction: column;
      }
      .analog-clock-container {
        margin-bottom: 1rem !important;
      }
      .analog-clock {
        width: 100px !important;
        height: 100px !important;
      }
      .calendar-clock-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
      }
      .digital-time h4 {
        font-size: 1.2rem;
      }
      .digital-time p {
        font-size: 0.8rem;
      }
    }
  `;

  // Pagination handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // --- ENROLLMENT APPLICANT SEARCH STATE ---
  const [enrollmentApplicants, setEnrollmentApplicants] = useState([]);
  const [enrollmentSearch, setEnrollmentSearch] = useState('');
  const [filteredEnrollmentApplicants, setFilteredEnrollmentApplicants] = useState([]);

  useEffect(() => {
    // Fetch applications for enrollment search
    const fetchEnrollmentApplicants = async () => {
      try {
        const applicationsRef = collection(db, 'applications');
        const q = query(applicationsRef, orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const applicants = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            firstName: data.firstname || data.firstName || '',
            lastName: data.lastname || data.lastName || '',
            email: data.email || '',
            phone: data.phone || '',
            status: data.status || '',
            ...data
          };
        });
        setEnrollmentApplicants(applicants);
        setFilteredEnrollmentApplicants(applicants);
      } catch (error) {
        setEnrollmentApplicants([]);
        setFilteredEnrollmentApplicants([]);
      }
    };
    fetchEnrollmentApplicants();
  }, []);

  useEffect(() => {
    // Filter applicants by search
    const search = enrollmentSearch.toLowerCase().trim();
    if (!search) {
      setFilteredEnrollmentApplicants(enrollmentApplicants);
    } else {
      setFilteredEnrollmentApplicants(
        enrollmentApplicants.filter(app =>
          (app.firstName + ' ' + app.lastName).toLowerCase().includes(search) ||
          app.email.toLowerCase().includes(search) ||
          app.phone.toLowerCase().includes(search)
        )
      );
    }
  }, [enrollmentSearch, enrollmentApplicants]);

  // Add this function before the return statement
  const handleApplicantSelect = (app) => {
    setFormData(prev => ({
      ...prev,
      firstName: app.firstName || app.firstname || '',
      middleName: app.middleName || app.middlename || '',
      lastName: app.lastName || app.lastname || '',
      email: app.email || '',
      phone: app.phone || '',
      dateOfBirth: app.dateOfBirth || app.dateofbirth || '',
      address: app.streetaddress || app.address || '',
      city: app.city || '',
      state: app.state || '',
      zipCode: app.zipcode || app.zipCode || '',
      ssn: app.ssn || '',
      occupation: app.occupation || '',
      annualSalary: app.annualSalary || app.expectedSalary || '',
      agentId: app.agent_id || app.agentId || 'N/A',
      clientId: app.client_id || app.clientId || 'N/A',
      status: app.status || 'N/A',
      enrollmentDate: app.enrollmentDate || app.timestamp || null
    }));
    setShowSearchResults(false);
    setEnrollmentSearch('');
  };

  // Coverage duration state
  const getCoverageDays = () => {
    if (activeCoverage.isActive && activeCoverage.enrollmentDate) {
      const start = new Date(activeCoverage.enrollmentDate);
      const now = new Date();
      const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
      return diff >= 0 ? diff : 0;
    }
    return 0;
  };

  // Rewards state and logic
  const rewardMilestones = [
    { days: 7, label: '1 Week Enrolled', reward: 'Welcome Gift' },
    { days: 30, label: '1 Month Enrolled', reward: 'Bronze Badge' },
    { days: 90, label: '3 Months Enrolled', reward: 'Silver Badge' },
    { days: 180, label: '6 Months Enrolled', reward: 'Gold Badge' },
    { days: 365, label: '1 Year Enrolled', reward: 'Platinum Badge' },
  ];
  const [showRewardsHistoryModal, setShowRewardsHistoryModal] = useState(false);
  const coverageDays = getCoverageDays();
  const earnedRewards = rewardMilestones.filter(r => coverageDays >= r.days);
  const lockedRewards = rewardMilestones.filter(r => coverageDays < r.days);
  const rewardHistory = earnedRewards.map(r => ({
    ...r,
    date: activeCoverage.enrollmentDate ? new Date(new Date(activeCoverage.enrollmentDate).getTime() + r.days * 24 * 60 * 60 * 1000) : null
  }));

  // Add address autocomplete state
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  // Add address autocomplete function
  const handleAddressInput = async (value) => {
    if (!value || value.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    setIsLoadingAddress(true);
    try {
      const response = await fetch(`https://api.geocod.io/v1.7/geocode?q=${encodeURIComponent(value)}&api_key=${process.env.NEXT_PUBLIC_GEOCODIO_API_KEY}`);
      const data = await response.json();
      
      if (data.results) {
        setAddressSuggestions(data.results.map(result => ({
          address: result.formatted_address,
          city: result.address_components.city,
          state: result.address_components.state,
          zipcode: result.address_components.zip
        })));
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  // Add address selection handler
  const handleAddressSelect = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      address: suggestion.address,
      city: suggestion.city,
      state: suggestion.state,
      zipCode: suggestion.zipcode
    }));
    setAddressSuggestions([]);
  };

  // Add these state variables at the top with other useState declarations
  const [showLeadSourceModal, setShowLeadSourceModal] = useState(false);
  const [showMessagingModal, setShowMessagingModal] = useState(false);
  const [messageSearch, setMessageSearch] = useState('');
  const [messageSearchResults, setMessageSearchResults] = useState([]);

  // Add this function to handle message search
  const handleMessageSearch = async (searchTerm) => {
    setMessageSearch(searchTerm);
    if (searchTerm.length < 2) {
      setMessageSearchResults([]);
      return;
    }

    try {
      // Search in both clients and agents collections
      const clientsRef = collection(db, 'clients');
      const agentsRef = collection(db, 'agents');
      
      const [clientsSnapshot, agentsSnapshot] = await Promise.all([
        query(clientsRef, where('firstName', '>=', searchTerm), where('firstName', '<=', searchTerm + '\uf8ff')),
        query(agentsRef, where('firstName', '>=', searchTerm), where('firstName', '<=', searchTerm + '\uf8ff'))
      ]);

      const clients = clientsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: 'client'
      }));

      const agents = agentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: 'agent'
      }));

      setMessageSearchResults([...clients, ...agents]);
    } catch (error) {
      console.error('Error searching for messages:', error);
    }
  };

  // Add this function to start a new chat
  const handleStartNewChat = (user) => {
    const chatData = {
      id: 'new',
      clientId: user.id,
      clientName: `${user.firstName} ${user.lastName}`,
      phone: user.phone,
      email: user.email,
      type: user.type,
      messages: []
    };
    handleOpenChat(chatData);
    setShowMessagingModal(false);
  };

  // Add state for new message input
  const [newMessage, setNewMessage] = useState('');

  // Add this state near the other useState declarations
  const [showMergeDropdown, setShowMergeDropdown] = useState(false);

  // Add state for rewards tab
  const [rewardsActiveSearch, setRewardsActiveSearch] = useState('');
  const [rewardsRestoredSearch, setRewardsRestoredSearch] = useState('');
  const [activeClients, setActiveClients] = useState([]);
  const [restoredClients, setRestoredClients] = useState([]);
  const [rewardsInactiveSearch, setRewardsInactiveSearch] = useState('');
  const [inactiveClients, setInactiveClients] = useState([]);

  // Fetch and filter clients for rewards tab
  useEffect(() => {
    if (activeTab === 'rewards') {
      const fetchClients = async () => {
        const applicationsRef = collection(db, 'applications');
        const snapshot = await getDocs(applicationsRef);
        const allClients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Active clients: status is Active, has clientId
        setActiveClients(allClients.filter(c => (c.status === 'Active' || c.status === 'active') && c.clientId));
        // Restored clients: has a lapse/restoration history (assume a field 'restorationHistory' or similar)
        setRestoredClients(allClients.filter(c => Array.isArray(c.restorationHistory) && c.restorationHistory.length > 0 && c.clientId));
        // Inactive clients: status is Inactive, has clientId
        setInactiveClients(allClients.filter(c => (c.status === 'Inactive' || c.status === 'inactive') && c.clientId));
      };
      fetchClients();
    }
  }, [activeTab]);

  // Campaign-based rewards example
  const campaignRewards = [
    {
      id: 'campaign1',
      name: 'Free Phone for Extended Coverage',
      description: 'Offer a free phone to clients who extend their coverage by 12 months.',
    },
    {
      id: 'campaign2',
      name: 'Gift Card for Referral',
      description: 'Give a $50 gift card to clients who refer a friend that enrolls.',
    },
  ];
  const [showAssignRewardModal, setShowAssignRewardModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedRewardClient, setSelectedRewardClient] = useState(null);

  // Add state for new event date modal
  const [showNewEventDateModal, setShowNewEventDateModal] = useState(false);
  const [newEventDate, setNewEventDate] = useState('');

  // Add state for new event fields
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStartTime, setNewEventStartTime] = useState('');
  const [newEventEndTime, setNewEventEndTime] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  // Replace newEventLocation with newEventMeetingLink
  const [newEventMeetingLink, setNewEventMeetingLink] = useState('');

  // Remove placeholder meetings
  const [events, setEvents] = useState([]);

  // Function to add a new event
  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  // Function to delete an event
  const deleteEvent = (index) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
  };

  // Function to modify an event
  const modifyEvent = (index, updatedEvent) => {
    const newEvents = [...events];
    newEvents[index] = updatedEvent;
    setEvents(newEvents);
  };

  // Add state for scheduled events
  const [scheduledEvents, setScheduledEvents] = useState([]);

  // Function to fetch events from Google Calendar API
  const fetchScheduledEvents = async () => {
    // Calendar functionality removed
          setScheduledEvents([]);
  };

  // Fetch events on component mount and daily
  useEffect(() => {
    fetchScheduledEvents();
    const interval = setInterval(fetchScheduledEvents, 86400000); // 24 hours
    return () => clearInterval(interval);
  }, []);

  const [auditFilter, setAuditFilter] = useState('all');
  const [auditSearch, setAuditSearch] = useState('');
  const [auditPage, setAuditPage] = useState(1);
  const itemsPerPage = 5;

  // Sample data arrays
  const allActivities = [
    {
      timestamp: '2024-03-15 14:30:22',
      user: 'John Smith',
      action: 'Login',
      transactionId: '-',
      details: 'Successful login from IP 192.168.1.1',
      status: 'Success'
    },
    {
      timestamp: '2024-03-15 14:35:45',
      user: 'John Smith',
      action: 'Reward Claimed',
      transactionId: 'REW-2024-03-15-001',
      details: 'Claimed $50 Amazon Gift Card',
      status: 'Success'
    },
    {
      timestamp: '2024-03-15 14:40:12',
      user: 'John Smith',
      action: 'Application Processed',
      transactionId: 'APP-2024-03-15-002',
      details: 'Processed application for Jane Doe',
      status: 'Info'
    }
  ];

  const loginEvents = [
    {
      timestamp: '2024-03-15 14:30:22',
      user: 'John Smith',
      ipAddress: '192.168.1.1',
      device: 'Chrome / Windows',
      status: 'Success'
    },
    {
      timestamp: '2024-03-15 13:15:10',
      user: 'John Smith',
      ipAddress: '192.168.1.1',
      device: 'Chrome / Windows',
      status: 'Success'
    },
    {
      timestamp: '2024-03-15 12:45:33',
      user: 'John Smith',
      ipAddress: '192.168.1.1',
      device: 'Chrome / Windows',
      status: 'Failed'
    }
  ];

  const rewardsTransactions = [
    {
      timestamp: '2024-03-15 14:35:45',
      user: 'John Smith',
      transactionId: 'REW-2024-03-15-001',
      type: 'Gift Card',
      amount: '$50.00',
      status: 'Completed'
    },
    {
      timestamp: '2024-03-15 14:50:15',
      user: 'John Smith',
      transactionId: 'REW-2024-03-15-004',
      type: 'Points',
      amount: '100 pts',
      status: 'Completed'
    },
    {
      timestamp: '2024-03-14 16:20:30',
      user: 'John Smith',
      transactionId: 'REW-2024-03-14-003',
      type: 'Gift Card',
      amount: '$25.00',
      status: 'Completed'
    }
  ];

  const dataChanges = [
    {
      timestamp: '2024-03-15 15:20:33',
      user: 'John Smith',
      action: 'Update',
      recordId: 'CLI-2024-001',
      changes: 'Updated contact information',
      status: 'Success'
    },
    {
      timestamp: '2024-03-15 15:15:22',
      user: 'John Smith',
      action: 'Create',
      recordId: 'CLI-2024-002',
      changes: 'Created new client record',
      status: 'Success'
    },
    {
      timestamp: '2024-03-15 15:10:15',
      user: 'John Smith',
      action: 'Delete',
      recordId: 'CLI-2024-003',
      changes: 'Deleted duplicate record',
      status: 'Warning'
    }
  ];

  const settingsChanges = [
    {
      timestamp: '2024-03-15 14:55:00',
      user: 'John Smith',
      setting: 'Notifications',
      oldValue: 'Email Only',
      newValue: 'Email & SMS',
      status: 'Success'
    },
    {
      timestamp: '2024-03-15 14:52:30',
      user: 'John Smith',
      setting: 'Theme',
      oldValue: 'Light',
      newValue: 'Dark',
      status: 'Success'
    },
    {
      timestamp: '2024-03-15 14:50:15',
      user: 'John Smith',
      setting: 'Language',
      oldValue: 'English',
      newValue: 'Spanish',
      status: 'Warning'
    }
  ];

  const applicationEvents = [
    {
      timestamp: '2024-03-15 14:40:12',
      user: 'John Smith',
      applicationId: 'APP-2024-03-15-002',
      action: 'Processed',
      client: 'Jane Doe',
      status: 'Success'
    },
    {
      timestamp: '2024-03-15 14:35:30',
      user: 'John Smith',
      applicationId: 'APP-2024-03-15-001',
      action: 'Submitted',
      client: 'John Johnson',
      status: 'Pending'
    },
    {
      timestamp: '2024-03-15 14:30:15',
      user: 'John Smith',
      applicationId: 'APP-2024-03-15-000',
      action: 'Rejected',
      client: 'Sarah Smith',
      status: 'Failed'
    }
  ];

  const callEvents = [
    {
      timestamp: '2024-03-15 14:45:30',
      user: 'John Smith',
      callId: 'CALL-2024-03-15-003',
      duration: '15:30',
      client: 'Mike Brown',
      status: 'Completed'
    },
    {
      timestamp: '2024-03-15 14:30:15',
      user: 'John Smith',
      callId: 'CALL-2024-03-15-002',
      duration: '08:45',
      client: 'Lisa White',
      status: 'Completed'
    },
    {
      timestamp: '2024-03-15 14:15:00',
      user: 'John Smith',
      callId: 'CALL-2024-03-15-001',
      duration: '00:00',
      client: 'Tom Black',
      status: 'Missed'
    }
  ];

  // Calculate filtered count based on current filter
  const getFilteredCount = () => {
    let data;
    switch (auditFilter) {
      case 'all':
        data = allActivities;
        break;
      case 'login':
        data = loginEvents;
        break;
      case 'rewards':
        data = rewardsTransactions;
        break;
      case 'data':
        data = dataChanges;
        break;
      case 'settings':
        data = settingsChanges;
        break;
      case 'applications':
        data = applicationEvents;
        break;
      case 'calls':
        data = callEvents;
        break;
      default:
        data = allActivities;
    }
    return data.filter(item => 
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(auditSearch.toLowerCase())
      )
    ).length;
  };

  const filteredCount = getFilteredCount();

  // At the top of the Office component, with other useState calls:
  const [inRoom, setInRoom] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('googleMeetsInRoom');
      return stored === null ? false : stored === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('googleMeetsInRoom', inRoom ? 'true' : 'false');
    }
  }, [inRoom]);

  const [usersInRoom, setUsersInRoom] = useState([
    { name: 'John Doe', initials: 'JD', color: 'primary' },
    { name: 'Jane Smith', initials: 'JS', color: 'secondary' },
    { name: 'Mike Johnson', initials: 'MJ', color: 'info' }
  ]);
  const [meetLink, setMeetLink] = useState('https://meet.google.com/abc-defg-hij');
  const [editingLink, setEditingLink] = useState(false);

  // Add these state variables near the other email-related state
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeEmail, setComposeEmail] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    content: '',
    attachments: []
  });

  // Add these handlers near the other email-related handlers
  const handleComposeEmailChange = (field, value) => {
    setComposeEmail(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleComposeSubmit = async () => {
    // This will be replaced with actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add the sent email to the emailsData array
      const newEmail = {
        id: `email-${Date.now()}`,
        from: 'You',
        to: composeEmail.to,
        subject: composeEmail.subject,
        content: composeEmail.content,
        time: 'Just now',
        read: true,
        starred: false,
        folder: 'sent'
      };
      
      setEmailsData(prev => [newEmail, ...prev]);
      setShowComposeModal(false);
      setComposeEmail({
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        content: '',
        attachments: []
      });
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error (show error message, etc.)
    }
  };

  // Add to the email state:
  const [composeMode, setComposeMode] = useState('new'); // 'new' or 'reply'
  const [replyToEmail, setReplyToEmail] = useState(null);

  // Update handleComposeEmailChange and handleComposeSubmit as needed (no change needed for API readiness)

  // Add a function to open the compose modal for reply
  const handleReply = (email) => {
    setComposeMode('reply');
    setReplyToEmail(email);
    setComposeEmail({
      to: email.from,
      cc: '',
      bcc: '',
      subject: email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`,
      content: `\n\nOn ${email.time}, ${email.from} wrote:\n${email.content}`,
      attachments: []
    });
    setShowComposeModal(true);
  };

  // When opening a new compose, reset mode
  const handleNewCompose = () => {
    setComposeMode('new');
    setReplyToEmail(null);
    setComposeEmail({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      content: '',
      attachments: []
    });
    setShowComposeModal(true);
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
          
          /* New styles for mobile view */
          .workspace-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .welcome-section {
            margin-bottom: 15px;
            width: 100%;
          }
          
          .welcome-section h1 {
            font-size: 1.5rem;
          }
          
          .quick-actions {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .status-indicators {
            margin-bottom: 10px;
            width: 100%;
            justify-content: center;
          }
          
          .status-text {
            display: none;
          }

          .meeting-room-indicator .ms-1 {
            display: inline-block !important;
            margin-left: 0 !important;
          }
          
          /* Calendar styling for mobile */
          .home-calendar-row {
            flex-direction: column;
          }
          
          .calendar-card {
            margin-bottom: 1rem !important;
          }
          
          /* Clock styles for mobile */
          .analog-clock-container {
            margin-bottom: 1rem !important;
          }
          .analog-clock {
            width: 100px !important;
            height: 100px !important;
          }
          .calendar-clock-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 1rem;
          }
          .digital-time h4 {
            font-size: 1.2rem;
          }
          .digital-time p {
            font-size: 0.8rem;
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

        .application-card {
          transition: all 0.2s ease-in-out;
          border: 1px solid #e9ecef;
        }

        .application-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .application-details p {
          color: #6c757d;
          font-size: 0.9rem;
        }

        .application-details i {
          width: 16px;
        }

        .applications-list {
          max-height: calc(100vh - 300px);
          overflow-y: auto;
          padding-right: 10px;
        }

        .applications-list::-webkit-scrollbar {
          width: 6px;
        }

        .applications-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .applications-list::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }

        .applications-list::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
      <Container fluid>
        <div className="workspace-header d-flex justify-content-between align-items-center">
          <div className="welcome-section">
            <h1>Office Workspace</h1>
            <p className="text-muted">Welcome back! Here's your overview for today</p>
          </div>
          <div className="quick-actions d-flex align-items-center">
            {/* Meeting Room Status */}
            <div className="status-indicators d-flex align-items-center gap-2 me-3">
              {/* Meeting Room Status */}
              <Button 
                variant="info" 
                size="sm"
                className={`d-flex align-items-center gap-2 meeting-room-indicator ${isInMeeting ? 'active' : ''}`}
                onClick={() => setIsInMeeting(!isInMeeting)}
                title={currentMeetingRoom}
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
                  agentStatus === 'not_connected' ? "secondary" :
                  agentStatus.startsWith('wrap_up') ? "warning" : 
                  "success"
                } 
                size="sm"
                className="d-flex align-items-center gap-2"
                onClick={() => {
                  if (!isDialing && agentStatus !== 'on_call' && isConnected) {
                    setActiveTab('dialer');
                    setAgentStatus('available');
                  }
                }}
                disabled={isDialing || !isConnected}
                data-status={agentStatus}
                title={
                  agentStatus === 'on_call' ? "On Call" :
                  agentStatus === 'break' ? "On Break" :
                  agentStatus === 'lunch' ? "Lunch Break" :
                  agentStatus === 'meeting' ? "In Meeting" :
                  agentStatus === 'training' ? "Training" :
                  agentStatus === 'admin' ? "Admin Work" :
                  agentStatus === 'technical_issue' ? "System Down" :
                  agentStatus === 'not_connected' ? "Not Connected" :
                  agentStatus === 'personal' ? "Personal Time" :
                  agentStatus.startsWith('wrap_up') ? "Wrap-Up" : 
                  "Ready"
                }
              >
                {agentStatus === 'on_call' ? <FaPhone className="pulse" /> :
                 agentStatus === 'break' || agentStatus === 'lunch' ? <FaCoffee /> :
                 agentStatus === 'meeting' ? <FaUsers /> :
                 agentStatus === 'training' ? <FaGraduationCap /> :
                 agentStatus === 'admin' ? <FaCog /> :
                 agentStatus === 'technical_issue' ? <FaExclamationTriangle /> :
                 agentStatus === 'not_connected' ? <FaPhoneSlash /> :
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
                   agentStatus === 'not_connected' ? "Not Connected" :
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
            
            {/* Profile Icon */}
            <div className="profile-section">
              <Dropdown>
                <Dropdown.Toggle 
                  variant="light" 
                  className="rounded-circle p-1" 
                  style={{ width: '40px', height: '40px' }}
                  title="User Profile"
                  bsPrefix="dropdown-toggle-no-arrow"
                >
                  <FaUserCircle size={24} />
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={() => setActiveTab('settings')}>
                    <FaUserCog className="me-2" /> Profile Settings
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setActiveTab('settings')}>
                    <FaKey className="me-2" /> Change Password
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item 
                    onClick={async () => {
                      try {
                        await auth.signOut();
                        Cookies.remove('firebase-token');
                        localStorage.removeItem('user');
                        router.push('/');
                      } catch (error) {
                        console.error('Logout error:', error);
                      }
                    }}
                    className="text-danger"
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>

        <Nav variant="pills" className="workspace-nav mb-4">
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
            <Nav.Link active={activeTab === 'email'} onClick={() => setActiveTab('email')}>
              <FaEnvelope className="me-2" /> Email
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>
              <FaComments className="me-2" /> Chat
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'drive'} onClick={() => setActiveTab('drive')}>
              <FaGoogleDrive className="me-2" /> Drive
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'meets'} onClick={() => setActiveTab('meets')}>
              <FaVideo className="me-2" /> Google Meets
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {activeTab === 'home' && (
          <div>
            <h3>Home</h3>
            <p>Welcome to the office workspace home tab. Overview and dashboard content will appear here.</p>
          </div>
        )}
        {activeTab === 'dialer' && (
          <div>
            <h3>Dialer</h3>
            <p>This is the Dialer tab. Phone dialer functionality will appear here.</p>
          </div>
        )}
        {activeTab === 'email' && (
          <Row className="g-0 email-tab-row flex-wrap" style={{ minHeight: 600, background: '#f5f5f7', borderRadius: 18 }}>
            {/* Sidebar */}
            <Col xs={12} md={3} className="d-flex flex-column align-items-start p-4 email-sidebar" style={{ background: '#fff', borderTopLeftRadius: 18, borderBottomLeftRadius: 18, borderRight: '1px solid #ececec' }}>
              <Button 
                variant="danger" 
                className="mb-4 w-100 py-2 rounded-3 shadow-sm" 
                style={{ fontWeight: 500, fontSize: 16, letterSpacing: 0.5 }}
                onClick={handleNewCompose}
              >
                + Compose
              </Button>
              <ListGroup variant="flush" className="w-100">
                <ListGroup.Item 
                  action 
                  active={emailFolder === 'inbox'} 
                  onClick={() => setEmailFolder('inbox')}
                  className="d-flex align-items-center gap-2 rounded-3 mb-2 border-0" 
                  style={{ fontWeight: 500, background: emailFolder === 'inbox' ? '#f5f5f7' : 'transparent' }}
                >
                  <FaUserCircle style={{ fontSize: 20, color: '#1a73e8' }} /> Inbox
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  active={emailFolder === 'sent'} 
                  onClick={() => setEmailFolder('sent')}
                  className="d-flex align-items-center gap-2 rounded-3 mb-2 border-0"
                  style={{ fontWeight: 500, background: emailFolder === 'sent' ? '#f5f5f7' : 'transparent' }}
                >
                  <FaPaperPlane style={{ fontSize: 20, color: '#5f6368' }} /> Sent
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  active={emailFolder === 'starred'} 
                  onClick={() => setEmailFolder('starred')}
                  className="d-flex align-items-center gap-2 rounded-3 mb-2 border-0"
                  style={{ fontWeight: 500, background: emailFolder === 'starred' ? '#f5f5f7' : 'transparent' }}
                >
                  <FaStar style={{ fontSize: 20, color: '#fbbc04' }} /> Starred
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  active={emailFolder === 'trash'} 
                  onClick={() => setEmailFolder('trash')}
                  className="d-flex align-items-center gap-2 rounded-3 border-0"
                  style={{ fontWeight: 500, background: emailFolder === 'trash' ? '#f5f5f7' : 'transparent' }}
                >
                  <FaTrash style={{ fontSize: 20, color: '#5f6368' }} /> Trash
                </ListGroup.Item>
              </ListGroup>
            </Col>
            {/* Main Email List and Reading Pane */}
            <Col xs={12} md={9} className="p-0 email-main-col">
              <div className="d-flex flex-column flex-md-row h-100" style={{ background: '#fff', borderTopRightRadius: 18, borderBottomRightRadius: 18 }}>
                {/* Email List */}
                <div className="flex-grow-1 email-list-col" style={{ minWidth: 0, borderRight: selectedEmail ? '1px solid #ececec' : 'none', maxWidth: selectedEmail ? '50%' : '100%' }}>
                  <div className="d-flex align-items-center px-4 py-3 border-bottom" style={{ background: '#f8f9fa' }}>
                    <Form.Control type="text" placeholder="Search mail" className="rounded-3 bg-light border-0 px-3 py-2" style={{ fontSize: 16, maxWidth: 340 }} />
                  </div>
                  <div className="overflow-auto" style={{ minHeight: 400, maxHeight: '60vh' }}>
                    {emailsData.length === 0 ? (
                      <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center p-4">
                        <FaEnvelope style={{ fontSize: 48, color: '#5f6368', marginBottom: 16 }} />
                        <h4 style={{ color: '#202124', marginBottom: 8 }}>No emails available</h4>
                        <p style={{ color: '#5f6368', maxWidth: 400 }}>
                          {emailFolder === 'inbox' ? 'Your inbox is empty. Emails will appear here when the API is connected.' :
                           emailFolder === 'sent' ? 'No sent emails yet. Sent emails will appear here when the API is connected.' :
                           emailFolder === 'starred' ? 'No starred emails yet. Star important emails to see them here.' :
                           'No emails in trash. Deleted emails will appear here.'}
                        </p>
                      </div>
                    ) : (
                      <ListGroup variant="flush">
                        {emailsData
                          .filter(email => email.folder === emailFolder || (emailFolder === 'starred' && email.starred))
                          .map(email => (
                            <ListGroup.Item 
                              key={email.id}
                              action 
                              active={selectedEmail?.id === email.id}
                              onClick={() => setSelectedEmail(email)}
                              className={`d-flex align-items-center gap-3 border-0 px-4 py-3 ${!email.read ? 'email-row-unread' : 'email-row'}`} 
                              style={{ 
                                background: selectedEmail?.id === email.id ? '#e8f0fe' : 'transparent',
                                borderRadius: 12, 
                                cursor: 'pointer' 
                              }}
                            >
                              <FaUserCircle style={{ color: email.read ? '#5f6368' : '#1a73e8', fontSize: 22 }} />
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-center">
                                  <span style={{ fontWeight: 600, fontSize: 16 }}>{email.from}</span>
                                  <span className="text-muted small">{email.time}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span style={{ fontWeight: 500 }}>{email.subject}</span>
                                  {!email.read && (
                                    <span className="badge bg-primary ms-2" style={{ fontSize: 10 }}>UNREAD</span>
                                  )}
                                </div>
                                <div className="text-muted small text-truncate" style={{ maxWidth: 200 }}>{email.content}</div>
                              </div>
                            </ListGroup.Item>
                          ))}
                      </ListGroup>
                    )}
                  </div>
                </div>
                {/* Reading Pane (only on desktop/tablet, or as overlay on mobile) */}
                {selectedEmail && (
                  <div className="email-reading-pane flex-grow-1 p-4" style={{ minWidth: 0, maxWidth: '50%', background: '#f8f9fa', borderTopRightRadius: 18, borderBottomRightRadius: 18 }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h5 className="mb-1">{selectedEmail.subject}</h5>
                        <div className="text-muted small">From: {selectedEmail.from}</div>
                        <div className="text-muted small">To: {selectedEmail.to || 'me'}</div>
                        <div className="text-muted small">{selectedEmail.time}</div>
                      </div>
                      <Button variant="outline-secondary" size="sm" onClick={() => setSelectedEmail(null)}>
                        <FaTimes />
                      </Button>
                    </div>
                    <div className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>{selectedEmail.content}</div>
                    <div className="d-flex gap-2">
                      <Button variant="primary" onClick={() => handleReply(selectedEmail)}>
                        <FaReply className="me-2" /> Reply
                      </Button>
                      {/* Add more actions if needed */}
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        )}
        {activeTab === 'chat' && (
          <Row style={{ height: '60vh' }}>
            <Col md={4} className="border-end p-0">
              <Card className="h-100 rounded-0">
                <Card.Header>
                  <Form.Control type="text" placeholder="Search chats..." />
                </Card.Header>
                <Card.Body className="p-0">
                  <ListGroup variant="flush">
                    <ListGroup.Item action active>
                      <div className="d-flex align-items-center">
                        <div className="avatar-circle me-3 bg-light d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, borderRadius: '50%' }}>
                          <span className="text-muted">JD</span>
                        </div>
                        <div>
                          <strong>John Doe</strong>
                          <div className="text-muted small">Hey, are you available?</div>
                        </div>
                        <Badge bg="primary" className="ms-auto">2</Badge>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item action>
                      <div className="d-flex align-items-center">
                        <div className="avatar-circle me-3 bg-light d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, borderRadius: '50%' }}>
                          <span className="text-muted">JS</span>
                        </div>
                        <div>
                          <strong>Jane Smith</strong>
                          <div className="text-muted small">Let's meet at 2pm</div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8} className="p-0">
              <Card className="h-100 rounded-0">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="avatar-circle me-3 bg-light d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, borderRadius: '50%' }}>
                      <span className="text-muted">JD</span>
                    </div>
                    <div>
                      <strong>John Doe</strong>
                      <div className="text-muted small">Online</div>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body style={{ overflowY: 'auto', height: '40vh' }}>
                  <div className="mb-3">
                    <div className="bg-light p-2 rounded mb-1" style={{ maxWidth: '70%' }}><strong>You:</strong> Hi John!</div>
                    <div className="bg-primary text-white p-2 rounded mb-1 ms-auto" style={{ maxWidth: '70%' }}><strong>John:</strong> Hey, are you available?</div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Form className="d-flex">
                    <Form.Control type="text" placeholder="Type a message..." />
                    <Button variant="primary" className="ms-2">Send</Button>
                  </Form>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        )}
        {activeTab === 'drive' && (
          <div>
            <h3>Drive</h3>
            <p>This is the Drive tab. Google Drive integration will appear here.</p>
          </div>
        )}
        {activeTab === 'meets' && (
          <Row className="g-0" style={{ minHeight: 600, background: '#23272f', borderRadius: 18 }}>
            <Col md={12} className="d-flex flex-column align-items-center justify-content-center p-0" style={{ minHeight: 600 }}>
              <div className="d-flex flex-column align-items-center justify-content-center w-100" style={{ maxWidth: 900 }}>
                <div className="bg-dark rounded-4 shadow-lg mb-4 d-flex align-items-center justify-content-center position-relative" style={{ width: '100%', height: 340, background: 'linear-gradient(135deg, #23272f 80%, #2d313a 100%)' }}>
                  {inRoom ? (
                    <>
                      {/* X button */}
                      <Button
                        variant="light"
                        className="position-absolute"
                        style={{ top: 18, right: 18, borderRadius: '50%', width: 36, height: 36, padding: 0, zIndex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                        onClick={() => setInRoom(false)}
                        title="Close Room View"
                      >
                        <span style={{ fontSize: 22, fontWeight: 700, color: '#23272f', lineHeight: 1 }}>×</span>
                      </Button>
                      <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                        <div className="mb-4 d-flex flex-row gap-4 justify-content-center">
                          {usersInRoom.map((user, idx) => (
                            <div key={idx} className={`rounded-circle bg-${user.color} d-flex align-items-center justify-content-center`} style={{ width: 64, height: 64, fontWeight: 700, color: '#fff', fontSize: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                              {user.initials}
                            </div>
                          ))}
                        </div>
                        <span className="text-white-50 mb-2" style={{ fontSize: 20, fontWeight: 500 }}>You are in the room</span>
                        <div className="d-flex gap-3 mt-2">
                          <Button variant="danger" className="rounded-3 px-4 py-2" style={{ fontWeight: 500, fontSize: 16 }} onClick={() => setInRoom(false)}>Leave Room</Button>
                          <Button variant="success" className="rounded-3 px-4 py-2" style={{ fontWeight: 500, fontSize: 16 }} onClick={() => window.open(meetLink, '_blank')}>Go to Google Meet</Button>
                          <Button variant="outline-light" className="rounded-3 px-4 py-2" style={{ fontWeight: 500, fontSize: 16 }} onClick={() => setEditingLink(true)}>Change Room</Button>
                        </div>
                        {editingLink && (
                          <Form className="mt-3 d-flex gap-2 align-items-center" onSubmit={e => { e.preventDefault(); setEditingLink(false); }}>
                            <Form.Control type="text" value={meetLink} onChange={e => setMeetLink(e.target.value)} style={{ minWidth: 320 }} />
                            <Button type="submit" variant="primary">Save</Button>
                            <Button variant="secondary" onClick={() => setEditingLink(false)}>Cancel</Button>
                          </Form>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                      <span className="text-white-50 mb-3" style={{ fontSize: 22, fontWeight: 500 }}>You are not in the room</span>
                      <Button variant="success" className="rounded-3 px-4 py-2" style={{ fontWeight: 500, fontSize: 16 }} onClick={() => setInRoom(true)}>Join Room</Button>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        )}

        {activeTab === 'home' && (
          <Container fluid className="px-0">
            <Row className="gx-4 gy-4 w-100 mx-0 home-calendar-row">
              {/* Calendar Section - now on the left */}
              <Col md={6} className="px-2">
                <Card className="dashboard-card h-100 w-100" style={{ maxWidth: "100%" }}>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <FaCalendar className="me-2" /> Calendar
                    </h5>
                    <div className="d-flex align-items-center">
                      {/* Small blue clock at the top */}
                      <div className="analog-clock-container me-3">
                        <div className="analog-clock rounded-circle d-flex align-items-center justify-content-center" 
                             style={{ 
                               width: '32px', 
                               height: '32px', 
                               border: '2px solid #0d6efd', 
                               position: 'relative',
                               background: '#e6f0ff'
                             }}>
                          {/* Hour hand */}
                          <div style={{ 
                            position: 'absolute', 
                            width: '1.5px', 
                            height: '10px', 
                            background: '#0d6efd', 
                            bottom: '50%',
                            left: 'calc(50% - 0.75px)',
                            transformOrigin: 'bottom center',
                            transform: `rotate(${(currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5}deg)`,
                            zIndex: 2
                          }}></div>
                          
                          {/* Minute hand */}
                          <div style={{ 
                            position: 'absolute', 
                            width: '1px', 
                            height: '12px', 
                            background: '#0d6efd', 
                            bottom: '50%',
                            left: 'calc(50% - 0.5px)',
                            transformOrigin: 'bottom center',
                            transform: `rotate(${currentTime.getMinutes() * 6}deg)`,
                            zIndex: 1
                          }}></div>
                          
                          {/* Center dot */}
                          <div style={{ 
                            position: 'absolute', 
                            width: '3px', 
                            height: '3px', 
                            background: '#0d6efd', 
                            borderRadius: '50%',
                            top: 'calc(50% - 1.5px)',
                            left: 'calc(50% - 1.5px)',
                            zIndex: 4
                          }}></div>
                        </div>
                      </div>
                      {clockedIn ? (
                        <Badge bg="success" className="p-2">
                          <FaUserCheck className="me-1" /> Clocked In
                        </Badge>
                      ) : (
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          onClick={() => setShowClockInModal(true)}
                        >
                          <FaUserClock className="me-1" /> Clock In
                        </Button>
                      )}
                    </div>
                  </Card.Header>
                  <Card.Body className="p-3" style={{ height: "550px" }}>
                    {/* Calendar view - full width */}
                    <div className="calendar-view w-100">
                      <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
                        <h5 className="current-month mb-0">{now.toLocaleString('default', { month: 'long', year: 'numeric' })}</h5>
                        <div className="d-flex align-items-center">
                          <Button variant="outline-primary" size="sm" className="me-2" onClick={() => setShowNewEventDateModal(true)}>
                            <FaPlus />
                          </Button>
                          <div className="digital-time text-muted">
                            <small>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                          </div>
                        </div>
                      </div>
                      <div className="calendar-grid" style={{ 
                        height: "450px", 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(7, 1fr)', 
                        gap: '4px', 
                        width: '100%' 
                      }}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="calendar-day-header" style={{ 
                            fontWeight: 'bold', 
                            background: '#f8f9fa',
                            textAlign: 'center',
                            padding: '8px 0',
                            fontSize: '14px',
                            borderRadius: '4px'
                          }}>{day}</div>
                        ))}
                        {calendarDays.map((day, index) => {
                          if (day === null) return <div key={`empty-${index}`} className="calendar-day" />;
                          
                          const dayEvents = events.filter(event => new Date(event.date).getDate() === day);
                          const isToday = day === currentTime.getDate() && 
                            currentTime.getMonth() === now.getMonth() && 
                            currentTime.getFullYear() === now.getFullYear();
                          
                          return (
                            <div 
                              key={day} 
                              className={`calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                              onClick={() => {
                                if (dayEvents.length > 0) {
                                  setSelectedDateEvents(dayEvents);
                                  setShowEventsModal(true);
                                }
                              }}
                              style={{ 
                                cursor: dayEvents.length > 0 ? 'pointer' : 'default',
                                height: '65px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                position: 'relative',
                                padding: '4px',
                                background: isToday ? '#e6f0ff' : 'white',
                                boxShadow: isToday ? '0 0 0 2px #0d6efd' : 'none'
                              }}
                            >
                              <div className="calendar-day-number" style={{
                                fontWeight: 'bold',
                                fontSize: '14px',
                                marginBottom: '4px'
                              }}>{day}</div>
                              {dayEvents.length > 0 && <div className="event-indicator" style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#0d6efd',
                                position: 'absolute',
                                bottom: '6px',
                                left: '50%',
                                transform: 'translateX(-50%)'
                              }}></div>}
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Clock In/Out Status - below calendar */}
                      {clockedIn && (
                        <div className="status-card p-3 bg-light rounded mt-3 text-center w-100">
                          <p className="text-muted mb-1">Clocked in at {clockInTime?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                          <p className="text-muted small mb-0">Working time: {formatDuration(Math.floor((currentTime - clockInTime) / 1000))}</p>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              {/* Schedule column - now on the right */}
              <Col md={6} className="px-2">
                <Card className="dashboard-card h-100 w-100" style={{ maxWidth: "100%" }}>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <h5 className="mb-0 me-3">
                        <FaVideo className="me-2" /> Upcoming Schedule
                      </h5>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => window.open('https://meet.google.com/abc123', '_blank')}
                      >
                        <FaVideo className="me-1" /> Main Office
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body style={{ height: "550px", overflowY: "auto" }} className="p-3">
                    <div className="meetings-list">
                      <div className="text-center text-muted py-5">
                        <p className="mb-2">No upcoming events scheduled</p>
                        <small>Use the + button in the calendar to add new events</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Events Modal */}
            <Modal show={showEventsModal} onHide={() => setShowEventsModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Events for {selectedDate}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedDateEvents.map((event, index) => (
                  <div key={index} className="event-item p-3 mb-3 border rounded shadow-sm" 
                       style={{ background: index % 2 === 0 ? '#f8f9ff' : 'white' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">{event.title}</h5>
                      <Badge bg={event.type === 'Training' ? 'info' : 'primary'}>{event.type}</Badge>
                    </div>
                    <div className="d-flex mb-2">
                      <div className="me-3">
                        <FaClock className="me-1 text-muted" /> {event.startTime} - {event.endTime}
                      </div>
                      <div>
                        <FaUsers className="me-1 text-muted" /> {event.participants} Participants
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => modifyEvent(index, event)}>Edit</Button>
                      <Button variant="danger" size="sm" onClick={() => deleteEvent(index)}>Delete</Button>
                    </div>
                  </div>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEventsModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => setShowNewEventDateModal(true)}>
                  Add Event
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Clock In Modal */}
            <Modal show={showClockInModal} onHide={() => setShowClockInModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Clock In</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>You are about to clock in for today's work session.</p>
                <p className="mb-0 mt-3"><strong>Current Time:</strong> {currentTime.toLocaleTimeString()}</p>
                <p><strong>Date:</strong> {currentTime.toLocaleDateString()}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowClockInModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleClockIn}>
                  <FaUserCheck className="me-1" /> Confirm Clock In
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
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
                        value={isConnected ? agentStatus : 'not_connected'}
                        onChange={(e) => {
                          if (isConnected || e.target.value === 'not_connected') {
                            setAgentStatus(e.target.value);
                          }
                        }}
                        className="form-select-sm"
                        style={{ width: '140px' }}
                        disabled={!isConnected}
                      >
                        {agentStatusCodes.filter(status => isConnected || status.value === 'not_connected').map((status) => (
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
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {/* Enrollment Title and Merge Dropdown */}
                        <div className="d-flex flex-column align-items-start mb-3">
                          <h4 className="mb-1">{enrollmentTitle}</h4>
                          <Dropdown show={showMergeDropdown} onToggle={() => setShowMergeDropdown(!showMergeDropdown)}>
                            <Dropdown.Toggle as="div" className="d-flex gap-3 mt-2 p-0 border-0 bg-transparent" style={{cursor: 'pointer'}} id="merge-dropdown">
                              <Badge bg="info" className="agent-id-badge">
                                <FaUser className="me-1" /> Agent ID: {formData.agentId || 'N/A'}
                              </Badge>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {formData.agentId ? (
                                <Dropdown.Item onClick={() => {/* show agent profile logic here */}}>
                                  Show Agent Profile
                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item disabled>Agent Not Assigned</Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="d-flex gap-3 mt-2">
                          <Badge bg="info" className="agent-id-badge">
                            <FaUser className="me-1" /> Agent ID: {formData.agentId || 'N/A'}
                          </Badge>
                          <Badge bg="primary" className="client-id-badge">
                            <FaFileAlt className="me-1" /> Client ID: {formData.clientId || 'N/A'}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => {
                          // Reset form data
                          setFormData({
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
                            hasVoiceRecording: false,
                            effectiveDate: '',
                            policyId: '',
                            spouseSSN: '',
                            ssn: '',
                            willBeClaimedOnTaxes: '',
                            isWebLead: false,
                            // Add all other fields you use in the form, with default values
                          });
                          setEnrollmentTitle('Untitled Enrollment');
                        }}
                      >
                        <FaTimes className="me-1" /> Reset Form
                      </Button>
                    </div>
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
                            value={enrollmentSearch}
                            onChange={e => setEnrollmentSearch(e.target.value)}
                          />
                          <Button variant="primary">
                            <FaSearch className="me-2" />
                            Search
                          </Button>
                        </div>
                      </Form.Group>
                    </div>
                    {/* Applicants Results */}
                    <div className="mb-4">
                      {enrollmentSearch.trim() !== '' && showSearchResults && (
                        <div className="search-results mt-2">
                          {filteredEnrollmentApplicants.length === 0 ? (
                            <div className="text-muted">No applicants found.</div>
                          ) : (
                            <ListGroup>
                              {filteredEnrollmentApplicants.map(app => (
                                <ListGroup.Item 
                                  key={app.id} 
                                  className="d-flex justify-content-between align-items-center"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleApplicantSelect(app)}
                                >
                                  <div>
                                    <strong>{app.firstName} {app.lastName}</strong> <span className="text-muted">({app.email}, {app.phone})</span>
                                  </div>
                                  <Badge bg={app.status === 'Confirmed' ? 'success' : 'secondary'}>{app.status || 'Pending'}</Badge>
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Enrollment Form */}
                    <Form>
                      {/* Lead Source Indicator */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Lead Source</h6>
                        <div className="lead-source-indicator p-3 border rounded">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="lead-source-icon me-3">
                                {formData.leadSource === 'web' && <FaGlobe size={24} className="text-primary" />}
                                {formData.leadSource === 'snapchat' && <FaSnapchat size={24} className="text-yellow" />}
                                {formData.leadSource === 'tiktok' && <FaTiktok size={24} className="text-dark" />}
                                {formData.leadSource === 'instagram' && <FaInstagram size={24} className="text-danger" />}
                                {formData.leadSource === 'facebook' && <FaFacebook size={24} className="text-primary" />}
                                {formData.leadSource === 'google' && <FaGoogle size={24} className="text-danger" />}
                                {formData.leadSource === 'community' && <FaUsers size={24} className="text-success" />}
                                {formData.leadSource === 'referral' && <FaUserFriends size={24} className="text-info" />}
                                {!formData.leadSource && <FaUserPlus size={24} className="text-primary" />}
                              </div>
                              <div>
                                <h6 className="mb-1">
                                  {formData.leadSource ? 
                                    formData.leadSource.charAt(0).toUpperCase() + formData.leadSource.slice(1) : 
                                    'Direct Lead'}
                                </h6>
                                <p className="text-muted mb-0">
                                  {formData.leadSource ? 
                                    `Added through ${formData.leadSource}` : 
                                    'Added through direct contact'}
                                </p>
                              </div>
                            </div>
                            <div className="text-end">
                              <Badge bg="secondary" className="mb-2">
                                Lead ID: {formData.lead_id || formData.leadId || 'N/A'}
                              </Badge>
                              <div className="d-flex gap-2 justify-content-end">
                                <Button 
                                  variant="outline-secondary" 
                                  size="sm"
                                  onClick={() => setShowLeadSourceModal(true)}
                                >
                                  <FaEdit className="me-1" /> Change Source
                                </Button>
                              </div>
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
                              />
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
                              <div className="d-flex align-items-center gap-2">
                                <Form.Control 
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="(XXX) XXX-XXXX"
                                  maxLength="14"
                                  isInvalid={!!validationErrors.phone}
                                />
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => setShowMessagingModal(true)}
                                  title="Open Chat"
                                >
                                  <FaComments />
                                </Button>
                              </div>
                              {validationErrors.phone && (
                                <Form.Text className="text-danger">{validationErrors.phone}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group className="mb-3">
                              <Form.Label>Will be claimed on taxes?</Form.Label>
                              <Form.Select
                                name="willBeClaimedOnTaxes"
                                value={formData.willBeClaimedOnTaxes}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.willBeClaimedOnTaxes}
                              >
                                <option value="">Select option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Form.Select>
                              {validationErrors.willBeClaimedOnTaxes && (
                                <Form.Text className="text-danger">{validationErrors.willBeClaimedOnTaxes}</Form.Text>
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
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Spouse SSN</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="spouseSSN"
                                    value={formData.spouseSSN}
                                    onChange={(e) => {
                                      const formattedSSN = formatSSN(e.target.value);
                                      setFormData(prev => ({
                                        ...prev,
                                        spouseSSN: formattedSSN
                                      }));
                                    }}
                                    placeholder="###-##-####"
                                    maxLength="11"
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
                                    <Col md={4}>
                                      <Form.Group className="mb-3">
                                        <Form.Label>SSN</Form.Label>
                                        <Form.Control 
                                          type="text"
                                          placeholder="###-##-####"
                                          maxLength="11"
                                          value={child.ssn}
                                          onChange={(e) => {
                                            const formattedSSN = formatSSN(e.target.value);
                                            updateChild(index, 'ssn', formattedSSN);
                                          }}
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
                                onChange={(e) => {
                                  handleInputChange(e);
                                  handleAddressInput(e.target.value);
                                }}
                                placeholder="Enter street address"
                              />
                              {isLoadingAddress && (
                                <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                                  <Spinner animation="border" size="sm" />
                                </div>
                              )}
                              {addressSuggestions.length > 0 && (
                                <div className="position-absolute w-100 mt-1 border rounded bg-white shadow-sm" style={{ zIndex: 1000 }}>
                                  <ListGroup variant="flush">
                                    {addressSuggestions.map((suggestion, index) => (
                                      <ListGroup.Item 
                                        key={index}
                                        action
                                        onClick={() => handleAddressSelect(suggestion)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        {suggestion.address}
                                      </ListGroup.Item>
                                    ))}
                                  </ListGroup>
                                </div>
                              )}
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
                              <Form.Label>Annual Salary</Form.Label>
                              <Form.Control
                                type="text"
                                name="annualSalary"
                                value={formData.annualSalary}
                                onChange={handleInputChange}
                                placeholder="Enter annual salary"
                                isInvalid={!!validationErrors.annualSalary}
                              />
                              {validationErrors.annualSalary && (
                                <Form.Text className="text-danger">{validationErrors.annualSalary}</Form.Text>
                              )}
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
                              <Form.Label>SSN</Form.Label>
                              <div className="position-relative">
                                <Form.Control
                                  type="text"
                                  name="ssn"
                                  value={formData.ssn || ''}
                                  onChange={(e) => {
                                    const formattedSSN = formatSSN(e.target.value);
                                    setFormData(prev => ({
                                      ...prev,
                                      ssn: formattedSSN
                                    }));
                                    // Simple 9-digit check
                                    setSsnValid(formattedSSN.replace(/\D/g, '').length === 9);
                                  }}
                                  placeholder="###-##-####"
                                  maxLength="11"
                                  isInvalid={!!validationErrors.ssn}
                                  className={ssnValid ? 'is-valid' : ''}
                                />
                                <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                                  {ssnValid ? (
                                    <FaCheck className="text-success" />
                                  ) : formData.ssn && formData.ssn.length > 0 ? (
                                    <FaTimes className="text-danger" />
                                  ) : null}
                                </div>
                              </div>
                              {validationErrors.ssn && (
                                <Form.Text className="text-danger">{validationErrors.ssn}</Form.Text>
                              )}
                              {!ssnValid && formData.ssn && formData.ssn.length > 0 && (
                                <Form.Text className="text-danger">Please enter a valid SSN (9 digits)</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      {/* Health Insurance Coverage */}
                      <div className="section mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="mb-0">Health Insurance Coverage</h6>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="warning" 
                              size="sm"
                              className="sunfire-button"
                              onClick={handleSunfireSubmit}
                              disabled={isSunfireSubmitting || sunfireStatus === 'connected'}
                            >
                              {isSunfireSubmitting ? (
                                <>
                                  <FaSpinner className="me-1 spin" /> {sunfireStatus === 'connecting' ? 'Connecting to Sunfire...' : 'Submitting...'}
                                </>
                              ) : sunfireStatus === 'connected' ? (
                                <>
                                  <FaCheck className="me-1 text-success" /> Connected to Sunfire
                                </>
                              ) : (
                                <>
                                  <FaFire className="me-1" /> Connect to Sunfire
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="success" 
                              size="sm"
                              onClick={handleSunfireSubmit}
                            >
                              <FaCheckCircle className="me-2" /> HealthSherpa
                            </Button>
                          </div>
                        </div>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Plan Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="planName"
                                value={formData.planName}
                                onChange={handleInputChange}
                                placeholder="Enter plan name"
                                isInvalid={!!validationErrors.planName}
                              />
                              {validationErrors.planName && (
                                <Form.Text className="text-danger">{validationErrors.planName}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Coverage Type</Form.Label>
                              <Form.Select
                                name="coverageType"
                                value={formData.coverageType}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.coverageType}
                              >
                                <option value="">Select coverage type</option>
                                <option value="ACA">ACA</option>
                                <option value="Medicare">Medicare</option>
                                <option value="Vision">Vision</option>
                                <option value="Dental">Dental</option>
                              </Form.Select>
                              {validationErrors.coverageType && (
                                <Form.Text className="text-danger">{validationErrors.coverageType}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Deductible</Form.Label>
                              <div className="d-flex align-items-center gap-2">
                                <Form.Control
                                  type="text"
                                  name="deductible"
                                  value={formData.deductible}
                                  onChange={handleInputChange}
                                  placeholder="Enter deductible amount"
                                  isInvalid={!!validationErrors.deductible}
                                />
                                {formData.deductible && (
                                  <div className="deductible-indicator">
                                    {(() => {
                                      const deductibleValue = parseInt(formData.deductible.replace(/[^0-9]/g, ''));
                                      if (deductibleValue === 0) {
                                        return <span className="badge bg-success">$0 Deductible</span>;
                                      } else if (deductibleValue > 0 && deductibleValue <= 2000) {
                                        return <span className="badge bg-info">Low Deductible</span>;
                                      } else if (deductibleValue > 2000) {
                                        return <span className="badge bg-warning">High Deductible</span>;
                                      }
                                      return null;
                                    })()}
                                  </div>
                                )}
                              </div>
                              {validationErrors.deductible && (
                                <Form.Text className="text-danger">{validationErrors.deductible}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Premium</Form.Label>
                              <Form.Control
                                type="text"
                                name="premium"
                                value={formData.isWebLead ? '0' : formData.premium}
                                onChange={handleInputChange}
                                placeholder="Enter premium amount"
                                isInvalid={!!validationErrors.premium}
                                disabled={formData.isWebLead}
                              />
                              {validationErrors.premium && (
                                <Form.Text className="text-danger">{validationErrors.premium}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Effective Date</Form.Label>
                              <Form.Control
                                type="date"
                                name="effectiveDate"
                                value={formData.effectiveDate}
                                onChange={handleInputChange}
                                isInvalid={!!validationErrors.effectiveDate}
                              />
                              {validationErrors.effectiveDate && (
                                <Form.Text className="text-danger">{validationErrors.effectiveDate}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Policy ID</Form.Label>
                              <Form.Control
                                type="text"
                                name="policyId"
                                value={formData.policyId}
                                onChange={handleInputChange}
                                placeholder="Enter policy ID"
                                isInvalid={!!validationErrors.policyId}
                              />
                              {validationErrors.policyId && (
                                <Form.Text className="text-danger">{validationErrors.policyId}</Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      {/* Recording Verification Section */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Recording Verification</h6>
                        <div className="d-flex gap-3 mb-3">
                          <Button 
                            variant={isRecording ? "danger" : "primary"}
                            onClick={handleRecordingSave}
                            disabled={!isRecording}
                          >
                            {isRecording ? "Stop Recording" : "Start Recording"}
                          </Button>
                          <Button 
                            variant="outline-primary"
                            onClick={() => setShowRecordingHistory(true)}
                          >
                            <FaHistory className="me-1" /> Recording History
                          </Button>
                        </div>
                        <div className="recording-status p-3 border rounded mb-3">
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
                                 'Click "Start Recording" to begin verification'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* E-Signature Field */}
                        <div className="mt-3 border-top pt-3">
                          <h6 className="text-muted mb-2">E-Signature Verification</h6>
                          <div className="border rounded p-3 bg-light">
                            {formData.signatureurl ? (
                              <div>
                                <div className="mb-2">
                                  <Badge bg="success">Verified</Badge>
                                  <span className="ms-2 text-muted">
                                    Signed on {new Date(formData.timestamp?.seconds * 1000).toLocaleString()}
                                  </span>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                  <img 
                                    src={formData.signatureurl} 
                                    alt="E-Signature" 
                                    style={{ maxHeight: '50px' }}
                                    className="img-fluid"
                                  />
                                  <div>
                                    <p className="mb-1">
                                      <strong>Signer:</strong> {formData.firstName} {formData.lastName}
                                    </p>
                                    <p className="mb-0 text-muted small">
                                      IP: {formData.ipAddress || 'Not recorded'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center text-muted py-2">
                                <FaSignature className="mb-2" style={{ fontSize: '24px' }} />
                                <p className="mb-0">No e-signature available</p>
                              </div>
                            )}
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

                      {/* Coverage Duration Section */}
                      <div className="section mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="mb-0">Coverage Duration</h6>
                        </div>
                        <div className="coverage-duration-indicator p-3 border rounded">
                          <div className="d-flex align-items-center gap-3">
                            <FaClock className="text-primary" size={24} />
                            <div>
                              <h4 className="mb-0 fw-bold text-primary">{getCoverageDays()} Days</h4>
                              <small className="text-muted">Since coverage started</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add this at the bottom of the form, just before the Action Buttons section */}
                      <div className="d-flex justify-content-between align-items-center mt-4">
                          <Button 
                          variant="outline-secondary" 
                          onClick={() => setShowNotesHistoryModal(true)}
                        >
                          <FaHistory className="me-2" /> View Notes History
                        </Button>
                            <div>
                          <Button 
                            variant="outline-primary"
                            onClick={() => handleSave('draft')}
                            disabled={savingStatus === 'saving' || isDraftSaving}
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
                                <FaSave className="me-2" /> Submit Application
                              </>
                            )}
                              </Button>
                            </div>
                          </div>

                      {/* Notes History Modal */}
                      <Modal 
                        show={showNotesHistoryModal} 
                        onHide={() => setShowNotesHistoryModal(false)}
                        size="lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Notes & Disposition History</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="notes-history">
                            {notes.map((note, index) => (
                              <div key={index} className="note-entry p-3 border rounded mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="d-flex align-items-center gap-2">
                                    <Badge bg="info">{note.type}</Badge>
                                    <small className="text-muted">{note.date}</small>
                                  </div>
                                  <Badge bg={getStatusFromDisposition(note.type, note.disposition)}>
                                    {note.disposition}
                                  </Badge>
                                </div>
                                <div className="note-content">
                                  <p className="mb-2">{note.notes}</p>
                                  {note.policyDetails && (
                                    <div className="policy-details mt-2 p-2 bg-light rounded">
                                      <h6 className="mb-2">Policy Details</h6>
                                      <Row>
                                        <Col md={6}>
                                          <p className="mb-1"><strong>Plan:</strong> {note.policyDetails.planName}</p>
                                          <p className="mb-1"><strong>Coverage:</strong> {note.policyDetails.coverageType}</p>
                                        </Col>
                                        <Col md={6}>
                                          <p className="mb-1"><strong>Deductible:</strong> {note.policyDetails.deductible}</p>
                                          <p className="mb-1"><strong>Premium:</strong> {note.policyDetails.premium}</p>
                                        </Col>
                                      </Row>
                                      <p className="mb-1"><strong>Effective Date:</strong> {note.policyDetails.effectiveDate}</p>
                                      <p className="mb-0"><strong>Status:</strong> {note.policyDetails.status}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => setShowNotesHistoryModal(false)}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      {/* Rewards section after coverage duration section */}
                      <div className="section mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="mb-0">Available Rewards</h6>
                        </div>
                        <div className="rewards-status-indicator p-4 border rounded text-center" style={{ 
                          background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                          <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100px' }}>
                            <FaGift className="mb-3" style={{ fontSize: '2rem', color: '#6c757d' }} />
                            <p className="text-muted mb-0" style={{ 
                              fontSize: '1.1rem',
                              fontWeight: '500',
                              letterSpacing: '0.5px'
                            }}>
                              Rewards Will Appear Here If Approved By Admin
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Enrollment Information */}
                      <div className="section mb-4">
                        <h6 className="mb-3">Enrollment Information</h6>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enrollment Date</Form.Label>
                              <Form.Control
                                type="text"
                                value={formData.enrollmentDate ? new Date(formData.enrollmentDate).toLocaleDateString() : 'Not Submitted'}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Status</Form.Label>
                              <Form.Control
                                type="text"
                                value={formData.status || 'Not Submitted'}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
                          </div>
                        </div>
                      </div>
        )}

        {activeTab === 'email' && (
          <div>
            {/* Email tab content goes here */}
            <p>This is the Email tab. Email functionality will appear here.</p>
          </div>
        )}

        {activeTab === 'chat' && (
          <div>
            {/* Chat tab content goes here */}
            <p>This is the Chat tab. Chat functionality will appear here.</p>
          </div>
        )}

        {activeTab === 'drive' && (
          <Row>
            <Col md={8}>
              <Card className="dashboard-card mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaGoogleDrive className="me-2" /> Google Drive
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="drive-header d-flex justify-content-between align-items-center mb-3">
                    <div className="breadcrumb-nav">
                      <Button variant="link" className="p-0 me-2" onClick={() => setCurrentDriveFolder('My Drive')}>
                        My Drive
                      </Button>
                      {currentDriveFolder !== 'My Drive' && (
                        <>
                          <FaChevronRight className="me-2" />
                          <span>{currentDriveFolder}</span>
                        </>
                )}
              </div>
                    <div className="drive-actions">
                      <Button variant="outline-primary" size="sm" className="me-2">
                        <FaUpload className="me-1" /> Upload
          </Button>
                      <Button variant="outline-primary" size="sm" className="me-2">
                        <FaFolder className="me-1" /> New Folder
                      </Button>
                      <InputGroup className="d-inline-flex" style={{ width: '200px' }}>
                        <Form.Control
                          size="sm"
                          placeholder="Search in Drive"
                        />
                        <Button variant="outline-secondary" size="sm">
                          <FaSearch />
                        </Button>
                      </InputGroup>
            </div>
          </div>
                  
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Last Modified</th>
                        <th>Size</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driveFiles.map((file) => (
                        <tr key={file.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              {file.type === 'folder' ? (
                                <FaFolder className="me-2 text-warning" />
                              ) : file.type === 'document' ? (
                                <FaFileWord className="me-2 text-primary" />
                              ) : file.type === 'pdf' ? (
                                <FaFilePdf className="me-2 text-danger" />
                              ) : file.type === 'spreadsheet' ? (
                                <FaFileExcel className="me-2 text-success" />
                              ) : (
                                <FaFileAlt className="me-2 text-secondary" />
                              )}
                              {file.type === 'folder' ? (
            <Button 
                                  variant="link" 
                                  className="p-0 text-decoration-none text-dark"
                                  onClick={() => handleFolderClick(file.id, file.name)}
            >
                                  {file.name}
            </Button>
                              ) : (
                                file.name
                              )}
                            </div>
                          </td>
                          <td>{file.owner}</td>
                          <td>{file.lastModified}</td>
                          <td>{file.size}</td>
                          <td>
          <Button 
                              variant="link" 
                              className="p-1" 
                              onClick={() => handleFileAction(file.id, 'download')}
                              title="Download"
                            >
                              <FaDownload />
          </Button>
                            <Button 
                              variant="link" 
                              className="p-1" 
                              onClick={() => handleFileAction(file.id, 'share')}
                              title="Share"
                            >
                              <FaUsers />
                            </Button>
                            <Button 
                              variant="link" 
                              className="p-1" 
                              onClick={() => handleFileAction(file.id, 'more')}
                              title="More options"
                            >
                              <FaEllipsisV />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="dashboard-card mb-4">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaFileAlt className="me-2" /> Scripts
                  </h5>
                  <Button variant="outline-primary" size="sm">
                    <FaPlus className="me-1" /> New Script
          </Button>
                </Card.Header>
                <Card.Body>
                  <div className="notes-container">
                    <div className="notes-grid">
                      <div className="note-card p-3 border-0 rounded-3 shadow-sm mb-3" style={{ backgroundColor: '#fff9e6' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Initial Greeting Script</h6>
                          <div className="dropdown">
                            <Button variant="link" size="sm" className="text-muted p-0">
                              <FaEllipsisV />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted small mb-2">Updated 2h ago</p>
                        <p className="mb-0">"Hello, this is [Your Name] calling from [Company Name]. How are you today? I'm reaching out to discuss your current insurance coverage and explore how we might be able to help you save money while maintaining or improving your coverage."</p>
                      </div>
                      
                      <div className="note-card p-3 border-0 rounded-3 shadow-sm mb-3" style={{ backgroundColor: '#e6f3ff' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Objection Handling Script</h6>
                          <div className="dropdown">
                            <Button variant="link" size="sm" className="text-muted p-0">
                              <FaEllipsisV />
                            </Button>
              </div>
            </div>
                        <p className="text-muted small mb-2">Updated 1d ago</p>
                        <p className="mb-0">"I understand your concern about [specific objection]. Many of our clients had similar concerns before they saw how our solutions could help them. Would you be open to a brief conversation about how we've helped others in similar situations?"</p>
              </div>
                      
                      <div className="note-card p-3 border-0 rounded-3 shadow-sm" style={{ backgroundColor: '#e6ffe6' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Closing Script</h6>
                          <div className="dropdown">
                            <Button variant="link" size="sm" className="text-muted p-0">
                              <FaEllipsisV />
                            </Button>
            </div>
              </div>
                        <p className="text-muted small mb-2">Updated 3d ago</p>
                        <p className="mb-0">"Based on our conversation, I believe we can provide you with [specific benefit]. Would you like to proceed with setting up a time to review the details and get started? I can schedule a follow-up call for [specific time] to go over everything in detail."</p>
            </div>
          </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Add rewards history modal */}
        <Modal show={showRewardsHistoryModal} onHide={() => setShowRewardsHistoryModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Rewards History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="list-group">
              {rewardMilestones.map(r => {
                const earned = coverageDays >= r.days;
                const date = activeCoverage.enrollmentDate && earned
                  ? new Date(new Date(activeCoverage.enrollmentDate).getTime() + r.days * 24 * 60 * 60 * 1000)
                  : null;
                return (
                  <li key={r.days} className={`list-group-item d-flex justify-content-between align-items-center ${earned ? 'list-group-item-success' : ''}`}>
                    <span>
                      <strong>{r.reward}</strong> <span className="text-muted">({r.label})</span>
                    </span>
                    <span>
                      {earned ? (
                        <span>
                          <FaCheck className="text-success me-1" />
                          {date ? date.toLocaleDateString() : 'Earned'}
                        </span>
                      ) : (
                        <span className="text-muted">Locked</span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRewardsHistoryModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        
      </Container>

      {/* Add all modals at the end of the container */}
      <Modal show={showMessagingModal} onHide={() => setShowMessagingModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-4">
            <Form.Label>Search for Client or Agent</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="Search by name, ID, or phone..."
                value={messageSearch}
                onChange={(e) => handleMessageSearch(e.target.value)}
              />
              <Button variant="primary">
                <FaSearch />
              </Button>
            </div>
          </Form.Group>

          {messageSearchResults.length > 0 && (
            <div className="search-results">
              <h6 className="mb-3">Search Results</h6>
              <ListGroup>
                {messageSearchResults.map(user => (
                  <ListGroup.Item 
                    key={user.id}
                    className="d-flex justify-content-between align-items-center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleStartNewChat(user)}
                  >
                    <div>
                      <strong>{user.firstName} {user.lastName}</strong>
                      <div className="text-muted small">
                        {user.type === 'client' ? 'Client' : 'Agent'} • {user.phone || 'No phone'}
                      </div>
                    </div>
                    <Badge bg={user.type === 'client' ? 'primary' : 'success'}>
                      {user.type === 'client' ? 'Client' : 'Agent'}
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}

          {messageSearch && messageSearchResults.length === 0 && (
            <div className="text-center text-muted py-4">
              <FaSearch className="mb-2" style={{ fontSize: '24px' }} />
              <p>No results found</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Other modals */}
      <Modal show={showLeadSourceModal} onHide={() => setShowLeadSourceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Lead Source</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select Lead Source</Form.Label>
            <Form.Select
              value={formData.leadSource || ''}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  leadSource: e.target.value
                }));
                setShowLeadSourceModal(false);
              }}
            >
              <option value="">Direct Lead</option>
              <option value="web">Web</option>
              <option value="snapchat">Snapchat</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="google">Google Ads</option>
              <option value="community">Community</option>
              <option value="referral">Referral</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
      </Modal>

      {/* Messaging Modal */}
      <Modal show={showMessagingModal} onHide={() => setShowMessagingModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chat with {formData.firstName} {formData.lastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="chat-container" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Messages */}
            <div className="chat-messages flex-grow-1 overflow-auto mb-3 p-3 border rounded">
              {formData.messages && formData.messages.length > 0 ? (
                formData.messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`message mb-3 ${message.sender === 'agent' ? 'text-end' : ''}`}
                  >
                    <div 
                      className={`d-inline-block p-2 rounded ${
                        message.sender === 'agent' 
                          ? 'bg-primary text-white' 
                          : 'bg-light'
                      }`}
                    >
                      <div className="message-content">{message.content}</div>
                      <small className="text-muted">
                        {new Date(message.timestamp?.seconds * 1000).toLocaleString()}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted py-4">
                  <FaComments className="mb-2" style={{ fontSize: '24px' }} />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="chat-input">
              <Form.Group>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    variant="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <FaPaperPlane />
                  </Button>
                </div>
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {activeTab === 'rewards' && (
        <Card className="dashboard-card mb-4 mx-3">
          <Card.Header>
            <h5 className="mb-0">Rewards Management</h5>
          </Card.Header>
          <Card.Body>
            <p>Process and disperse campaign-based rewards for clients.</p>
            {/* Campaign Rewards Section */}
            <div className="available-rewards mb-4">
              <h5>Available Campaign Rewards</h5>
              <Table striped hover responsive size="sm">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignRewards.map((reward) => (
                    <tr key={reward.id}>
                      <td>{reward.name}</td>
                      <td>{reward.description}</td>
                      <td>
                        <Button size="sm" variant="outline-primary" onClick={() => { setSelectedCampaign(reward); setShowAssignRewardModal(true); }}>Assign</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {/* Assign Reward Modal */}
            <Modal show={showAssignRewardModal} onHide={() => setShowAssignRewardModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Assign Reward</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Select Client</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by name, email, or client ID..."
                    value={selectedRewardClient || ''}
                    onChange={e => setSelectedRewardClient(e.target.value)}
                  />
                  {/* In a real app, this would be a dropdown or autocomplete of clients */}
                </Form.Group>
                <p>Reward: <strong>{selectedCampaign?.name}</strong></p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAssignRewardModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => { /* Grant reward logic here */ setShowAssignRewardModal(false); }}>Grant Reward</Button>
              </Modal.Footer>
            </Modal>
            {/* ... existing code for Active, Restored, and Inactive Clients ... */}
          </Card.Body>
        </Card>
      )}

      {/* New Event Date Modal */}
      <Modal show={showNewEventDateModal} onHide={() => setShowNewEventDateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Future Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              value={newEventTitle}
              onChange={e => setNewEventTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Event Date</Form.Label>
            <Form.Control
              type="date"
              value={newEventDate}
              onChange={e => setNewEventDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={newEventStartTime}
              onChange={e => setNewEventStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              value={newEventEndTime}
              onChange={e => setNewEventEndTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newEventDescription}
              onChange={e => setNewEventDescription(e.target.value)}
              placeholder="Enter event description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Meeting Link</Form.Label>
            <Form.Control
              type="text"
              value={newEventMeetingLink}
              onChange={e => setNewEventMeetingLink(e.target.value)}
              placeholder="Enter Google Meet meeting link"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewEventDateModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => { /* Logic to add event */ setShowNewEventDateModal(false); }}>Add</Button>
        </Modal.Footer>
      </Modal>

      {activeTab === 'scheduledEvents' && (
        <Card className="dashboard-card mb-4">
          <Card.Header>
            <h5 className="mb-0">Scheduled Events</h5>
          </Card.Header>
          <Card.Body>
            <p>Calendar functionality has been removed.</p>
          </Card.Body>
        </Card>
      )}

      {activeTab === 'audit' && (
        <div className="audit-container">
          <Card className="dashboard-card mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <FaShieldAlt className="me-2" /> Audit Log
                </h5>
                <div className="d-flex gap-2">
                  <Form.Select 
                    size="sm" 
                    className="w-auto"
                    value={auditFilter}
                    onChange={(e) => {
                      setAuditFilter(e.target.value);
                      setAuditPage(1);
                      setAuditSearch('');
                    }}
                  >
                    <option value="all">All Activities</option>
                    <option value="login">Login Events</option>
                    <option value="rewards">Rewards & Transactions</option>
                    <option value="data">Data Changes</option>
                    <option value="settings">Settings Changes</option>
                    <option value="applications">Application Events</option>
                    <option value="calls">Call Events</option>
                  </Form.Select>
                  <Button variant="outline-primary" size="sm">
                    <FaDownload className="me-1" /> Export
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  value={auditSearch}
                  onChange={(e) => {
                    setAuditSearch(e.target.value);
                    setAuditPage(1);
                  }}
                  className="w-25"
                />
              </div>

              {auditFilter === 'all' && (
                <div className="audit-log">
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Timestamp</th>
                        <th>User</th>
                        <th>Action</th>
                        <th>Transaction ID</th>
                        <th>Details</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Filter and paginate the data */}
                      {allActivities
                        .filter(activity => 
                          Object.values(activity).some(value => 
                            value.toString().toLowerCase().includes(auditSearch.toLowerCase())
                          )
                        )
                        .slice((auditPage - 1) * itemsPerPage, auditPage * itemsPerPage)
                        .map((activity, index) => (
                          <tr key={index}>
                            <td>{activity.timestamp}</td>
                            <td>{activity.user}</td>
                            <td>{activity.action}</td>
                            <td>{activity.transactionId}</td>
                            <td>{activity.details}</td>
                            <td><Badge bg={activity.status.toLowerCase()}>{activity.status}</Badge></td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      Showing {Math.min((auditPage - 1) * itemsPerPage + 1, filteredCount)} to {Math.min(auditPage * itemsPerPage, filteredCount)} of {filteredCount} entries
                    </div>
                    <Pagination>
                      <Pagination.Prev 
                        onClick={() => setAuditPage(prev => Math.max(prev - 1, 1))}
                        disabled={auditPage === 1}
                      />
                      {[...Array(Math.ceil(filteredCount / itemsPerPage))].map((_, i) => (
                        <Pagination.Item
                          key={i + 1}
                          active={i + 1 === auditPage}
                          onClick={() => setAuditPage(i + 1)}
                        >
                          {i + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next 
                        onClick={() => setAuditPage(prev => Math.min(prev + 1, Math.ceil(filteredCount / itemsPerPage)))}
                        disabled={auditPage === Math.ceil(filteredCount / itemsPerPage)}
                      />
                    </Pagination>
                  </div>
                </div>
              )}

              {auditFilter === 'login' && (
                <div className="audit-log">
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Timestamp</th>
                        <th>User</th>
                        <th>IP Address</th>
                        <th>Device</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loginEvents
                        .filter(event => 
                          Object.values(event).some(value => 
                            value.toString().toLowerCase().includes(auditSearch.toLowerCase())
                          )
                        )
                        .slice((auditPage - 1) * itemsPerPage, auditPage * itemsPerPage)
                        .map((event, index) => (
                          <tr key={index}>
                            <td>{event.timestamp}</td>
                            <td>{event.user}</td>
                            <td>{event.ipAddress}</td>
                            <td>{event.device}</td>
                            <td><Badge bg={event.status.toLowerCase()}>{event.status}</Badge></td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      Showing {Math.min((auditPage - 1) * itemsPerPage + 1, filteredCount)} to {Math.min(auditPage * itemsPerPage, filteredCount)} of {filteredCount} entries
                    </div>
                    <Pagination>
                      <Pagination.Prev 
                        onClick={() => setAuditPage(prev => Math.max(prev - 1, 1))}
                        disabled={auditPage === 1}
                      />
                      {[...Array(Math.ceil(filteredCount / itemsPerPage))].map((_, i) => (
                        <Pagination.Item
                          key={i + 1}
                          active={i + 1 === auditPage}
                          onClick={() => setAuditPage(i + 1)}
                        >
                          {i + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next 
                        onClick={() => setAuditPage(prev => Math.min(prev + 1, Math.ceil(filteredCount / itemsPerPage)))}
                        disabled={auditPage === Math.ceil(filteredCount / itemsPerPage)}
                      />
                    </Pagination>
                  </div>
                </div>
              )}

              {/* Similar structure for other filters */}
              {auditFilter === 'rewards' && (
                <div className="audit-log">
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Timestamp</th>
                        <th>User</th>
                        <th>Transaction ID</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rewardsTransactions
                        .filter(transaction => 
                          Object.values(transaction).some(value => 
                            value.toString().toLowerCase().includes(auditSearch.toLowerCase())
                          )
                        )
                        .slice((auditPage - 1) * itemsPerPage, auditPage * itemsPerPage)
                        .map((transaction, index) => (
                          <tr key={index}>
                            <td>{transaction.timestamp}</td>
                            <td>{transaction.user}</td>
                            <td>{transaction.transactionId}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.amount}</td>
                            <td><Badge bg={transaction.status.toLowerCase()}>{transaction.status}</Badge></td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      Showing {Math.min((auditPage - 1) * itemsPerPage + 1, filteredCount)} to {Math.min(auditPage * itemsPerPage, filteredCount)} of {filteredCount} entries
                    </div>
                    <Pagination>
                      <Pagination.Prev 
                        onClick={() => setAuditPage(prev => Math.max(prev - 1, 1))}
                        disabled={auditPage === 1}
                      />
                      {[...Array(Math.ceil(filteredCount / itemsPerPage))].map((_, i) => (
                        <Pagination.Item
                          key={i + 1}
                          active={i + 1 === auditPage}
                          onClick={() => setAuditPage(i + 1)}
                        >
                          {i + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next 
                        onClick={() => setAuditPage(prev => Math.min(prev + 1, Math.ceil(filteredCount / itemsPerPage)))}
                        disabled={auditPage === Math.ceil(filteredCount / itemsPerPage)}
                      />
                    </Pagination>
                  </div>
                </div>
              )}

              {/* Add similar structure for other filters (data, settings, applications, calls) */}
          </Card.Body>
        </Card>

          {/* Keep the Activity Summary card as is */}
          <Card className="dashboard-card mb-4">
            {/* ... existing Activity Summary card content ... */}
          </Card>
        </div>
      )}

      {/* Add this near the other modals in the JSX */}
      <Modal 
        show={showComposeModal} 
        onHide={() => setShowComposeModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{composeMode === 'reply' ? 'Reply' : 'New Message'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="email"
                value={composeEmail.to}
                onChange={(e) => handleComposeEmailChange('to', e.target.value)}
                placeholder="recipient@example.com"
                disabled={composeMode === 'reply'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CC</Form.Label>
              <Form.Control
                type="email"
                value={composeEmail.cc}
                onChange={(e) => handleComposeEmailChange('cc', e.target.value)}
                placeholder="cc@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>BCC</Form.Label>
              <Form.Control
                type="email"
                value={composeEmail.bcc}
                onChange={(e) => handleComposeEmailChange('bcc', e.target.value)}
                placeholder="bcc@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={composeEmail.subject}
                onChange={(e) => handleComposeEmailChange('subject', e.target.value)}
                placeholder="Subject"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={composeEmail.content}
                onChange={(e) => handleComposeEmailChange('content', e.target.value)}
                placeholder="Write your message here..."
                style={{ resize: 'none' }}
              />
            </Form.Group>
            {composeEmail.attachments.length > 0 && (
              <div className="mb-3">
                <Form.Label>Attachments</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {composeEmail.attachments.map((file, index) => (
                    <div 
                      key={index}
                      className="d-flex align-items-center gap-2 bg-light rounded p-2"
                    >
                      <FaPaperclip />
                      <span className="small">{file.name}</span>
                      <Button
                        variant="link"
                        className="p-0 text-danger"
                        onClick={() => {
                          setComposeEmail(prev => ({
                            ...prev,
                            attachments: prev.attachments.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        <FaTimes />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowComposeModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleComposeSubmit}
            disabled={!composeEmail.to || !composeEmail.subject || !composeEmail.content}
          >
            {composeMode === 'reply' ? 'Send Reply' : 'Send'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} 
