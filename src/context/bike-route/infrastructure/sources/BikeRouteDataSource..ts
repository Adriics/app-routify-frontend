import { User } from "@/context/user/domain/User";
import { BikeRoute } from "../../domain/BikeRoute";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5004/routify";

export class BikeRouteDataSource {
  async create(
    name: string,
    distance: number,
    creator: User,
    image?: File
  ): Promise<BikeRoute> {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("distance", distance.toString());
      formData.append("creatorId", creator.id.id);
      if (image) formData.append("image", image);

      const response = await fetch(`${API_BASE_URL}/routes/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Route create failed with status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Route create failed in BikeRouteDataSource: ", error);
      throw error;
    }
  }

  async getUserRoutes(userId: string): Promise<BikeRoute[] | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/routes/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Get user routes failed with status: ${response.status}`
        );
      }

      const data = await response.json();
      const userRoutes: BikeRoute[] = data;

      return userRoutes;
    } catch (error) {
      console.error("Get user routes failed in BikeRouteDataSource:", error);
      throw error;
    }
  }

  async getAllRoutes(): Promise<BikeRoute[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/routes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.message ||
            `Get all routes failed with status: ${response.status}`
        );
      }

      const data = await response.json();

      const allRoutes: BikeRoute[] = data;

      return allRoutes;
    } catch (error) {
      console.error("Get all routes failed in BikeRouteDataSource:", error);
      throw error;
    }
  }

  async getById(routeId: string): Promise<BikeRoute | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/routes/${routeId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Get By id failed with status: ${response.status}`
        );
      }

      const data = await response.json();

      const route = data;

      return route;
    } catch (error) {
      console.error("Get route by id failed in BikeRouteDataSource:", error);
      throw error;
    }
  }
}
