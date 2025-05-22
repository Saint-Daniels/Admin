'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import AgentStatusBar from '../../components/AgentStatusBar';

export default function RewardsPage() {
  return (
    <Container fluid>
      <AgentStatusBar />
      <Row className="mb-4">
        <Col>
          <h2>Rewards</h2>
          <p className="text-muted">View and manage your rewards here.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <p>This is the Rewards page. Future rewards content will appear here.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 