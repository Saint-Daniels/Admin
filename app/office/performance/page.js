'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Pagination, ProgressBar } from 'react-bootstrap';
import { FaChartLine, FaChartBar, FaDownload, FaSearch, FaShieldAlt, FaUsers, FaMoneyBillWave, FaFileAlt } from 'react-icons/fa';

export default function PerformancePage() {
  const [auditFilter, setAuditFilter] = useState('all');
  const [auditSearch, setAuditSearch] = useState('');
  const [auditPage, setAuditPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for business intelligence
  const biMetrics = {
    totalUsers: 1250,
    activeUsers: 890,
    totalApplications: 450,
    pendingApplications: 78,
    totalRevenue: 1250000,
    monthlyGrowth: 12.5,
    conversionRate: 68.3,
    averageResponseTime: 2.4
  };

  // Mock data for performance metrics
  const performanceMetrics = {
    systemUptime: 99.98,
    averageLoadTime: 1.2,
    errorRate: 0.02,
    activeSessions: 245,
    databaseQueries: 12500,
    apiRequests: 8900,
    cacheHitRate: 92.5,
    bandwidthUsage: 45.8
  };

  // Mock audit data
  const allActivities = [
    {
      timestamp: '2024-03-15 15:30:00',
      user: 'John Smith',
      action: 'Login',
      transactionId: 'TRX-001',
      details: 'Successful login from IP 192.168.1.1',
      status: 'Success'
    },
    // Add more mock data as needed
  ];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Performance & Business Intelligence</h2>
          <p className="text-muted">Monitor system performance and business metrics in real-time.</p>
        </Col>
      </Row>

      {/* Business Intelligence Section */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <h6 className="card-title d-flex align-items-center">
                <FaUsers className="me-2 text-primary" /> User Metrics
              </h6>
              <div className="metric-value">{biMetrics.totalUsers}</div>
              <div className="metric-label">Total Users</div>
              <ProgressBar now={(biMetrics.activeUsers / biMetrics.totalUsers) * 100} 
                label={`${Math.round((biMetrics.activeUsers / biMetrics.totalUsers) * 100)}%`} 
                className="mt-2" />
              <div className="metric-subtext">{biMetrics.activeUsers} Active Users</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <h6 className="card-title d-flex align-items-center">
                <FaFileAlt className="me-2 text-primary" /> Applications
              </h6>
              <div className="metric-value">{biMetrics.totalApplications}</div>
              <div className="metric-label">Total Applications</div>
              <ProgressBar now={(biMetrics.pendingApplications / biMetrics.totalApplications) * 100} 
                label={`${Math.round((biMetrics.pendingApplications / biMetrics.totalApplications) * 100)}%`} 
                className="mt-2" />
              <div className="metric-subtext">{biMetrics.pendingApplications} Pending</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <h6 className="card-title d-flex align-items-center">
                <FaMoneyBillWave className="me-2 text-primary" /> Revenue
              </h6>
              <div className="metric-value">${(biMetrics.totalRevenue / 1000000).toFixed(1)}M</div>
              <div className="metric-label">Total Revenue</div>
              <ProgressBar now={biMetrics.monthlyGrowth} 
                label={`${biMetrics.monthlyGrowth}%`} 
                className="mt-2" />
              <div className="metric-subtext">Monthly Growth</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <h6 className="card-title d-flex align-items-center">
                <FaChartLine className="me-2 text-primary" /> Performance
              </h6>
              <div className="metric-value">{biMetrics.conversionRate}%</div>
              <div className="metric-label">Conversion Rate</div>
              <ProgressBar now={biMetrics.conversionRate} 
                label={`${biMetrics.conversionRate}%`} 
                className="mt-2" />
              <div className="metric-subtext">{biMetrics.averageResponseTime}s Avg Response</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* System Performance Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0 d-flex align-items-center">
                <FaChartBar className="me-2" /> System Performance
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <div className="performance-metric">
                    <div className="metric-label">System Uptime</div>
                    <div className="metric-value">{performanceMetrics.systemUptime}%</div>
                    <ProgressBar now={performanceMetrics.systemUptime} className="mt-2" />
                  </div>
                </Col>
                <Col md={3}>
                  <div className="performance-metric">
                    <div className="metric-label">Average Load Time</div>
                    <div className="metric-value">{performanceMetrics.averageLoadTime}s</div>
                    <ProgressBar now={(performanceMetrics.averageLoadTime / 3) * 100} className="mt-2" />
                  </div>
                </Col>
                <Col md={3}>
                  <div className="performance-metric">
                    <div className="metric-label">Error Rate</div>
                    <div className="metric-value">{performanceMetrics.errorRate}%</div>
                    <ProgressBar now={performanceMetrics.errorRate} className="mt-2" variant="danger" />
                  </div>
                </Col>
                <Col md={3}>
                  <div className="performance-metric">
                    <div className="metric-label">Cache Hit Rate</div>
                    <div className="metric-value">{performanceMetrics.cacheHitRate}%</div>
                    <ProgressBar now={performanceMetrics.cacheHitRate} className="mt-2" variant="success" />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Audit Log Section */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 d-flex align-items-center">
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
                  Showing {Math.min((auditPage - 1) * itemsPerPage + 1, allActivities.length)} to {Math.min(auditPage * itemsPerPage, allActivities.length)} of {allActivities.length} entries
                </div>
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => setAuditPage(prev => Math.max(prev - 1, 1))}
                    disabled={auditPage === 1}
                  />
                  {[...Array(Math.ceil(allActivities.length / itemsPerPage))].map((_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === auditPage}
                      onClick={() => setAuditPage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next 
                    onClick={() => setAuditPage(prev => Math.min(prev + 1, Math.ceil(allActivities.length / itemsPerPage)))}
                    disabled={auditPage === Math.ceil(allActivities.length / itemsPerPage)}
                  />
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 