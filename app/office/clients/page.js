'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Table, Button, Modal, Badge } from 'react-bootstrap';
import { 
  FaSearch, FaUser, FaEnvelope, FaPhone, 
  FaEdit, FaTrash, FaPlus 
} from 'react-icons/fa';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import AgentStatusBar from '../../components/AgentStatusBar';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const q = query(
        collection(db, 'clients'),
        orderBy('lastName', 'asc')
      );
      const querySnapshot = await getDocs(q);
      const clientList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClients(clientList);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredClients = clients.filter(client => {
    const searchLower = searchQuery.toLowerCase();
    return (
      client.firstName?.toLowerCase().includes(searchLower) ||
      client.lastName?.toLowerCase().includes(searchLower) ||
      client.email?.toLowerCase().includes(searchLower) ||
      client.phone?.includes(searchQuery)
    );
  });

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setShowClientModal(true);
  };

  const handleDeleteClient = (client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      inactive: 'secondary',
      pending: 'warning'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <Container fluid>
      <AgentStatusBar />
      <Row className="mb-4">
        <Col>
          <h2>Clients</h2>
          <p className="text-muted">Manage your client database</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Group className="flex-grow-1 me-3">
                  <Form.Control
                    type="text"
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </Form.Group>
                <Button variant="primary">
                  <FaPlus className="me-2" />
                  Add Client
                </Button>
              </div>

              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Last Activity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaUser className="me-2 text-muted" />
                          {client.firstName} {client.lastName}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <small>
                            <FaEnvelope className="me-2 text-muted" />
                            {client.email}
                          </small>
                          <small>
                            <FaPhone className="me-2 text-muted" />
                            {client.phone}
                          </small>
                        </div>
                      </td>
                      <td>{getStatusBadge(client.status)}</td>
                      <td>{client.lastActivity}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleViewClient(client)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteClient(client)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Client Details Modal */}
      <Modal show={showClientModal} onHide={() => setShowClientModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClient && (
            <div>
              <h4>{selectedClient.firstName} {selectedClient.lastName}</h4>
              <p className="text-muted">{selectedClient.email}</p>
              {/* Add more client details here */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClientModal(false)}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this client? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger">Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 