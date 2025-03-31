'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

export default function Benefits() {
  const benefits = [
    {
      title: "Premium Rewards",
      description: "Unlock exclusive healthcare services, products, and experiences with your earned points.",
      icon: "/images/crown-silhouette.svg"
    },
    {
      title: "Royal Treatment",
      description: "Priority scheduling, personalized care plans, and VIP healthcare experiences await you.",
      icon: "/images/shield-silhouette.svg"
    },
    {
      title: "Wellness Incentives",
      description: "Earn points for maintaining your health through preventive care and healthy lifestyle choices.",
      icon: "/images/heart-silhouette.svg"
    }
  ];

  return (
    <section className="benefits-section">
      <Container>
        <h2 className="section-title">ROYAL BENEFITS</h2>
        <Row>
          {benefits.map((benefit, index) => (
            <Col md={4} key={index}>
              <div className="benefit-card text-center">
                <div className="benefit-icon-wrapper mb-4">
                  <Image 
                    src={benefit.icon}
                    alt={benefit.title}
                    width={50}
                    height={50}
                    className="benefit-icon"
                  />
                </div>
                <h3 className="font-serif mb-3">{benefit.title}</h3>
                <p className="text-muted">{benefit.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
} 