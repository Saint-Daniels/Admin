'use client';

import { Container, Row, Col } from 'react-bootstrap';

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Join The Kingdom",
      description: "Register for a Saint Daniels account and link your healthcare providers."
    },
    {
      number: "2",
      title: "Earn Royal Points",
      description: "Collect points for healthcare visits, wellness activities, and healthy choices."
    },
    {
      number: "3",
      title: "Claim Your Treasures",
      description: "Redeem your points for healthcare rewards and exclusive benefits."
    }
  ];

  return (
    <section className="how-it-works">
      <Container>
        <h2 className="section-title">ROYAL DECREE: HOW IT WORKS</h2>
        <Row className="justify-content-center">
          {steps.map((step, index) => (
            <Col md={4} key={index} className="text-center mb-4">
              <div className="step-number mx-auto">{step.number}</div>
              <h3 className="font-serif mb-3">{step.title}</h3>
              <p>{step.description}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
} 