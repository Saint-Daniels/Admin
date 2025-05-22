'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import AgentStatusBar from '../../components/AgentStatusBar';

export default function AuditPage() {
  return (
    <Container fluid>
      <AgentStatusBar />
      <Row className="mb-4">
        <Col>
          <h2>Audit</h2>
          <p className="text-muted">View and manage audit logs and compliance here.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <p>This is the Audit page. Future audit content will appear here.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 