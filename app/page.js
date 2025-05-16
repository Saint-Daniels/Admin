'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Use window.location for direct redirection
    window.location.href = '/login';
  }, []);

  return null;
} 