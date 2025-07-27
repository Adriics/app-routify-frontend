"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useUser();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("Login exitoso!", email, password);
      router.push("/create-bike-route");
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          value={password}
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </form>
    </div>
  );
}
