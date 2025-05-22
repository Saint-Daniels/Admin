'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form } from 'react-bootstrap';
import { FaFileAlt, FaPlus, FaEdit, FaTrash, FaUser, FaCalendar, FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';

export default function ApplicationsPage() {
  // Applications state (API-ready, mock data)
  const [applications, setApplications] = useState([
    { id: 1, applicant: 'John Doe', type: 'Health', status: 'Pending', date: '2024-07-29' },
    { id: 2, applicant: 'Jane Smith', type: 'Dental', status: 'Approved', date: '2024-07-28' },
    { id: 3, applicant: 'Mike Brown', type: 'Vision', status: 'Rejected', date: '2024-07-27' },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newApp, setNewApp] = useState({ applicant: '', type: '', status: 'Pending', date: '' });
  const [selectedApp, setSelectedApp] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editApp, setEditApp] = useState(null);

  // Add Application handler
  const handleAdd = () => {
    setApplications(prev => [
      ...prev,
      { id: Date.now(), ...newApp }
    ]);
    setNewApp({ applicant: '', type: '', status: 'Pending', date: '' });
    setShowAdd(false);
  };

  // Edit status handler
  const handleEditStatus = () => {
    setApplications(prev => prev.map(app =>
      app.id === editApp.id ? { ...app, status: editApp.status } : app
    ));
    setShowEdit(false);
    setEditApp(null);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="d-flex align-items-center gap-2 mb-0">
            <FaFileAlt className="text-primary" /> Applications
          </h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowAdd(true)}>
            <FaPlus className="me-2" /> New Application
          </Button>
        </Col>
      </Row>
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted">No applications yet.</td></tr>
              ) : applications.map(app => (
                <tr key={app.id}>
                  <td><FaUser className="me-2 text-primary" />{app.applicant}</td>
                  <td>{app.type}</td>
                  <td>
                    <Badge bg={app.status === 'Approved' ? 'success' : app.status === 'Rejected' ? 'danger' : 'warning'}>
                      {app.status}
                    </Badge>
                  </td>
                  <td><FaCalendar className="me-2 text-info" />{app.date}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => { setSelectedApp(app); setShowView(true); }}><FaEye /></Button>
                    <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => { setEditApp(app); setShowEdit(true); }}><FaEdit /></Button>
                    <Button variant="outline-danger" size="sm"><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* View Application Modal */}
      <Modal show={showView} onHide={() => setShowView(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApp && (
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h4 className="mb-3 d-flex align-items-center gap-2">
                  <FaUser className="text-primary" /> {selectedApp.applicant}
                </h4>
                <Row className="mb-2">
                  <Col md={6}><strong>Type:</strong> {selectedApp.type}</Col>
                  <Col md={6}><strong>Status:</strong> <Badge bg={selectedApp.status === 'Approved' ? 'success' : selectedApp.status === 'Rejected' ? 'danger' : 'warning'}>{selectedApp.status}</Badge></Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Date:</strong> {selectedApp.date}</Col>
                </Row>
                {/* Add more fields here as needed */}
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Application Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Applicant</Form.Label>
              <Form.Control
                type="text"
                value={newApp.applicant}
                onChange={e => setNewApp({ ...newApp, applicant: e.target.value })}
                placeholder="Enter applicant name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                value={newApp.type}
                onChange={e => setNewApp({ ...newApp, type: e.target.value })}
                placeholder="Enter application type (e.g. Health, Dental)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newApp.status}
                onChange={e => setNewApp({ ...newApp, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newApp.date}
                onChange={e => setNewApp({ ...newApp, date: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAdd} disabled={!newApp.applicant || !newApp.type || !newApp.status || !newApp.date}>Add Application</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Status Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Application Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editApp && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editApp.status}
                  onChange={e => setEditApp({ ...editApp, status: e.target.value })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditStatus} disabled={!editApp}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 