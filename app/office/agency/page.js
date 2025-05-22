import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FaUsers } from 'react-icons/fa';

export default function AgencyPage() {
  return (
    <Container className="py-5">
      <Card className="shadow-sm p-4">
        <div className="d-flex align-items-center mb-3">
          <FaUsers size={32} className="me-3 text-primary" />
          <h2 className="mb-0">Agency</h2>
        </div>
        <p className="text-muted">This page will contain agency management features, agent lists, and related tools. Stay tuned!</p>
      </Card>
    </Container>
  );
} 