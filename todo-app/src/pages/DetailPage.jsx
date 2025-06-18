import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchTaskById, deleteTask } from '../services/api';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTask() {
      try {
        const data = await fetchTaskById(id);

        const isOwner = data.user_id === user?.id || data.owner === user?.id || data.userId === user?.id;

        if (!isOwner) {
          throw new Error('You do not have permission to view this task.');
        }

        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (user) loadTask();
  }, [id, user]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        navigate('/');
      } catch (err) {
        alert("Failed to delete task. Please try again.");
        console.error('Delete failed:', err);
      }
    }
  };

  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <p>Loading task details...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!task) return <p className="text-danger">Task not found</p>;

  return (
    <section>
      <h2>{task.name}</h2>
      {task.isTemp && <p className="text-warning">This task is being saved...</p>}

      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Description:</strong> {task.description || 'N/A'}</p>

      <div className="mt-2 flex-between">
        <Link to="/" className="btn">⬅ Back</Link>
        <Link to={`/tasks/${task.id}/edit`} className="btn">✏️ Edit</Link>
        <button
          onClick={handleDelete}
          className="btn"
          style={{ backgroundColor: 'var(--danger)', color: 'white' }}
          disabled={task.isTemp}
        >
          🗑 Delete
        </button>
      </div>
    </section>
  );
}
