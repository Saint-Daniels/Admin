'use client';

import { createContext, useContext, useState } from 'react';

const DialerStatusContext = createContext();

export function DialerStatusProvider({ children }) {
  const [isOnCall, setIsOnCall] = useState(false);
  const [isInRoom, setIsInRoom] = useState(true);

  return (
    <DialerStatusContext.Provider value={{ isOnCall, setIsOnCall, isInRoom, setIsInRoom }}>
      {children}
    </DialerStatusContext.Provider>
  );
}

export function useDialerStatus() {
  return useContext(DialerStatusContext);
} 