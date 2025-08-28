import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TasksAPI } from "../services/tasks";
import type { Priority, Status, Task } from "../types/tasks";

type FormValues = {
  name: string;
  description?: string;
  status: Status;
  priority: Priority;
};

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();

  useEffect(() => {
    (async () => {
      if (!user || !id) return;
      try {
        const data = await TasksAPI.get(id);
        const isOwner = data.user_id === user.id || data.owner === user.id || data.userId === user.id;
        if (!isOwner) throw new Error("You do not have permission to edit this task");
        reset({
          name: data.name,
          description: data.description || "",
          status: data.status,
          priority: data.priority,
        });
      } catch (err) {
        alert((err as Error).message);
        navigate("/");
      }
    })();
  }, [id, reset, navigate, user]);

  const onSubmit = async (data: FormValues) => {
    try {
      await TasksAPI.update({
        id: id!,
        name: data.name,
        status: data.status,
        priority: data.priority,
        description: data.description || "",
      });
      navigate("/");
    } catch (err) {
      alert(`Failed to update task: ${(err as Error).message}`);
      console.error("Update error:", err);
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
            {...register("name", { required: "Task name is required" })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" {...register("description")} />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select className="form-control" {...register("status", { required: "Status is required" })}>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          {errors.status && <p className="text-danger">{errors.status.message}</p>}
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select className="form-control" {...register("priority", { required: "Priority is required" })}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
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
