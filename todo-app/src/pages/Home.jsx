import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const loadTasks = async () => {
    if (!user) return;
    
    try {
      console.log(`Loading tasks for user ${user.id}...`);
      const data = await fetchTasks(user.id);
      setTasks(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [user, refreshKey]);

  useEffect(() => {
    if (location.state?.refresh) {
      console.log('Refresh triggered from navigation state');
      setRefreshKey(prev => prev + 1);
    }
  }, [location.state]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filtered & Paginated Tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === 'all' || task.status === status;
    const matchesPriority = priority === 'all' || task.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => setCurrentPage(page);

  return (
    <main className="container">
      {/* User header at the top */}
      <div className="user-header">
        <div className="user-greeting">
          Welcome, <span>{user?.username}</span>
        </div>
        <button onClick={handleLogout} className="btn logout-btn">
          Logout
        </button>
      </div>

      {/* Main content area - removed the extra dark container */}
      <div className="main-content">
        <div className="flex-between">
          <h1>📋 Task List</h1>
          <Link to="/create" className="btn">+ New Task</Link>
        </div>

        {/* Search & Filter */}
        <div className="mt-2 flex-between">
          <input
            type="text"
            placeholder="Search task name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '40%' }}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="TODO">📝 TODO</option>
            <option value="IN_PROGRESS">🚧 In Progress</option>
            <option value="DONE">✅ Done</option>
            <option value="CANCELLED">❌ Cancelled</option>
          </select>

          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="all">All Priorities</option>
            <option value="LOW">🟢 Low</option>
            <option value="MEDIUM">🟠 Medium</option>
            <option value="HIGH">🔴 High</option>
          </select>
        </div>

        {loading && <p className="mt-2">Loading tasks...</p>}
        {error && <p className="mt-2 text-danger">{error}</p>}
        {!loading && filteredTasks.length === 0 && <p className="mt-2">No tasks found.</p>}

        <ul className="mt-2">
          {currentTasks.map((task) => (
            <li key={task.id} className="card mb-1">
              <div className="flex-between">
                <div>
                  <strong>{task.name}</strong>
                  <p className="mt-1">
                    <span>Status: {task.status}</span><br />
                    <span>Priority: {task.priority}</span>
                  </p>
                </div>
                <Link to={`/tasks/${task.id}`} className="btn">View</Link>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex-between mt-2 pagination-controls">
          {currentPage > 1 && (
            <button onClick={() => goToPage(currentPage - 1)} className="btn">⬅ Prev</button>
          )}

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className="btn"
              disabled={currentPage === i + 1}
              style={{
                background: currentPage === i + 1 ? 'var(--accent)' : 'var(--gold)',
                color: currentPage === i + 1 ? 'white' : 'black',
              }}
            >
              {i + 1}
            </button>
          ))}

          {currentPage < totalPages && (
            <button onClick={() => goToPage(currentPage + 1)} className="btn">Next ➡</button>
          )}
        </div>
      </div>
    </main>
  );
}