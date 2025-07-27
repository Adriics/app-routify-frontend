"use client";

import { User } from "@/context/user/domain/User";
import { BikeRoute } from "../domain/BikeRoute";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BikeRouteRepository } from "../infrastructure/BikeRouteRepository";

type BikeRouteContextType = {
  bikeRoute: BikeRoute[] | null;
  isLoading: boolean;
  error: string | null;
  create: (
    name: string,
    distance: number,
    creator: User,
    image?: File
  ) => Promise<void>;
};

const BikeRouteContext = createContext<BikeRouteContextType | undefined>(
  undefined
);

export const useBikeRoute = () => {
  const context = useContext(BikeRouteContext);
  if (context === undefined) {
    throw new Error("useBikeRoute must be used within a BikeRouteProvider");
  }
  return context;
};

export const BikeRouteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bikeRoute, setBikeRoute] = useState<BikeRoute[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const bikeRouteRepository = BikeRouteRepository.live();

  const loadUserRoutes = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const routes = await bikeRouteRepository.getAllRoutes();

      if (routes) {
        setBikeRoute(routes);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Error loading user routes:", errorMessage);
      setError(errorMessage || "Failed to load user routes.");
      setBikeRoute(null);
    } finally {
      setIsLoading(false);
    }
  }, [bikeRouteRepository]);

  useEffect(() => {
    loadUserRoutes();
  }, [loadUserRoutes]);

  const create = useCallback(
    async (name: string, distance: number, creator: User, image?: File) => {
      setIsLoading(true);
      setError(null);

      try {
        const createdRoute = await bikeRouteRepository.create(
          name,
          distance,
          creator,
          image
        );

        setBikeRoute((prev) =>
          prev ? [...prev, createdRoute] : [createdRoute]
        );
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error("Error creating route: ", errorMessage);
        setError(errorMessage || "Failed to create bike route.");
      } finally {
        setIsLoading(false);
      }
    },
    [bikeRouteRepository]
  );

  return (
    <BikeRouteContext.Provider
      value={{
        bikeRoute,
        isLoading,
        error,
        create,
      }}
    >
      {children}
    </BikeRouteContext.Provider>
  );
};
