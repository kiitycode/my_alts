import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchTaskById, updateTask } from '../services/api';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        reset({
          name: data.name,
          description: data.description,
          status: data.status,
          priority: data.priority,
        });
      } catch (err) {
        alert("Failed to load task");
        navigate('/');
      }
    }
    loadTask();
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      await updateTask(id, data);
      navigate('/');
    } catch (err) {
      alert("Failed to update task");
    }
  };

  return (
    <section>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">

        <div className="mb-1">
          <label htmlFor="name">Name</label><br />
          <input
            id="name"
            {...register("name", { required: "Task name is required" })}
            className='form-control'
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="mb-1">
          <label htmlFor="description">Description</label><br />
          <textarea
            id="description"
            {...register("description")}
            className="form-control"
          />
        </div>

        <div className="mb-1">
          <label>Status</label><br />
          <select {...register("status", { required: true })}>
            <option value="TODO">📝 TODO</option>
            <option value="IN_PROGRESS">🚧 In Progress</option>
            <option value="DONE">✅ Done</option>
            <option value="CANCELLED">❌ Cancelled</option>
          </select>
        </div>

        <div className="mb-1">
          <label>Priority</label><br />
          <select {...register("priority", { required: true })}>
            <option value="LOW">🟢 Low</option>
            <option value="MEDIUM">🟠 Medium</option>
            <option value="HIGH">🔴 High</option>
          </select>
        </div>

        <div className="flex-between mt-2">
          <Link to="/" className="btn">⬅ Cancel</Link>
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "✅ Update"}
          </button>
        </div>
      </form>
    </section>
  );
}
