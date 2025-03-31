'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Rewards() {
  const rewards = [
    {
      title: "Premium Gym Access",
      points: "5,000 Points",
      description: "Get access to premium gym facilities to support your fitness journey."
    },
    {
      title: "$5 Walgreens Gift Card",
      points: "500 Points",
      description: "Redeem your points for a Walgreens gift card to use on health and wellness products."
    },
    {
      title: "Royal Health Tech",
      points: "2000 Points",
      description: "Premium health monitoring devices to keep track of your vital health metrics."
    }
  ];

  return (
    <section className="rewards-section">
      <Container>
        <h2 className="section-title">ROYAL TREASURES</h2>
        <Row>
          {rewards.map((reward, index) => (
            <Col md={4} key={index}>
              <Card className="reward-card">
                <Card.Body className="text-center">
                  <h3 className="font-serif mb-3">{reward.title}</h3>
                  <span className="points-badge mb-3">
                    {reward.points}
                  </span>
                  <p className="text-muted">{reward.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
} 