'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getWorkItemById, deleteWorkItem } from '../../../services/api/api';
import { WorkItem } from '../../../types/WorkItem'; 
import Header from '../../components/header/header';
import styles from './ViewWorkItem.module.css';

export default function ViewWorkItemPage() {
  const { id } = useParams() as { id: string };
  const [item, setItem] = useState<WorkItem | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    if (!id) return;
    getWorkItemById(id)
      .then(setItem)
      .catch(err => console.error(err));
  }, [id]);

  if (!item) return <p className={styles.loading}>Loading work item...</p>;

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this work item?')) return;
    try {
      await deleteWorkItem(item.id);
      router.push('/workitems');
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Error deleting work item. Check console.');
    }
  };

  return (
    <div className={styles.pageContainer}>

       <Header />

     
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.description}>{item.description}</p>

          <div className={styles.meta}>
            <span>Status: <strong>{item.status}</strong></span>
            <span>Created: {new Date(item.createdAt).toLocaleString()}</span>
          </div>

          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}