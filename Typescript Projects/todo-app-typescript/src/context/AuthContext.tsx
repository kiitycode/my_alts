import { createContext, useContext, useState, useEffect, PropsWithChildren } from "react";
import type { ID } from "../types/tasks";

type User = { id: ID; username?: string; token?: string } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  login: (userData: Partial<User> & { username?: string; token?: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("todo_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login: AuthContextValue["login"] = (userData) => {
    const authenticated = {
      id: (userData?.id as ID) ?? crypto.randomUUID(),
      username: userData.username,
      token: userData.token,
    };
    localStorage.setItem("todo_user", JSON.stringify(authenticated));
    setUser(authenticated);
  };

  const logout = () => {
    localStorage.removeItem("todo_user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
