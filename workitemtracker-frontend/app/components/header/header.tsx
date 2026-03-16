'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { TOKEN_KEY } from '../../../utils/constants';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  // read token on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem(TOKEN_KEY));
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY);
    router.push('/login');
    setToken(null);
  };

  return (
    <header className={styles.header}>
        <h1 className={styles.logo}>Work Item Tracker</h1>
        <nav className={styles.nav}>
          <button
            onClick={() => router.push('/workitems')}
            className={styles.navButton}
          >
            Work Items
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </nav>
      </header>
  );
}