export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  active: boolean;
};

export type AuthContextType = {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string) => boolean;
  deleteUser: (id: number) => void;
  toggleActive: (id: number) => void;
};