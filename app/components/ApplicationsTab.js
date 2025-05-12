'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, Table, Button, Badge, Form, InputGroup, Modal, Spinner, Row, Col } from 'react-bootstrap';
import { FaSearch, FaEdit, FaCheck, FaCheckCircle, FaTimesCircle, FaInbox } from 'react-icons/fa';
import { collection, getDocs, query, orderBy, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function ApplicationsTab() {
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
    return applications.filter(app => {
      // Convert search term to lowercase for case-insensitive search
      const searchTerm = applicationSearchTerm.toLowerCase().trim();
      
      // If search term is empty, show all applications
      if (!searchTerm) return true;

      // Search in multiple fields
      const matchesSearch = 
        (app.clientName?.toLowerCase().includes(searchTerm)) ||
        (app.clientId?.toLowerCase().includes(searchTerm)) ||
        (app.id?.toLowerCase().includes(searchTerm)) ||
        (app.fullName?.toLowerCase().includes(searchTerm)) ||
        (app.email?.toLowerCase().includes(searchTerm));

      if (!matchesSearch) return false;

      // Apply timeframe filter if search matches
      if (applicationTimeframe === 'all') return true;

      const submissionDate = new Date(app.submissionDate);
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
  }, [applications, applicationSearchTerm, applicationTimeframe]);

  // Calculate pagination
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  // Fetch applications from Firestore
  useEffect(() => {
    const createTestApplication = async () => {
      try {
        const applicationsRef = collection(db, 'applications');
        const testApplication = {
          clientName: 'John Doe',
          clientId: 'CLI-001',
          agentId: 'AGT-001',
          submissionDate: new Date().toISOString(),
          hasRecording: false,
          hasESignature: false,
          status: 'Pending',
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          selectedInsuranceCarrier: 'Blue Cross',
          createdAt: new Date().toISOString()
        };
        
        await addDoc(applicationsRef, testApplication);
        console.log('Test application created successfully');
      } catch (error) {
        console.error('Error creating test application:', error);
      }
    };

    const fetchApplications = async () => {
      try {
        setIsLoadingApplications(true);
        console.log('Starting to fetch applications from Firestore...');
        
        const applicationsRef = collection(db, 'applications');
        console.log('Collection reference:', applicationsRef);
        
        const q = query(applicationsRef, orderBy('submissionDate', 'desc'));
        console.log('Query created:', q);
        
        const querySnapshot = await getDocs(q);
        console.log('Query executed. Number of documents:', querySnapshot.docs.length);
        
        if (querySnapshot.empty) {
          console.log('No documents found in the applications collection');
          // Create a test application if none exist
          await createTestApplication();
          // Fetch again after creating test data
          const newSnapshot = await getDocs(q);
          const applicationsData = newSnapshot.docs.map(doc => {
            const data = doc.data();
            console.log('Document data:', { id: doc.id, ...data });
            return {
              id: doc.id,
              clientName: data.clientName || data.fullName || 'N/A',
              clientId: data.clientId || 'N/A',
              agentId: data.agentId || 'N/A',
              submissionDate: data.submissionDate || new Date().toISOString(),
              hasRecording: data.hasRecording || false,
              hasESignature: data.hasESignature || false,
              status: data.status || 'Pending',
              fullName: data.fullName || data.clientName || 'N/A',
              email: data.email || 'N/A',
              ...data
            };
          });
          console.log('Final applications data:', applicationsData);
          setApplications(applicationsData);
        } else {
          const applicationsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            console.log('Document data:', { id: doc.id, ...data });
            return {
              id: doc.id,
              clientName: data.clientName || data.fullName || 'N/A',
              clientId: data.clientId || 'N/A',
              agentId: data.agentId || 'N/A',
              submissionDate: data.submissionDate || new Date().toISOString(),
              hasRecording: data.hasRecording || false,
              hasESignature: data.hasESignature || false,
              status: data.status || 'Pending',
              fullName: data.fullName || data.clientName || 'N/A',
              email: data.email || 'N/A',
              ...data
            };
          });
          console.log('Final applications data:', applicationsData);
          setApplications(applicationsData);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          stack: error.stack
        });
      } finally {
        setIsLoadingApplications(false);
      }
    };

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
                      name="search"
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
                    name="timeframe"
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
                <th>Client Name</th>
                <th>Client ID</th>
                <th>Application ID</th>
                <th>Agent ID</th>
                <th>Submitted</th>
                <th>Recording</th>
                <th>E-Signature</th>
                <th>Status</th>
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
                    <td>{app.clientName || 'N/A'}</td>
                    <td>{app.clientId || 'N/A'}</td>
                    <td>{app.id}</td>
                    <td>{app.agentId || 'N/A'}</td>
                    <td>{new Date(app.submissionDate).toLocaleDateString()}</td>
                    <td className="text-center">
                      {app.hasRecording ? <FaCheckCircle color="green" /> : <FaTimesCircle color="gray" />}
                    </td>
                    <td className="text-center">
                      {app.hasESignature ? <FaCheckCircle color="green" /> : <FaTimesCircle color="gray" />}
                    </td>
                    <td>
                      <Badge bg={app.status === 'Confirmed' ? 'success' : 'warning'}>
                        {app.status || 'Pending'}
                      </Badge>
                    </td>
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
                      No applications found.
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
            Application Details - {selectedApplication?.clientName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication ? (
            <div>
              <Row>
                <Col md={6}>
                  <p><strong>Client Name:</strong> {selectedApplication.clientName}</p>
                  <p><strong>Client ID:</strong> {selectedApplication.clientId}</p>
                  <p><strong>Application ID:</strong> {selectedApplication.id}</p>
                  <p><strong>Agent ID:</strong> {selectedApplication.agentId}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Submission Date:</strong> {new Date(selectedApplication.submissionDate).toLocaleString()}</p>
                  <p><strong>Status:</strong> {selectedApplication.status || 'Pending'}</p>
                  <p><strong>Recording:</strong> {selectedApplication.hasRecording ? 'Yes' : 'No'}</p>
                  <p><strong>E-Signature:</strong> {selectedApplication.hasESignature ? 'Yes' : 'No'}</p>
                </Col>
              </Row>
              <hr />
              <h6>Additional Details</h6>
              <pre className="bg-light p-3 rounded">
                {JSON.stringify(selectedApplication, null, 2)}
              </pre>
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