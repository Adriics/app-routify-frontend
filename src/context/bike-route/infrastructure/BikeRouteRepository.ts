import { User } from "@/context/user/domain/User";
import { BikeRoute } from "../domain/BikeRoute";
import { BikeRouteDataSource } from "./sources/BikeRouteDataSource.";

export class BikeRouteRepository {
  constructor(private readonly bikeRouteDataSource: BikeRouteDataSource) {}

  public static live(
    networkDatasource: () => BikeRouteDataSource = () =>
      new BikeRouteDataSource()
  ): BikeRouteRepository {
    return new BikeRouteRepository(networkDatasource());
  }

  async create(
    name: string,
    distance: number,
    creator: User,
    image?: File
  ): Promise<BikeRoute> {
    return await this.bikeRouteDataSource.create(
      name,
      distance,
      creator,
      image
    );
  }

  async getUserRoutes(userId: string): Promise<BikeRoute[] | null> {
    return await this.bikeRouteDataSource.getUserRoutes(userId);
  }

  async getAllRoutes(): Promise<BikeRoute[]> {
    return await this.bikeRouteDataSource.getAllRoutes();
  }

  async getById(routeId: string): Promise<BikeRoute | null> {
    return await this.bikeRouteDataSource.getById(routeId);
  }
}
