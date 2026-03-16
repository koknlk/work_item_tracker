'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getWorkItemById, updateWorkItem } from '../../../../services/api/api';
import { WorkItem, UpdateWorkItemDto } from '../../../../types/WorkItem';
import styles from './EditWorkItem.module.css';
import Header from '@/app/components/header/header';

export default function EditWorkItemPage() {
  const { id } = useParams() as { id: string };
  const [item, setItem] = useState<WorkItem | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    getWorkItemById(id).then(setItem).catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    const dto: UpdateWorkItemDto = {
      title: item.title,
      description: item.description,
      status: item.status
    };

    try {
      await updateWorkItem(id, dto);
      router.push(`/workitems/${id}`);
    } catch (err) {
      console.error('Failed to update:', err);
      alert('Failed to update work item. Check console.');
    }
  };

  if (!item) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
      <h1 className={styles.heading}>Edit Work Item</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Title</label>
        <input
          type="text"
          value={item.title}
          onChange={e => setItem({ ...item, title: e.target.value })}
          className={styles.input}
        />

        <label className={styles.label}>Description</label>
        <textarea
          value={item.description}
          onChange={e => setItem({ ...item, description: e.target.value })}
          className={styles.textarea}
        />

        <label className={styles.label}>Status</label>
        <select
          value={item.status}
          onChange={e =>
            setItem({ ...item, status: e.target.value as 'Open' | 'InProgress' | 'Closed' })
          }
          className={styles.select}
        >
          <option value="Open">Open</option>
          <option value="InProgress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        <button type="submit" className={styles.button}>Update Work Item</button>
      </form>
    </div>
    </div>
    
  );
}