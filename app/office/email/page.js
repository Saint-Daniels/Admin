'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { FaInbox, FaStar, FaPaperPlane, FaTrash, FaDraft2Digital, FaSearch, FaPlus } from 'react-icons/fa';

export default function Email() {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const emails = [
    {
      id: 1,
      from: "John Doe",
      subject: "Project Update",
      preview: "Here's the latest update on the project...",
      time: "10:30 AM",
      unread: true,
      starred: false
    },
    {
      id: 2,
      from: "Jane Smith",
      subject: "Meeting Tomorrow",
      preview: "Let's discuss the upcoming presentation...",
      time: "9:15 AM",
      unread: false,
      starred: true
    },
    {
      id: 3,
      from: "Mike Johnson",
      subject: "Contract Review",
      preview: "Please review the attached contract...",
      time: "Yesterday",
      unread: true,
      starred: false
    }
  ];

  return (
    <div className="email-page">
      <Container fluid>
        <Row>
          {/* Email Sidebar */}
          <Col md={3} className="email-sidebar">
            <div className="email-compose mb-4">
              <Button variant="primary" className="w-100">
                <FaPlus className="me-2" /> Compose
              </Button>
            </div>
            <div className="email-folders">
              <div className="folder-item active">
                <FaInbox className="folder-icon" />
                <span>Inbox</span>
                <Badge bg="primary" className="ms-auto">14</Badge>
              </div>
              <div className="folder-item">
                <FaStar className="folder-icon" />
                <span>Starred</span>
              </div>
              <div className="folder-item">
                <FaPaperPlane className="folder-icon" />
                <span>Sent</span>
              </div>
              <div className="folder-item">
                <FaDraft2Digital className="folder-icon" />
                <span>Drafts</span>
              </div>
              <div className="folder-item">
                <FaTrash className="folder-icon" />
                <span>Trash</span>
              </div>
            </div>
          </Col>

          {/* Email List */}
          <Col md={9} className="email-content">
            <div className="email-header">
              <Form.Control
                type="search"
                placeholder="Search emails..."
                className="email-search"
              />
            </div>
            <div className="email-list">
              {emails.map((email) => (
                <div 
                  key={email.id} 
                  className={`email-item ${email.unread ? 'unread' : ''}`}
                  onClick={() => setSelectedEmail(email)}
                >
                  <div className="email-item-content">
                    <div className="email-sender">
                      {email.starred && <FaStar className="star-icon" />}
                      <span className={email.unread ? 'fw-bold' : ''}>{email.from}</span>
                    </div>
                    <div className="email-subject">
                      <span className={email.unread ? 'fw-bold' : ''}>{email.subject}</span>
                      <span className="email-preview">{email.preview}</span>
                    </div>
                    <div className="email-time">{email.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 