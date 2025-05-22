'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import AgentStatusBar from '../../components/AgentStatusBar';

export default function ApplicationsPage() {
  return (
    <Container fluid>
      <AgentStatusBar />
      <Row className="mb-4">
        <Col>
          <h2>Applications</h2>
          <p className="text-muted">View and manage your applications here.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <p>This is the Applications page. Future applications content will appear here.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 