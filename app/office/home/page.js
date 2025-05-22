'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { 
  FaPhone, FaUser, FaEnvelope, FaCalendar, 
  FaChartLine, FaUsers, FaSearch, FaClock 
} from 'react-icons/fa';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import AgentStatusBar from '../../components/AgentStatusBar';
import { useDialerStatus } from '../../components/DialerStatusContext';

export default function HomePage() {
  const { isOnCall, setIsOnCall, isInRoom, setIsInRoom } = useDialerStatus();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTimedIn, setIsTimedIn] = useState(false);
  const [timeInStart, setTimeInStart] = useState(null);
  const [totalTimeToday, setTotalTimeToday] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (isOnCall) {
        setCallDuration(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isOnCall]);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      const q = query(
        collection(db, 'activity'),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const activities = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentActivity(activities);
    };

    fetchRecentActivity();
  }, []);

  const handleCall = async () => {
    setIsOnCall(true);
    setCallDuration(0);
  };

  const handleEndCall = async () => {
    setIsOnCall(false);
    setCallDuration(0);
  };

  const handleToggleRoom = () => {
    setIsInRoom((prev) => !prev);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClockIn = () => {
    setIsTimedIn(true);
    setTimeInStart(new Date());
  };

  const handleClockOut = () => {
    setIsTimedIn(false);
    const endTime = new Date();
    const duration = (endTime - timeInStart) / 1000;
    setTotalTimeToday(prev => prev + duration);
  };

  return (
    <Container fluid>
      <AgentStatusBar />
      <Row className="mb-4">
        <Col>
          <h2>Dashboard</h2>
          <p className="text-muted">Welcome back! Here's your overview for today.</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Phone Dialer</h5>
              <Badge bg={isOnCall ? 'danger' : 'success'}>
                {isOnCall ? 'On Call' : 'Ready'}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex gap-2 mb-2">
                <Button
                  variant={isOnCall ? 'danger' : 'primary'}
                  onClick={isOnCall ? handleEndCall : handleCall}
                >
                  <FaPhone className="me-2" />
                  {isOnCall ? 'End Call' : 'Start Call'}
                </Button>
                {isOnCall && (
                  <Badge bg="secondary" className="d-flex align-items-center">
                    <FaClock className="me-2" />
                    {formatDuration(callDuration)}
                  </Badge>
                )}
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant={isInRoom ? 'primary' : 'outline-primary'}
                  onClick={handleToggleRoom}
                >
                  {isInRoom ? 'Leave Manager Room' : 'Join Manager Room'}
                </Button>
                <span className="align-self-center text-muted">
                  {isInRoom ? 'You are in the Manager Room.' : 'You are not in the Manager Room.'}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Time Tracking</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6>Status</h6>
                  <Badge bg={isTimedIn ? 'success' : 'secondary'}>
                    {isTimedIn ? 'Clocked In' : 'Clocked Out'}
                  </Badge>
                </div>
                <Button
                  variant={isTimedIn ? 'danger' : 'success'}
                  onClick={isTimedIn ? handleClockOut : handleClockIn}
                >
                  {isTimedIn ? 'Clock Out' : 'Clock In'}
                </Button>
              </div>
              <div>
                <h6>Total Time Today</h6>
                <p className="mb-0">{formatDuration(totalTimeToday)}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              {recentActivity.length > 0 ? (
                <div className="list-group">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{activity.title}</h6>
                          <p className="mb-0 text-muted">{activity.description}</p>
                        </div>
                        <small className="text-muted">
                          {new Date(activity.timestamp.toDate()).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No recent activity</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 