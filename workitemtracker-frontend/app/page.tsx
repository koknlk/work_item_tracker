'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import WorkItemsPage from './workitems/page';

export default function HomePage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (token === null) {
      setLoading(true); 
    } else if (!token) {
      router.push('/login'); 
    } else {
      setLoading(false); 
    }
  }, [token, router]);

  if (loading) return <p>Loading...</p>;

  return <WorkItemsPage />;
}