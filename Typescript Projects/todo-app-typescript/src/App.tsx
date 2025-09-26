import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Crash from "./pages/Crash";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="container">Loading...</div>;

  return (
    <main className="container">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/tasks/:id" element={user ? <DetailPage /> : <Navigate to="/login" />} />
        <Route path="/create" element={user ? <CreateTask /> : <Navigate to="/login" />} />
        <Route path="/tasks/:id/edit" element={user ? <EditTask /> : <Navigate to="/login" />} />
        <Route path="/crash-test" element={<Crash />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}
