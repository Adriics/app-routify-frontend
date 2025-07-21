"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <div>
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

      <Button onClick={handleSubmit}>Log In</Button>
    </div>
  );
}
