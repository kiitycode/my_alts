import { useForm } from "react-hook-form";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TasksAPI } from "../services/tasks";
import type { Priority, Status } from "../types/tasks";

type FormValues = {
  name: string;
  description?: string;
  status: Status | "";
  priority: Priority | "";
};

export default function CreateTask() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    defaultValues: { status: "", priority: "" },
  });

  if (!user) return <Navigate to="/login" replace />;

  const onSubmit = async (data: FormValues) => {
    try {
      const created = await TasksAPI.create({
        name: data.name,
        status: data.status as Status,
        priority: data.priority as Priority,
        description: data.description || "",
        userId: user.id,
      });
      reset();
      navigate("/", { state: { refresh: true, highlightTask: created.id } });
    } catch (err) {
      const msg = (err as Error).message || "Failed to create task";
      alert(`Failed to create task: ${msg}`);
      console.error("Creation error:", err);
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
            className="form-control"
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
          {errors.status && <p className="text-danger">{errors.status.message}</p>}
        </div>

        <div className="mb-1">
          <label>Priority</label><br />
          <select {...register("priority", { required: "Priority is required" })}>
            <option value="">-- Select --</option>
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
    </section>
  );
}
