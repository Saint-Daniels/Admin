'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import MainNavbar from '@/components/Navbar';

export default function Documents() {
  const documentCategories = [
    {
      title: "Health Insurance Forms",
      description: "Essential forms for insurance claims and coverage.",
      items: [
        { name: "Insurance Claim Form", link: "#" },
        { name: "Coverage Update Form", link: "#" },
        { name: "Dependent Addition Form", link: "#" }
      ]
    },
    {
      title: "Medical Records",
      description: "Forms related to medical history and records requests.",
      items: [
        { name: "Medical Records Request", link: "#" },
        { name: "Health History Form", link: "#" },
        { name: "Release Authorization", link: "#" }
      ]
    },
    {
      title: "Program Guidelines",
      description: "Documentation for our healthcare programs and policies.",
      items: [
        { name: "Member Handbook", link: "#" },
        { name: "Benefits Guide", link: "#" },
        { name: "Wellness Program Guide", link: "#" }
      ]
    }
  ];

  return (
    <>
      <MainNavbar />
      <div className="documents-page">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="documents-title">Documents & Forms</h1>
              <p className="documents-subtitle">
                Access and download important healthcare forms and documentation.
              </p>
            </Col>
          </Row>

          <Row className="mt-5">
            {documentCategories.map((category, index) => (
              <Col md={4} key={index} className="mb-4">
                <div className="document-category-card">
                  <h2 className="category-title">{category.title}</h2>
                  <p className="category-description">{category.description}</p>
                  <ul className="document-list">
                    {category.items.map((item, idx) => (
                      <li key={idx}>
                        <Link href={item.link} className="document-link">
                          <span className="document-icon">📄</span>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>

          <Row className="justify-content-center mt-5">
            <Col md={8} className="text-center">
              <div className="documents-help">
                <h3>Need Help?</h3>
                <p>
                  Can't find what you're looking for? Contact our support team for assistance.
                </p>
                <Link href="/help" className="help-link">
                  Visit Help Center →
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
} 