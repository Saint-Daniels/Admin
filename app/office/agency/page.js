'use client';
import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Table, Modal, Form, Badge } from 'react-bootstrap';
import { FaUsers, FaUserPlus, FaBuilding, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function AgencyPage() {
  // Local state for agencies and agents (API-ready, no placeholders)
  const [agencies, setAgencies] = useState([]);
  const [agents, setAgents] = useState([]);

  // Modal state
  const [showAddAgency, setShowAddAgency] = useState(false);
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [newAgency, setNewAgency] = useState({ name: '', location: '', agencyNumber: '' });
  const [newAgent, setNewAgent] = useState({ name: '', email: '', agency: '', status: 'Active', agentNumber: '' });

  // Add Agency handler
  const handleAddAgency = () => {
    setAgencies(prev => [
      ...prev,
      { id: Date.now(), name: newAgency.name, location: newAgency.location, agencyNumber: newAgency.agencyNumber }
    ]);
    setNewAgency({ name: '', location: '', agencyNumber: '' });
    setShowAddAgency(false);
  };

  // Add Agent handler
  const handleAddAgent = () => {
    setAgents(prev => [
      ...prev,
      { id: Date.now(), name: newAgent.name, email: newAgent.email, agency: newAgent.agency, status: newAgent.status, agentNumber: newAgent.agentNumber }
    ]);
    setNewAgent({ name: '', email: '', agency: '', status: 'Active', agentNumber: '' });
    setShowAddAgent(false);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="d-flex align-items-center gap-2 mb-0">
            <FaBuilding className="text-primary" /> Agencies
          </h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowAddAgency(true)}>
            <FaPlus className="me-2" /> Add Agency
          </Button>
        </Col>
      </Row>
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Agency Number</th>
                <th>Agents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agencies.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted">No agencies yet.</td></tr>
              ) : agencies.map(agency => (
                <tr key={agency.id}>
                  <td>{agency.name}</td>
                  <td>{agency.location}</td>
                  <td>{agency.agencyNumber}</td>
                  <td><Badge bg="info">{agents.filter(a => a.agency === agency.name).length}</Badge></td>
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

      <Row className="mb-4">
        <Col>
          <h2 className="d-flex align-items-center gap-2 mb-0">
            <FaUsers className="text-primary" /> Agents
          </h2>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => setShowAddAgent(true)}>
            <FaUserPlus className="me-2" /> Add Agent
          </Button>
        </Col>
      </Row>
      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Agency</th>
                <th>Agent Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-muted">No agents yet.</td></tr>
              ) : agents.map(agent => (
                <tr key={agent.id}>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                  <td>{agent.agency}</td>
                  <td>{agent.agentNumber}</td>
                  <td>
                    <Badge bg={agent.status === 'Active' ? 'success' : 'secondary'}>{agent.status}</Badge>
                  </td>
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

      {/* Add Agency Modal */}
      <Modal show={showAddAgency} onHide={() => setShowAddAgency(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Agency</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Agency Name</Form.Label>
              <Form.Control
                type="text"
                value={newAgency.name}
                onChange={e => setNewAgency({ ...newAgency, name: e.target.value })}
                placeholder="Enter agency name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={newAgency.location}
                onChange={e => setNewAgency({ ...newAgency, location: e.target.value })}
                placeholder="Enter location"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Agency Number</Form.Label>
              <Form.Control
                type="text"
                value={newAgency.agencyNumber}
                onChange={e => setNewAgency({ ...newAgency, agencyNumber: e.target.value })}
                placeholder="Enter assigned agency number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddAgency(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddAgency} disabled={!newAgency.name || !newAgency.location || !newAgency.agencyNumber}>Add Agency</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Agent Modal */}
      <Modal show={showAddAgent} onHide={() => setShowAddAgent(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Agent Name</Form.Label>
              <Form.Control
                type="text"
                value={newAgent.name}
                onChange={e => setNewAgent({ ...newAgent, name: e.target.value })}
                placeholder="Enter agent name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newAgent.email}
                onChange={e => setNewAgent({ ...newAgent, email: e.target.value })}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Agency</Form.Label>
              <Form.Select
                value={newAgent.agency}
                onChange={e => setNewAgent({ ...newAgent, agency: e.target.value })}
              >
                <option value="">Select agency</option>
                {agencies.map(agency => (
                  <option key={agency.id} value={agency.name}>{agency.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Agent Number</Form.Label>
              <Form.Control
                type="text"
                value={newAgent.agentNumber}
                onChange={e => setNewAgent({ ...newAgent, agentNumber: e.target.value })}
                placeholder="Enter assigned agent number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newAgent.status}
                onChange={e => setNewAgent({ ...newAgent, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddAgent(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddAgent} disabled={!newAgent.name || !newAgent.email || !newAgent.agency || !newAgent.agentNumber}>Add Agent</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 