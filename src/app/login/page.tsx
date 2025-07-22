// Este archivo define la página de login de tu aplicación.
// Es un Client Component porque LoginForm probablemente usará hooks de React como useState, useEffect, etc.
// Si LoginForm ya tiene "use client", no es estrictamente necesario aquí, pero es una buena práctica
// si la página en sí necesita interactividad o si el LoginForm no lo tiene.
"use client";

import LoginForm from "@/context/user/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <LoginForm />
    </div>
  );
}
