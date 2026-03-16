'use client';

import { useState, useEffect } from 'react';
import { getToken, logout } from '../services/auth/auth';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getToken());
  }, []);

  const handleLogout = () => {
    logout();
     router.push('/login');
    setToken(null);
  };

  return { token, handleLogout, setToken };
}