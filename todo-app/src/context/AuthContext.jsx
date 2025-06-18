import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const TASKS_CACHE_KEY = 'cached_tasks';
const BASE_URL = "https://api.oluwasetemi.dev";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync tasks on login
  const syncTasks = async (userId) => {
    try {
      const cachedTasks = JSON.parse(localStorage.getItem(TASKS_CACHE_KEY)) || [];
      const userTasks = cachedTasks.filter(t => 
        t.user_id === userId || 
        t.owner === userId || 
        t.userId === userId
      );
      
      // Sync each task with the API
      await Promise.all(userTasks.map(task => 
        fetch(`${BASE_URL}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task)
        }).catch(e => console.error('Sync failed for:', task.id, e))
      ));
    } catch (err) {
      console.error('Sync error:', err);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('todo_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      syncTasks(parsedUser.id); // Sync tasks on initial load
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const authenticatedUser = {
      id: userData.id || Date.now().toString(),
      username: userData.username,
      token: userData.token
    };
    localStorage.setItem('todo_user', JSON.stringify(authenticatedUser));
    setUser(authenticatedUser);
    syncTasks(authenticatedUser.id);
  };

  const logout = () => {
    localStorage.removeItem('todo_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}