'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Badge } from 'react-bootstrap';
import { FaGift, FaPlus, FaTrash, FaEdit, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function RewardsPage() {
  // Rewards state (API-ready, mock data)
  const [rewards, setRewards] = useState([
    { id: 'RW-001', name: 'Welcome Gift', type: 'Gift Card', status: 'Active' },
    { id: 'RW-002', name: 'Bronze Badge', type: 'Badge', status: 'Active' },
    { id: 'RW-003', name: 'Platinum Badge', type: 'Badge', status: 'Inactive' },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newReward, setNewReward] = useState({ id: '', name: '', type: '', status: 'Active' });

  // Add Reward handler
  const handleAdd = () => {
    setRewards(prev => [
      ...prev,
      { ...newReward }
    ]);
    setNewReward({ id: '', name: '', type: '', status: 'Active' });
    setShowAdd(false);
  };

  // Remove Reward handler
  const handleRemove = (id) => {
    setRewards(prev => prev.filter(r => r.id !== id));
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="d-flex align-items-center gap-2 mb-0">
            <FaGift className="text-primary" /> Rewards
          </h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowAdd(true)}>
            <FaPlus className="me-2" /> Add Reward
          </Button>
        </Col>
      </Row>
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Reward ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rewards.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted">No rewards yet.</td></tr>
              ) : rewards.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.type}</td>
                  <td>
                    <Badge bg={r.status === 'Active' ? 'success' : 'secondary'}>{r.status}</Badge>
                  </td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => handleRemove(r.id)}><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add Reward Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Reward</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Reward ID</Form.Label>
              <Form.Control
                type="text"
                value={newReward.id}
                onChange={e => setNewReward({ ...newReward, id: e.target.value })}
                placeholder="Enter reward ID (e.g. RW-004)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newReward.name}
                onChange={e => setNewReward({ ...newReward, name: e.target.value })}
                placeholder="Enter reward name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                value={newReward.type}
                onChange={e => setNewReward({ ...newReward, type: e.target.value })}
                placeholder="Enter reward type (e.g. Gift Card, Badge)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newReward.status}
                onChange={e => setNewReward({ ...newReward, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAdd} disabled={!newReward.id || !newReward.name || !newReward.type || !newReward.status}>Add Reward</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 