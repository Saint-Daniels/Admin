'use client';

import { Button } from 'react-bootstrap';
import { FaPhone, FaVideo } from 'react-icons/fa';
import { useDialerStatus } from './DialerStatusContext';

export default function AgentStatusBar() {
  const { isOnCall, isInRoom } = useDialerStatus();
  return (
    <div className="agent-status-bar d-flex align-items-center gap-3 mb-4">
      <Button
        variant="primary"
        className="d-flex align-items-center gap-2 px-4 py-2 fw-semibold rounded-pill"
        style={{ background: '#3887F6', border: 'none', fontSize: '1rem' }}
      >
        <FaVideo />
        {isInRoom ? 'Manager Room' : 'Not in Room'}
      </Button>
      <Button
        variant="success"
        className="d-flex align-items-center gap-2 px-4 py-2 fw-semibold rounded-pill"
        style={{ background: isOnCall ? '#F6C738' : '#38B349', border: 'none', fontSize: '1rem' }}
      >
        <FaPhone />
        {isOnCall ? 'On Call' : 'Ready'}
      </Button>
      <style jsx>{`
        .agent-status-bar {
          background: transparent;
        }
      `}</style>
    </div>
  );
} 