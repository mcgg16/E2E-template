import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./authContext";
import type { User } from "./types";

export type { User };

const initialUsers: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
    active: true,
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@test.com",
    password: "pass123",
    role: "user",
    active: true,
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@test.com",
    password: "pass123",
    role: "user",
    active: false,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  function login(email: string, password: string): boolean {
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  }

  function logout() {
    setCurrentUser(null);
  }

  function signup(name: string, email: string, password: string): boolean {
    if (users.find((u) => u.email === email)) return false;
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password,
      role: "user",
      active: true,
    };
    setUsers((prev) => [...prev, newUser]);
    return true;
  }

  function deleteUser(id: number) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  function toggleActive(id: number) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u)),
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        logout,
        signup,
        deleteUser,
        toggleActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}