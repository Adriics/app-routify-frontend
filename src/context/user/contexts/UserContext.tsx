"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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

  // Función para cargar el usuario autenticado al inicio de la aplicación
  const loadAuthenticatedUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const authenticatedUser = await userRepository.getAuthenticatedUser();

      if (authenticatedUser) {
        setUser(authenticatedUser);
        setIsAuthenticated(true);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err); // CAMBIO AQUÍ: Manejo seguro del error
      console.error("Error loading authenticated user:", errorMessage);
      setError(errorMessage || "Failed to load user session.");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [userRepository]);

  useEffect(() => {
    loadAuthenticatedUser();
  }, [loadAuthenticatedUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const loggedInUser = await userRepository.login(email, password);

        setUser(loggedInUser.user);
        setIsAuthenticated(true);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error("Login failed: ", errorMessage);
        setError(errorMessage);
        setUser(null);
        setIsAuthenticated(false);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [userRepository]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const registeredUser = await userRepository.register(
          name,
          email,
          password
        );

        setUser(registeredUser.user);
        setIsAuthenticated(true);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error("Register failed: ", errorMessage);
        setError(errorMessage);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    },
    [userRepository]
  );

  const logout = useCallback(() => {
    userRepository.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, [userRepository]);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
