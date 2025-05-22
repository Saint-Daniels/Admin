'use client';

import { useState, useEffect } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaPhone, FaDoorOpen } from 'react-icons/fa';

export default function AgentStatusWidget() {
  const [isOnCall, setIsOnCall] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);

  // Simulated status updates - replace with actual status tracking logic
  useEffect(() => {
    // Example: Check call status every 5 seconds
    const callInterval = setInterval(() => {
      // Replace with actual call status check
      setIsOnCall(Math.random() > 0.5);
    }, 5000);

    // Example: Check room status every 5 seconds
    const roomInterval = setInterval(() => {
      // Replace with actual room status check
      setIsInRoom(Math.random() > 0.5);
    }, 5000);

    return () => {
      clearInterval(callInterval);
      clearInterval(roomInterval);
    };
  }, []);

  return (
    <Card className="status-widget">
      <Card.Body className="d-flex gap-3 align-items-center">
        <div className="status-indicator">
          <Badge 
            bg={isOnCall ? "success" : "secondary"} 
            className="d-flex align-items-center gap-2 p-2"
          >
            <FaPhone />
            <span>{isOnCall ? "On Call" : "Available"}</span>
          </Badge>
        </div>
        <div className="status-indicator">
          <Badge 
            bg={isInRoom ? "primary" : "secondary"} 
            className="d-flex align-items-center gap-2 p-2"
          >
            <FaDoorOpen />
            <span>{isInRoom ? "In Room" : "Away"}</span>
          </Badge>
        </div>
      </Card.Body>

      <style jsx>{`
        .status-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border-radius: 10px;
          background: white;
        }
        .status-indicator {
          transition: all 0.3s ease;
        }
        .status-indicator:hover {
          transform: scale(1.05);
        }
      `}</style>
    </Card>
  );
} 