'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Here you would typically check for admin authentication
    // For now, we'll just check if there's any user session
    const isAuthenticated = localStorage.getItem('user');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="admin-layout">
      {children}
    </div>
  );
} 