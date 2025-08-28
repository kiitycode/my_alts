import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TasksAPI } from "../services/tasks";
import type { Task } from "../types/tasks";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      if (!user || !id) return;
      try {
        const data = await TasksAPI.get(id);
        const isOwner = data.user_id === user.id || data.owner === user.id || data.userId === user.id;
        if (!isOwner) throw new Error("You do not have permission to view this task.");
        setTask(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user]);

  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await TasksAPI.remove(id);
        navigate("/");
      } catch (err) {
        alert("Failed to delete task. Please try again.");
        console.error("Delete failed:", err);
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

      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Description:</strong> {task.description || "N/A"}</p>

      <div className="mt-2 flex-between">
        <Link to="/" className="btn">⬅ Back</Link>
        <Link to={`/tasks/${task.id}/edit`} className="btn">✏️ Edit</Link>
        <button
          onClick={handleDelete}
          className="btn"
          style={{ backgroundColor: "var(--danger)", color: "white" }}
        >
          🗑 Delete
        </button>
      </div>
    </section>
  );
}
