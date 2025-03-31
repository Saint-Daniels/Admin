'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center g-0">
          <Col lg={6} className="order-lg-1">
            <div className="hero-image-container">
              <Image 
                src="/images/Poland.jpeg"
                alt="Royal Healthcare"
                width={500}
                height={500}
                className="hero-image"
                priority
              />
            </div>
          </Col>
          <Col lg={6} className="order-lg-2">
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="royal-text">ROYAL</span>
                <br />
                <span className="royal-text">HEALTHCARE</span>
              </h1>
              <p className="lead mb-3">
                Take control of your healthcare journey with rewards fit for royalty. 
                Sign up today and begin earning points towards a healthier, more rewarding future.
              </p>
              <button 
                className="btn-royal-gold"
                onClick={() => router.push('/signup')}
              >
                BEGIN YOUR ROYAL JOURNEY
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
} 