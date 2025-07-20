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
}
