import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchTaskById, deleteTask } from '../services/api';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTask() {
      try {
        const data = await fetchTaskById(id);
        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTask();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        navigate('/');
      } catch (err) {
        alert("Failed to delete task.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <section>
      <h2>{task.name}</h2>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Description:</strong> {task.description || 'N/A'}</p>

      <div className="mt-2 flex-between">
        <Link to="/" className="btn">⬅ Back</Link>
        <Link to={`/edit/${task.id}`} className="btn">✏️ Edit</Link>
        <button onClick={handleDelete} className="btn" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
          🗑 Delete
        </button>
      </div>
    </section>
  );
}
