'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../../hooks/useAuth';
import Header from '../header/header';

interface Props {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token === null) {
      // still checking
      setLoading(true);
    } else if (!token) {
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [token, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Header />
      {children}
    </>
  );
}