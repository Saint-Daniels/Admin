'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { 
  FaCalendar, FaPlus, FaClock, FaUser, 
  FaMapMarkerAlt, FaEdit, FaTrash 
} from 'react-icons/fa';
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import AgentStatusBar from '../../components/AgentStatusBar';

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    attendees: []
  });

  useEffect(() => {
    fetchEvents();
  }, [selectedDate]);

  const fetchEvents = async () => {
    try {
      const q = query(
        collection(db, 'events'),
        where('date', '==', selectedDate.toISOString().split('T')[0])
      );
      const querySnapshot = await getDocs(q);
      const eventList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventList);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      location: '',
      attendees: []
    });
    setShowEventModal(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent(event);
    setShowEventModal(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, 'events', eventId));
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleSaveEvent = async () => {
    try {
      const eventData = {
        ...newEvent,
        date: selectedDate.toISOString().split('T')[0]
      };

      if (selectedEvent) {
        await updateDoc(doc(db, 'events', selectedEvent.id), eventData);
      } else {
        await addDoc(collection(db, 'events'), eventData);
      }

      setShowEventModal(false);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container fluid>
      <AgentStatusBar />
      <Row className="mb-4">
        <Col>
          <h2>Calendar</h2>
          <p className="text-muted">Manage your schedule and appointments</p>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                {selectedDate.toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h5>
              <Button variant="primary" onClick={handleAddEvent}>
                <FaPlus className="me-2" />
                Add Event
              </Button>
            </Card.Header>
            <Card.Body>
              {events.length > 0 ? (
                <ListGroup>
                  {events.map((event) => (
                    <ListGroup.Item key={event.id}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{event.title}</h6>
                          <p className="mb-1 text-muted">{event.description}</p>
                          <div className="d-flex gap-3 text-muted">
                            <small>
                              <FaClock className="me-1" />
                              {formatTime(event.startTime)} - {formatTime(event.endTime)}
                            </small>
                            {event.location && (
                              <small>
                                <FaMapMarkerAlt className="me-1" />
                                {event.location}
                              </small>
                            )}
                          </div>
                        </div>
                        <div>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEditEvent(event)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center text-muted py-5">
                  <FaCalendar size={48} className="mb-3" />
                  <h5>No events scheduled</h5>
                  <p>Click "Add Event" to schedule something</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item action>
                  <FaUser className="me-2" />
                  Schedule Client Meeting
                </ListGroup.Item>
                <ListGroup.Item action>
                  <FaClock className="me-2" />
                  Set Reminder
                </ListGroup.Item>
                <ListGroup.Item action>
                  <FaMapMarkerAlt className="me-2" />
                  Add Location
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Event Modal */}
      <Modal show={showEventModal} onHide={() => setShowEventModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent ? 'Edit Event' : 'Add New Event'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEventModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEvent}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 