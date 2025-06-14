import React from 'react';
import { useForm } from 'react-hook-form';
import { createTask } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function CreateTask() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createTask({
        name: data.name,
        status: data.status,
        priority: data.priority,
        description: data.description || '',
      });
      navigate('/');
    } catch (err) {
      alert("Failed to create task");
    }
  };

  return (
    <section>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">

        <div className="mb-1">
          <label htmlFor="name">Name</label><br />
          <input
            id="name"
            {...register("name", { required: "Task name is required" })}
            placeholder="e.g. Buy groceries"
            className='form-control'
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="mb-1">
          <label htmlFor="description">Description</label><br />
          <textarea
            id="description"
            {...register("description")}
            placeholder="Optional details..."
            className="form-control"
          />
        </div>

        <div className="mb-1">
          <label>Status</label><br />
          <select {...register("status", { required: "Status is required" })}>
            <option value="">-- Select --</option>
            <option value="TODO">📝 TODO</option>
            <option value="IN_PROGRESS">🚧 In Progress</option>
            <option value="DONE">✅ Done</option>
            <option value="CANCELLED">❌ Cancelled</option>
          </select>
          
        </div>

        <div className="mb-1">
          <label>Priority</label><br />
          <select {...register("priority", { required: "Priority is required" })}>
            <option value="">-- Select --</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="flex-between mt-2">
          <Link to="/" className="btn">⬅ Cancel</Link>
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "💾 Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
