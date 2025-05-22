'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Badge } from 'react-bootstrap';
import { FaHeadset, FaPlus, FaEdit, FaTrash, FaBook, FaUserShield, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function SupportPage() {
  // Support Requests state
  const [requests, setRequests] = useState([
    { id: 1, subject: 'Cannot connect to VPN', category: 'IT', status: 'Pending', submitted: '2024-07-29', agent: 'John Doe', resolution: '' },
    { id: 2, subject: 'Requesting schedule change', category: 'Management', status: 'In Progress', submitted: '2024-07-29', agent: 'Jane Smith', resolution: 'Manager reviewing schedule.' },
    { id: 3, subject: 'Headset audio not working', category: 'IT', status: 'Resolved', submitted: '2024-07-28', agent: 'Mike Brown', resolution: 'Replaced headset cable.' },
  ]);
  const [showAddRequest, setShowAddRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({ subject: '', category: '', agent: '', status: 'Pending', resolution: '' });

  // Knowledge Base state
  const [articles, setArticles] = useState([
    { id: 1, title: 'How to reset your password', category: 'Account', content: 'Go to settings > security > reset password.' },
    { id: 2, title: 'VPN Setup Guide', category: 'IT', content: 'Download the VPN client and follow the setup wizard.' },
    { id: 3, title: 'Commission Structure', category: 'Management', content: 'See the latest commission policy in the HR portal.' },
  ]);
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: '', category: '', content: '' });

  // Team Directory state
  const team = [
    { name: 'John Doe', role: 'Support Agent', email: 'john@company.com', phone: '555-123-4567' },
    { name: 'Jane Smith', role: 'Admin', email: 'jane@company.com', phone: '555-987-6543' },
    { name: 'Mike Brown', role: 'Support Agent', email: 'mike@company.com', phone: '555-456-7890' },
  ];

  // Add Request handler
  const handleAddRequest = () => {
    setRequests(prev => [
      ...prev,
      { id: Date.now(), ...newRequest, submitted: new Date().toISOString().slice(0, 10) }
    ]);
    setNewRequest({ subject: '', category: '', agent: '', status: 'Pending', resolution: '' });
    setShowAddRequest(false);
  };

  // Add Article handler
  const handleAddArticle = () => {
    setArticles(prev => [
      ...prev,
      { id: Date.now(), ...newArticle }
    ]);
    setNewArticle({ title: '', category: '', content: '' });
    setShowAddArticle(false);
  };

  return (
    <Container className="py-4">
      {/* Support Requests Section */}
      <Row className="mb-4">
        <Col>
          <h2 className="d-flex align-items-center gap-2 mb-0">
            <FaHeadset className="text-primary" /> Support Requests
          </h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowAddRequest(true)}>
            <FaPlus className="me-2" /> New Request
          </Button>
        </Col>
      </Row>
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Category</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Agent</th>
                <th>Resolution</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr><td colSpan={7} className="text-center text-muted">No support requests yet.</td></tr>
              ) : requests.map(r => (
                <tr key={r.id}>
                  <td>{r.subject}</td>
                  <td>{r.category}</td>
                  <td><Badge bg={r.status === 'Resolved' ? 'success' : r.status === 'In Progress' ? 'warning' : 'secondary'}>{r.status}</Badge></td>
                  <td>{r.submitted}</td>
                  <td>{r.agent}</td>
                  <td>{r.resolution}</td>
                  <td>
                    <Button variant="outline-secondary" size="sm" className="me-2"><FaEdit /></Button>
                    <Button variant="outline-danger" size="sm"><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Knowledge Base Section */}
      <Row className="mb-4">
        <Col>
          <h2 className="d-flex align-items-center gap-2 mb-0">
            <FaBook className="text-info" /> Knowledge Base
          </h2>
        </Col>
        <Col className="text-end">
          <Button variant="info" onClick={() => setShowAddArticle(true)}>
            <FaPlus className="me-2" /> New Article
          </Button>
        </Col>
      </Row>
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-muted">No articles yet.</td></tr>
              ) : articles.map(a => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.category}</td>
                  <td>{a.content}</td>
                  <td>
                    <Button variant="outline-secondary" size="sm" className="me-2"><FaEdit /></Button>
                    <Button variant="outline-danger" size="sm"><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Team Directory Section */}
      <Row className="mb-4">
        <Col>
          <h2 className="d-flex align-items-center gap-2 mb-0">
            <FaUserShield className="text-success" /> Team Directory
          </h2>
        </Col>
      </Row>
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {team.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-muted">No team members yet.</td></tr>
              ) : team.map((member, i) => (
                <tr key={i}>
                  <td><FaUser className="me-2 text-primary" />{member.name}</td>
                  <td>{member.role}</td>
                  <td><FaEnvelope className="me-2 text-info" />{member.email}</td>
                  <td><FaPhone className="me-2 text-success" />{member.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add Support Request Modal */}
      <Modal show={showAddRequest} onHide={() => setShowAddRequest(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Support Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={newRequest.subject}
                onChange={e => setNewRequest({ ...newRequest, subject: e.target.value })}
                placeholder="Enter request subject"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={newRequest.category}
                onChange={e => setNewRequest({ ...newRequest, category: e.target.value })}
                placeholder="Enter category (e.g. IT, Management)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Agent</Form.Label>
              <Form.Control
                type="text"
                value={newRequest.agent}
                onChange={e => setNewRequest({ ...newRequest, agent: e.target.value })}
                placeholder="Enter agent name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newRequest.status}
                onChange={e => setNewRequest({ ...newRequest, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Resolution</Form.Label>
              <Form.Control
                type="text"
                value={newRequest.resolution}
                onChange={e => setNewRequest({ ...newRequest, resolution: e.target.value })}
                placeholder="Enter resolution (if any)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddRequest(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddRequest} disabled={!newRequest.subject || !newRequest.category || !newRequest.agent}>Add Request</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Article Modal */}
      <Modal show={showAddArticle} onHide={() => setShowAddArticle(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Knowledge Base Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newArticle.title}
                onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
                placeholder="Enter article title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={newArticle.category}
                onChange={e => setNewArticle({ ...newArticle, category: e.target.value })}
                placeholder="Enter category (e.g. IT, Account, Management)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={newArticle.content}
                onChange={e => setNewArticle({ ...newArticle, content: e.target.value })}
                placeholder="Enter article content"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddArticle(false)}>Cancel</Button>
          <Button variant="info" onClick={handleAddArticle} disabled={!newArticle.title || !newArticle.category || !newArticle.content}>Add Article</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 