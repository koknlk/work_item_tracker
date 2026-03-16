'use client';

import { useState } from 'react';
import { CreateWorkItemDto } from '../../../types/WorkItem';
import { createWorkItem } from '../../../services/api/api';
import { useRouter } from 'next/navigation';
import Header from '../../components/header/header';
import styles from '../add/Add.module.css';

export default function AddWorkItemPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Open' | 'InProgress' | 'Closed'>('Open');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dto: CreateWorkItemDto = { title, description, status };
    try {
      await createWorkItem(dto);
      router.push('/workitems');
    } catch (err) {
      console.error(err);
      alert('Failed to create work item');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
      <h1 className={styles.heading}>Add Work Item</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={styles.input}
        />

        <label className={styles.label}>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={styles.textarea}
        />

        <label className={styles.label}>Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value as 'Open' | 'InProgress' | 'Closed')}
          className={styles.select}
        >
          <option value="Open">Open</option>
          <option value="InProgress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        <button type="submit" className={styles.button}>
          Create Work Item
        </button>
      </form>
    </div>
    </div>
    
  );
}