import { createContext, useContext, useState } from "react";
import { User } from "../domain/User";
import { UserRepository } from "./infrastructure/UserRepository";

type UserContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Crea el contexto de React
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook personalizado para usar el contexto de usuario
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Componente proveedor del contexto de usuario
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Inicia en true para cargar el usuario al inicio
  const [error, setError] = useState<string | null>(null);

  //Instancia del repositorio (solo una vez)
  const userRepository = UserRepository.live();
};
