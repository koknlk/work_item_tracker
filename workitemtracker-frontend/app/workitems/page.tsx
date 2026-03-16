'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWorkItems, deleteWorkItem } from '../../services/api/api';
import { WorkItem } from '../../types/WorkItem';
import Header from '../../app/components/header/header';
import styles from '../workitems/WorkItem.module.css';
import ProtectedLayout from '../components/header/protectLayout';

export default function WorkItemsPage() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('');

  const fetchItems = async () => {
    const data = await getWorkItems(status || undefined, sort || undefined);
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, [status, sort]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this work item?')) return;
    try {
      await deleteWorkItem(id);
    
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Error deleting work item. Check console.');
    }
  };

  return (
    
      
    <div className={styles.pageContainer}>
      {/*<ProtectedLayout>*/}
        <Header />
       <div className={styles.container}>
  
  <h1 className={styles.heading}>Work Items</h1>

  <div className={styles.filters}>
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className={styles.select} > 
      <option value="Open">Open</option>
      <option value="InProgress">In Progress</option>
      <option value="Closed">Closed</option>
    </select>

    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className={styles.select}
    >
      <option value="">Sort By</option>
      <option value="createdAt">Created At</option>
      <option value="title">Title</option>
    </select>

    <Link href="/workitems/add" className={styles.newButton}>
      + New
    </Link>
  </div>

  <ul className={styles.list}>
    {items.map((item) => (
      <li key={item.id} className={styles.listItem}>
        <div>
          <Link href={`/workitems/${item.id}`} className={styles.itemTitle}>
            {item.title}
          </Link>
          <p className={styles.itemStatus}>{item.status}</p>
        </div>

        <div className={styles.actions}>
          <Link href={`/workitems/${item.id}/edit`} className={styles.actionLink}>
            Edit
          </Link> 
          <button
            onClick={() => handleDelete(item.id)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
      {/*</ProtectedLayout>*/}
      
    </div>
   
  );
}