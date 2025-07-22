// Este archivo define la página de registro de tu aplicación.
"use client";

import RegisterForm from "@/context/user/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <RegisterForm />
    </div>
  );
}
