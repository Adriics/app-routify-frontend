import { User } from "../../domain/User";
import { UserDataSource } from "./sources/UserDataSource";

export class UserRepository {
  constructor(private readonly userDatasource: UserDataSource) {}

  public static live(
    networkDatasource: () => UserDataSource = () => new UserDataSource()
  ): UserRepository {
    return new UserRepository(networkDatasource());
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    return await this.userDatasource.register(name, email, password);
  }

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    return await this.userDatasource.login(email, password);
  }

  async getAuthenticatedUser(): Promise<User | null> {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      return null;
    }

    try {
      const user = await this.userDatasource.getProfile(token);
      return user;
    } catch (error) {
      console.error("Error getting authenticated user: ", error);
      localStorage.removeItem("jwt_token");
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem("jwt_token");
  }
}
