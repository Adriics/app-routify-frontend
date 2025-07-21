import { User } from "@/context/user/domain/User";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5004/routify";

export class UserDataSource {
  // Método para login

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Login failed with status: ${response.status}`
        );
      }

      const data = await response.json();
      const { token, user } = data;
      localStorage.setItem("jwt_token", token);

      return { token, user: User.fromPrimitives(user) };
    } catch (error) {
      console.error("Login failed in UserDataSource:", error);
      throw error;
    }
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Register failed with status: ${response.status}`
        );
      }

      const data = await response.json();

      const { token, user } = data;

      localStorage.setItem("jwt_token", token);

      return { token, user: User.fromPrimitives(user) };
    } catch (error) {
      console.error("Register failed in UserDataSource: ", error);
      throw error;
    }
  }

  async getProfile(token: string): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to fetch profile with status: ${response.status}`
        );
      }

      const data = await response.json();

      return User.fromPrimitives(data);
    } catch (error) {
      console.error("Failed to get user profile:", error);
      throw error;
    }
  }
}
