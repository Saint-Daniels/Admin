'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Badge, ProgressBar } from 'react-bootstrap';
import { FaBullhorn, FaPlus, FaEdit, FaTrash, FaChartLine, FaChartBar, FaRocket, FaUsers } from 'react-icons/fa';

export default function MarketingPage() {
  // Campaigns state
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Health Awareness', status: 'Active', startDate: '2024-06-01', endDate: '2024-08-31', audience: 'General', engagement: 32, leads: 215, conversions: 43 },
    { id: 2, name: 'Senior Care Special', status: 'Scheduled', startDate: '2024-08-15', endDate: '2024-10-15', audience: 'Seniors', engagement: 0, leads: 0, conversions: 0 },
    { id: 3, name: 'Family Plan Promotion', status: 'Active', startDate: '2024-07-01', endDate: '2024-09-30', audience: 'Families', engagement: 28, leads: 187, conversions: 36 },
    { id: 4, name: 'Spring Coverage Drive', status: 'Completed', startDate: '2024-03-01', endDate: '2024-05-31', audience: 'General', engagement: 35, leads: 341, conversions: 72 },
  ]);
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: '', status: 'Active', startDate: '', endDate: '', audience: '', engagement: 0, leads: 0, conversions: 0 });

  // Add Campaign handler
  const handleAddCampaign = () => {
    setCampaigns(prev => [
      ...prev,
      { id: Date.now(), ...newCampaign }
    ]);
    setNewCampaign({ name: '', status: 'Active', startDate: '', endDate: '', audience: '', engagement: 0, leads: 0, conversions: 0 });
    setShowAddCampaign(false);
  };

  // BI summary (mocked)
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgEngagement = campaigns.length ? Math.round(campaigns.reduce((sum, c) => sum + c.engagement, 0) / campaigns.length) : 0;
  const conversionRate = totalLeads ? Math.round((totalConversions / totalLeads) * 100) : 0;

  // Performance (mocked)
  const performanceRows = campaigns.map(c => ({
    name: c.name,
    leads: c.leads,
    conversions: c.conversions,
    engagement: c.engagement,
    conversionRate: c.leads ? Math.round((c.conversions / c.leads) * 100) : 0
  }));

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="d-flex align-items-center gap-2 mb-0">
            <FaBullhorn className="text-primary" /> Marketing Campaigns
          </h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowAddCampaign(true)}>
            <FaPlus className="me-2" /> Add Campaign
          </Button>
        </Col>
      </Row>
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Start</th>
                <th>End</th>
                <th>Audience</th>
                <th>Engagement (%)</th>
                <th>Leads</th>
                <th>Conversions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr><td colSpan={9} className="text-center text-muted">No campaigns yet.</td></tr>
              ) : campaigns.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td><Badge bg={c.status === 'Active' ? 'success' : c.status === 'Completed' ? 'secondary' : 'warning'}>{c.status}</Badge></td>
                  <td>{c.startDate}</td>
                  <td>{c.endDate}</td>
                  <td>{c.audience}</td>
                  <td><ProgressBar now={c.engagement} label={`${c.engagement}%`} style={{ minWidth: 80 }} /></td>
                  <td>{c.leads}</td>
                  <td>{c.conversions}</td>
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

      {/* BI Section */}
      <Row className="mb-5 g-4">
        <Col md={3} sm={6} xs={12}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaUsers className="text-primary mb-2" size={28} />
              <h5 className="mb-1">Total Leads</h5>
              <h3 className="fw-bold">{totalLeads}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaRocket className="text-success mb-2" size={28} />
              <h5 className="mb-1">Total Conversions</h5>
              <h3 className="fw-bold">{totalConversions}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaChartLine className="text-info mb-2" size={28} />
              <h5 className="mb-1">Avg. Engagement</h5>
              <h3 className="fw-bold">{avgEngagement}%</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaChartBar className="text-warning mb-2" size={28} />
              <h5 className="mb-1">Conversion Rate</h5>
              <h3 className="fw-bold">{conversionRate}%</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Performance Section */}
      <Row className="mb-4">
        <Col>
          <h4 className="mb-3 d-flex align-items-center gap-2"><FaChartBar className="text-primary" /> Performance</h4>
          <Card className="shadow-sm">
            <Card.Body>
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Leads</th>
                    <th>Conversions</th>
                    <th>Engagement (%)</th>
                    <th>Conversion Rate (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceRows.length === 0 ? (
                    <tr><td colSpan={5} className="text-center text-muted">No data.</td></tr>
                  ) : performanceRows.map((row, i) => (
                    <tr key={i}>
                      <td>{row.name}</td>
                      <td>{row.leads}</td>
                      <td>{row.conversions}</td>
                      <td>{row.engagement}%</td>
                      <td>{row.conversionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Campaign Modal */}
      <Modal show={showAddCampaign} onHide={() => setShowAddCampaign(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Campaign Name</Form.Label>
              <Form.Control
                type="text"
                value={newCampaign.name}
                onChange={e => setNewCampaign({ ...newCampaign, name: e.target.value })}
                placeholder="Enter campaign name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newCampaign.status}
                onChange={e => setNewCampaign({ ...newCampaign, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={newCampaign.startDate}
                onChange={e => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={newCampaign.endDate}
                onChange={e => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Audience</Form.Label>
              <Form.Control
                type="text"
                value={newCampaign.audience}
                onChange={e => setNewCampaign({ ...newCampaign, audience: e.target.value })}
                placeholder="Enter audience (e.g. General, Seniors, Families)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddCampaign(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddCampaign} disabled={!newCampaign.name || !newCampaign.status || !newCampaign.startDate || !newCampaign.endDate || !newCampaign.audience}>Add Campaign</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 