'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, Table, Button, Badge, Form, InputGroup, Modal, Spinner, Row, Col } from 'react-bootstrap';
import { FaSearch, FaEdit, FaCheck, FaCheckCircle, FaTimesCircle, FaInbox } from 'react-icons/fa';
import { collection, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function ApplicationsTabNew() {
  console.log('ApplicationsTabNew component rendering');
  const [applications, setApplications] = useState([]);
  const [isLoadingApplications, setIsLoadingApplications] = useState(true);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationSearchTerm, setApplicationSearchTerm] = useState('');
  const [applicationTimeframe, setApplicationTimeframe] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;

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
        
        const q = query(applicationsRef, orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        console.log('Total documents found:', snapshot.size);
        
        if (snapshot.empty) {
          console.log('No documents found in applications collection');
          setApplications([]);
          return;
        }
        
        const applicationsData = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Document ID:', doc.id);
          console.log('Raw Document Data:', data);
          // Normalize residential address field
          let residentialaddress = data.residentialaddress || data.residentialAddress || null;
          if (residentialaddress && typeof residentialaddress === 'object') {
            residentialaddress = {
              streetaddress: residentialaddress.streetaddress || '',
              city: residentialaddress.city || '',
              state: residentialaddress.state || '',
              zipcode: residentialaddress.zipcode || '',
              country: residentialaddress.country || ''
            };
          } else {
            // Fallback to top-level fields if residentialaddress is not present
            residentialaddress = {
              streetaddress: data.streetaddress || '',
              city: data.city || '',
              state: data.state || '',
              zipcode: data.zipcode || '',
              country: data.country || ''
            };
          }
          // Normalize mailing address fields
          let mailingaddress = data.mailingaddress || data.mailingAddress || null;
          let mailingStreet = data.mailingStreet || '';
          let mailingCity = data.mailingCity || '';
          let mailingState = data.mailingState || '';
          let mailingZip = data.mailingZip || '';
          let mailingCountry = data.mailingCountry || '';
          if (mailingaddress && typeof mailingaddress === 'object') {
            mailingStreet = mailingaddress.street || mailingaddress.streetaddress || '';
            mailingCity = mailingaddress.city || '';
            mailingState = mailingaddress.state || '';
            mailingZip = mailingaddress.zip || mailingaddress.zipcode || '';
            mailingCountry = mailingaddress.country || '';
          }
          const processedData = {
            id: doc.id,
            ...data,
            residentialaddress, // always use lowercase key
            mailingStreet,
            mailingCity,
            mailingState,
            mailingZip,
            mailingCountry,
            timestamp: data.timestamp || data.applicationDate || new Date().toISOString()
          };
          console.log('Processed Data:', processedData);
          console.log('Residential Address in Processed Data:', processedData.residentialaddress);
          console.log('Mailing Address in Processed Data:', {
            mailingStreet: processedData.mailingStreet,
            mailingCity: processedData.mailingCity,
            mailingState: processedData.mailingState,
            mailingZip: processedData.mailingZip,
            mailingCountry: processedData.mailingCountry
          });
          return processedData;
        });
        
        console.log('Successfully loaded', applicationsData.length, 'applications');
        setApplications(applicationsData);
        
      } catch (error) {
        console.error('Error fetching applications:', error);
        setApplications([]);
      } finally {
        setIsLoadingApplications(false);
      }
    };

    fetchApplications();
  }, []);

  // Filter applications based on search term and timeframe
  const filteredApplications = useMemo(() => {
    console.log('Filtering applications. Total count:', applications.length);
    const filtered = applications.filter(app => {
      const searchTerm = applicationSearchTerm.toLowerCase().trim();
      
      if (!searchTerm) return true;

      const matchesSearch = 
        (app.firstName?.toLowerCase().includes(searchTerm)) ||
        (app.lastName?.toLowerCase().includes(searchTerm)) ||
        (app.middleName?.toLowerCase().includes(searchTerm)) ||
        (app.email?.toLowerCase().includes(searchTerm)) ||
        (app.phone?.toLowerCase().includes(searchTerm)) ||
        (app.ssn?.toLowerCase().includes(searchTerm)) ||
        (app.client_id?.toLowerCase().includes(searchTerm)) ||
        (app.lead_id?.toLowerCase().includes(searchTerm));

      if (!matchesSearch) return false;

      if (applicationTimeframe === 'all') return true;

      const submissionDate = new Date(app.applicationDate || app.timestamp);
      const now = new Date();

      switch (applicationTimeframe) {
        case 'daily':
          return submissionDate.toDateString() === now.toDateString();
        case 'weekly':
          const weekAgo = new Date(now.setDate(now.getDate() - 7));
          return submissionDate >= weekAgo;
        case 'monthly':
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
          return submissionDate >= monthAgo;
        case 'yearly':
          const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
          return submissionDate >= yearAgo;
        default:
          return true;
      }
    });
    console.log('Filtered applications count:', filtered.length);
    return filtered;
  }, [applications, applicationSearchTerm, applicationTimeframe]);

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  const handleViewApplication = (app) => {
    console.log('Selected Application Data:', app);
    console.log('Residential Address:', app.residentialaddress);
    
    // Create a new object with the exact structure we need
    const applicationData = {
      ...app,
      residentialaddress: app.residentialaddress || null
    };
    
    console.log('Processed Application Data:', applicationData);
    console.log('Residential Address in Processed Data:', applicationData.residentialaddress);
    setSelectedApplication(applicationData);
    setShowAdminModal(true);
  };

  const handleConfirmApplication = async (appId) => {
    try {
      const applicationRef = doc(db, 'applications', appId);
      await updateDoc(applicationRef, {
        status: 'Confirmed',
        updatedAt: new Date().toISOString()
      });

      setApplications(prevApps =>
        prevApps.map(app =>
          app.id === appId ? { ...app, status: 'Confirmed' } : app
        )
      );
    } catch (error) {
      console.error('Error confirming application:', error);
    }
  };

  return (
    <>
      <Card className="dashboard-card mb-4">
        <Card.Header>
          <h5 className="mb-0">Submitted Applications Review</h5>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <Row>
              <Col md={6}>
                <Form.Group>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search by name, email, phone, or SSN..."
                      value={applicationSearchTerm}
                      onChange={(e) => setApplicationSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-secondary">
                      <FaSearch />
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Select
                    value={applicationTimeframe}
                    onChange={(e) => setApplicationTimeframe(e.target.value)}
                  >
                    <option value="all">All Applications</option>
                    <option value="daily">Today</option>
                    <option value="weekly">This Week</option>
                    <option value="monthly">This Month</option>
                    <option value="yearly">This Year</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Country</th>
                <th>State</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingApplications ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                      <Spinner animation="border" role="status" className="me-2">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                      Loading applications...
                    </div>
                  </td>
                </tr>
              ) : currentApplications.length > 0 ? (
                currentApplications.map((app) => (
                  <tr key={app.id}>
                    <td>{`${app.firstName || ''} ${app.middleName || ''} ${app.lastName || ''}`.trim() || 'N/A'}</td>
                    <td>{app.email || 'N/A'}</td>
                    <td>{app.phone || 'N/A'}</td>
                    <td>{app.dateOfBirth || 'N/A'}</td>
                    <td>{app.residentialaddress?.country || app.countryOfOrigin || 'N/A'}</td>
                    <td>{app.residentialaddress?.state || app.stateOfOrigin || 'N/A'}</td>
                    <td>
                      <Badge bg={app.status === 'Confirmed' ? 'success' : 'warning'}>
                        {app.status || 'Pending'}
                      </Badge>
                    </td>
                    <td>{new Date(app.applicationDate || app.timestamp).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleViewApplication(app)}
                      >
                        <FaEdit /> View
                      </Button>
                      {(!app.status || app.status === 'Pending') && (
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleConfirmApplication(app.id)}
                        >
                          <FaCheck /> Confirm
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    <div className="d-flex flex-column align-items-center">
                      <FaInbox size={24} className="text-muted mb-2" />
                      No applications found in database.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {filteredApplications.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                Showing {indexOfFirstApplication + 1} to {Math.min(indexOfLastApplication, filteredApplications.length)} of {filteredApplications.length} applications
              </div>
              <div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="me-2"
                >
                  Previous
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Application Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {console.log('MODAL FINAL selectedApplication:', selectedApplication)}
          {selectedApplication ? (
            <div>
              <h5 className="mb-3">Personal Information</h5>
              <Row>
                <Col md={6}>
                  <p><strong>First Name:</strong> {selectedApplication.firstName || selectedApplication.firstname || 'N/A'}</p>
                  <p><strong>Middle Name:</strong> {selectedApplication.middleName || selectedApplication.middlename || 'N/A'}</p>
                  <p><strong>Last Name:</strong> {selectedApplication.lastName || selectedApplication.lastname || 'N/A'}</p>
                  <p><strong>Suffix:</strong> {selectedApplication.suffix || 'N/A'}</p>
                  <p><strong>Date of Birth:</strong> {selectedApplication.dateOfBirth || selectedApplication.dateofbirth || 'N/A'}</p>
                  <p><strong>Email:</strong> {selectedApplication.email || 'N/A'}</p>
                  <p><strong>Phone:</strong> {selectedApplication.phone || 'N/A'}</p>
                  <p><strong>Client ID:</strong> {selectedApplication.client_id || 'N/A'}</p>
                  <p><strong>Lead ID:</strong> {selectedApplication.lead_id || 'N/A'}</p>
                  <p><strong>Marketing ID:</strong> {selectedApplication.marketingID || 'N/A'}</p>
                  <p><strong>Occupation:</strong> {selectedApplication.occupation || 'N/A'}</p>
                  <p><strong>Country of Origin:</strong> {selectedApplication.countryOfOrigin || 'N/A'}</p>
                  <p><strong>State of Origin:</strong> {selectedApplication.stateOfOrigin || 'N/A'}</p>
                  <p><strong>Status:</strong> {selectedApplication.status || 'N/A'}</p>
                  <p><strong>Tax Filing Status:</strong> {selectedApplication.taxFilingStatus || 'N/A'}</p>
                  <p><strong>SSN:</strong> {selectedApplication.ssn || 'N/A'}</p>
                  <p><strong>Date Submitted:</strong> {selectedApplication.applicationDate ? new Date(selectedApplication.applicationDate).toLocaleString() : (selectedApplication.timestamp ? new Date(selectedApplication.timestamp).toLocaleString() : 'N/A')}</p>
                </Col>
                <Col md={6}>
                  <h6>Flags</h6>
                  <p><strong>Is Married:</strong> {selectedApplication.isMarried === true ? 'Yes' : selectedApplication.isMarried === false ? 'No' : 'N/A'}</p>
                  <p><strong>Has Children:</strong> {selectedApplication.hasChildren === true ? 'Yes' : selectedApplication.hasChildren === false ? 'No' : 'N/A'}</p>
                  <p><strong>Is Claimed on Taxes:</strong> {selectedApplication.isClaimedOnTaxes === true ? 'Yes' : selectedApplication.isClaimedOnTaxes === false ? 'No' : 'N/A'}</p>
                  <p><strong>Has Existing Insurance:</strong> {selectedApplication.hasExistingInsurance === true ? 'Yes' : selectedApplication.hasExistingInsurance === false ? 'No' : 'N/A'}</p>
                  <p><strong>Same as Residential:</strong> {selectedApplication.sameAsResidential === true ? 'Yes' : selectedApplication.sameAsResidential === false ? 'No' : 'N/A'}</p>
                  <p><strong>Signature Consent:</strong> {selectedApplication.signatureConsent === true ? 'Yes' : selectedApplication.signatureConsent === false ? 'No' : 'N/A'}</p>
                  <p><strong>Signature Provided:</strong> {selectedApplication.signature === true ? 'Yes' : selectedApplication.signature === false ? 'No' : 'N/A'}</p>
                </Col>
              </Row>
              <hr />
              <h5 className="mb-3">Address Information</h5>
              <Row>
                <Col md={6}>
                  <h6>Residential Address</h6>
                  {selectedApplication?.residentialaddress ? (
                    <>
                      <p><strong>Street:</strong> {selectedApplication.residentialaddress.streetaddress}</p>
                      <p><strong>City:</strong> {selectedApplication.residentialaddress.city}</p>
                      <p><strong>State:</strong> {selectedApplication.residentialaddress.state}</p>
                      <p><strong>Zip:</strong> {selectedApplication.residentialaddress.zipcode}</p>
                      <p><strong>Country:</strong> {selectedApplication.residentialaddress.country}</p>
                    </>
                  ) : (
                    <p>No residential address data available</p>
                  )}
                  <div className="mt-2">
                    <Form.Check 
                      type="checkbox"
                      label="Same as Residential"
                      checked={selectedApplication?.sameAsResidential === true}
                      readOnly
                      disabled
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <h6>Mailing Address</h6>
                  <p><strong>Street:</strong> {selectedApplication?.mailingStreet || 'N/A'}</p>
                  <p><strong>City:</strong> {selectedApplication?.mailingCity || 'N/A'}</p>
                  <p><strong>State:</strong> {selectedApplication?.mailingState || 'N/A'}</p>
                  <p><strong>Zip:</strong> {selectedApplication?.mailingZip || 'N/A'}</p>
                  <p><strong>Country:</strong> {selectedApplication?.mailingCountry || 'N/A'}</p>
                </Col>
              </Row>
              <hr />
              <h5 className="mb-3">Insurance & Financial</h5>
              <Row>
                <Col md={6}>
                  <p><strong>Deductible:</strong> {selectedApplication.deductible || 'N/A'}</p>
                  <p><strong>Expected Salary:</strong> {selectedApplication.expectedSalary || 'N/A'}</p>
                  <p><strong>Existing Insurance Type:</strong> {selectedApplication.existingInsuranceType || 'N/A'}</p>
                  <p><strong>Health Insurance Provider:</strong> {selectedApplication.healthInsuranceProvider || 'N/A'}</p>
                  <p><strong>Oscar:</strong> {selectedApplication.oscar || 'N/A'}</p>
                  <p><strong>United Healthcare:</strong> {selectedApplication.unitedhealthcare || 'N/A'}</p>
                  <p><strong>Wellcare:</strong> {selectedApplication.wellcare || 'N/A'}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Dependents:</strong> {Array.isArray(selectedApplication.dependents) ? selectedApplication.dependents.length : 'N/A'}</p>
                  <p><strong>Spouse Info:</strong> {selectedApplication.spouseinfo ? (
                    <span>
                      {selectedApplication.spouseinfo.firstname || ''} {selectedApplication.spouseinfo.middlename || ''} {selectedApplication.spouseinfo.lastname || ''} {selectedApplication.spouseinfo.dateofbirth || ''} {selectedApplication.spouseinfo.ssn || ''}
                    </span>
                  ) : 'N/A'}</p>
                </Col>
              </Row>
              <hr />
              <h5 className="mb-3">Technical & Meta</h5>
              <Row>
                <Col md={6}>
                  <p><strong>IP Address:</strong> {selectedApplication.ipAddress || 'N/A'}</p>
                  <p><strong>User Agent:</strong> {selectedApplication.userAgent || 'N/A'}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Application ID:</strong> {selectedApplication.id || 'N/A'}</p>
                </Col>
              </Row>
              <hr />
              <h5 className="mb-3">E-Signature</h5>
              <Row>
                <Col md={12}>
                  {selectedApplication.signatureurl ? (
                    <img src={selectedApplication.signatureurl} alt="E-Signature" style={{ maxWidth: '100%', maxHeight: 200, border: '1px solid #ccc', background: '#fff' }} />
                  ) : (
                    <span>No signature image provided.</span>
                  )}
                </Col>
              </Row>
            </div>
          ) : (
            <p>No application selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdminModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
} 