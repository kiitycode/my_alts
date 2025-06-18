import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchTaskById, updateTask } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  useEffect(() => {
    async function loadTask() {
      try {
        const data = await fetchTaskById(id);
        
        // Verify ownership
        if (data.user_id !== user?.id && data.owner !== user?.id && data.userId !== user?.id) {
          throw new Error('You do not have permission to edit this task');
        }
        
        reset(data);
      } catch (err) {
        alert(err.message);
        navigate('/');
      }
    }
    
    if (user) loadTask();
  }, [id, reset, navigate, user]);

const onSubmit = async (data) => {
  try {
    const normalizedData = {
      name: data.name,
      status: data.status.toUpperCase().replace('-', '_'),
      priority: data.priority.toUpperCase(),
      description: data.description || ''
    };

    console.log("PATCH Payload:", normalizedData); // Helpful for debugging

    await updateTask(id, normalizedData, user.id);
    navigate('/');
  } catch (err) {
    alert(`Failed to update task: ${err.message}`);
    console.error('Update error:', err);
  }
};

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="container">
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            {...register('name', { required: 'Task name is required' })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            {...register('description')}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            {...register('status', { required: 'Status is required' })}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <p className="text-danger">{errors.status.message}</p>}
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            className="form-control"
            {...register('priority', { required: 'Priority is required' })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="text-danger">{errors.priority.message}</p>}
        </div>

        <div className="flex-between mt-2">
          <Link to="/" className="btn">⬅ Cancel</Link>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "💾 Save"}
            </button>
        </div>
      </form>
    </div>
  );
}