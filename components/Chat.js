'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaSearch, FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function Chat() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock data for contacts - replace with actual API call
  useEffect(() => {
    setContacts([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
    ]);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    // Load chat history for the selected contact
    setMessages([
      { id: 1, sender: contact.id, text: 'Hello!', timestamp: '10:00 AM' },
      { id: 2, sender: 'me', text: 'Hi there!', timestamp: '10:01 AM' },
    ]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedContact) {
      const message = {
        id: messages.length + 1,
        sender: 'me',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-main">
        <div className="chat-header">
          <Form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <Form.Control
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </Form>
        </div>

        {selectedContact ? (
          <div className="chat-conversation">
            <div className="conversation-header">
              <div className="contact-info">
                <h5>{selectedContact.name}</h5>
                <span className="email">{selectedContact.email}</span>
              </div>
              <Button
                variant="link"
                className="close-chat"
                onClick={() => setSelectedContact(null)}
              >
                <FaTimes />
              </Button>
            </div>

            <div className="messages-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="timestamp">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <Form onSubmit={handleSendMessage} className="message-input">
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" variant="primary">
                <FaPaperPlane />
              </Button>
            </Form>
          </div>
        ) : (
          <div className="contacts-list">
            {contacts.map((contact) => (
              <Card
                key={contact.id}
                className="contact-card"
                onClick={() => handleContactSelect(contact)}
              >
                <Card.Body>
                  <h5>{contact.name}</h5>
                  <p className="email">{contact.email}</p>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 