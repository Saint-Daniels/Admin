'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, Table, Button, Badge, Form, InputGroup, Modal, Spinner, Row, Col } from 'react-bootstrap';
import { FaSearch, FaEdit, FaCheck, FaCheckCircle, FaTimesCircle, FaInbox, FaSync } from 'react-icons/fa';
import { collection, getDocs, query, orderBy, updateDoc, doc, addDoc, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function ApplicationsTab() {
  console.log('ApplicationsTab component rendering');
  const [applications, setApplications] = useState([]);
  const [isLoadingApplications, setIsLoadingApplications] = useState(true);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationSearchTerm, setApplicationSearchTerm] = useState('');
  const [applicationTimeframe, setApplicationTimeframe] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const applicationsPerPage = 10;

  // Add logging for applications state changes
  useEffect(() => {
    console.log('Applications state updated:', applications);
  }, [applications]);

  // Filter applications based on search term and timeframe
  const filteredApplications = useMemo(() => {
    console.log('Filtering applications. Total count:', applications.length);
    const filtered = applications.filter(app => {
      // Convert search term to lowercase for case-insensitive search
      const searchTerm = applicationSearchTerm.toLowerCase().trim();
      
      // If search term is empty, show all applications
      if (!searchTerm) return true;

      // Search in multiple fields
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

      // Apply timeframe filter if search matches
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

  // Calculate pagination
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  // Fetch applications from Firestore
  const fetchApplications = async () => {
    try {
      setIsLoadingApplications(true);
      setIsRefreshing(true);
      console.log('=== STARTING FIRESTORE FETCH ===');
      
      // Verify db instance
      if (!db) {
        console.error('❌ Firestore db instance is null or undefined');
        throw new Error('Firestore database instance is not initialized');
      }
      
      // Get the applications collection
      const applicationsRef = collection(db, 'applications');
      console.log('Fetching from applications collection...');
      
      // Create a query to order by timestamp
      const q = query(applicationsRef, orderBy('timestamp', 'desc'));
      
      // Get documents with the query
      const snapshot = await getDocs(q);
      console.log('Total documents found:', snapshot.size);
      
      if (snapshot.empty) {
        console.log('No documents found in applications collection');
        setApplications([]);
        return;
      }
      
      // Process all documents and log their raw data
      const applicationsData = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Document ID:', doc.id);
        console.log('Raw Document Data:', data);
        return {
          id: doc.id,
          ...data,
          // Ensure we have a timestamp for sorting
          timestamp: data.timestamp || data.applicationDate || new Date().toISOString()
        };
      });
      
      console.log('Successfully loaded', applicationsData.length, 'applications');
      setApplications(applicationsData);
      
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    } finally {
      setIsLoadingApplications(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleViewApplication = (app) => {
    setSelectedApplication(app);
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
                    <Button 
                      variant="outline-primary" 
                      onClick={fetchApplications}
                      disabled={isRefreshing}
                    >
                      <FaSync className={isRefreshing ? 'fa-spin' : ''} />
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
                    <td>{app.countryOfOrigin || 'N/A'}</td>
                    <td>{app.stateOfOrigin || 'N/A'}</td>
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

          {/* Pagination */}
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

      {/* Application Details Modal */}
      <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Application Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication ? (
            <div>
              <Row>
                <Col md={6}>
                  <h6>Personal Information</h6>
                  <p><strong>First Name:</strong> {selectedApplication.firstName}</p>
                  <p><strong>Middle Name:</strong> {selectedApplication.middleName}</p>
                  <p><strong>Last Name:</strong> {selectedApplication.lastName}</p>
                  <p><strong>Email:</strong> {selectedApplication.email}</p>
                  <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                  <p><strong>Date of Birth:</strong> {selectedApplication.dateOfBirth}</p>
                  <p><strong>Country of Origin:</strong> {selectedApplication.countryOfOrigin}</p>
                  <p><strong>State of Origin:</strong> {selectedApplication.stateOfOrigin}</p>
                </Col>
                <Col md={6}>
                  <h6>Application Details</h6>
                  <p><strong>Application Date:</strong> {new Date(selectedApplication.applicationDate || selectedApplication.timestamp).toLocaleString()}</p>
                  <p><strong>Status:</strong> {selectedApplication.status || 'Pending'}</p>
                  <p><strong>SSN:</strong> {selectedApplication.ssn}</p>
                  <p><strong>Tax Filing Status:</strong> {selectedApplication.taxFilingStatus}</p>
                  <p><strong>Occupation:</strong> {selectedApplication.occupation}</p>
                  <p><strong>Expected Salary:</strong> {selectedApplication.expectedSalary}</p>
                  <p><strong>Deductible:</strong> {selectedApplication.deductible}</p>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md={6}>
                  <h6>Residential Address</h6>
                  <p><strong>Street:</strong> {selectedApplication.residentialaddress?.streetaddress}</p>
                  <p><strong>City:</strong> {selectedApplication.residentialaddress?.city}</p>
                  <p><strong>State:</strong> {selectedApplication.residentialaddress?.state}</p>
                  <p><strong>Zip:</strong> {selectedApplication.residentialaddress?.zipcode}</p>
                  <p><strong>Country:</strong> {selectedApplication.residentialaddress?.country}</p>
                </Col>
                <Col md={6}>
                  <h6>Mailing Address</h6>
                  <p><strong>Street:</strong> {selectedApplication.mailingStreet}</p>
                  <p><strong>City:</strong> {selectedApplication.mailingCity}</p>
                  <p><strong>State:</strong> {selectedApplication.mailingState}</p>
                  <p><strong>Zip:</strong> {selectedApplication.mailingZip}</p>
                  <p><strong>Country:</strong> {selectedApplication.mailingCountry}</p>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md={6}>
                  <h6>Insurance Information</h6>
                  <p><strong>Has Existing Insurance:</strong> {selectedApplication.hasExistingInsurance ? 'Yes' : 'No'}</p>
                  <p><strong>Existing Insurance Type:</strong> {selectedApplication.existingInsuranceType || 'N/A'}</p>
                  <p><strong>Health Insurance Provider:</strong> {selectedApplication.healthInsuranceProvider}</p>
                  <p><strong>Is Claimed on Taxes:</strong> {selectedApplication.isClaimedOnTaxes ? 'Yes' : 'No'}</p>
                </Col>
                <Col md={6}>
                  <h6>Additional Information</h6>
                  <p><strong>Is Married:</strong> {selectedApplication.isMarried ? 'Yes' : 'No'}</p>
                  <p><strong>Has Children:</strong> {selectedApplication.hasChildren ? 'Yes' : 'No'}</p>
                  <p><strong>Dependents:</strong> {selectedApplication.dependents?.length || 0}</p>
                  <p><strong>IP Address:</strong> {selectedApplication.ipAddress}</p>
                  <p><strong>User Agent:</strong> {selectedApplication.userAgent}</p>
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