"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "@/lib/auth";

export function SignUpForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    try {
      await signUpWithEmail(formData.name, formData.email, formData.password);
      // localStorage.setItem("signup_email", formData.email);
      router.replace("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <form className="mx-10 flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
        <p className="text-sm text-muted-foreground">
          Fill in your details to get started
        </p>
      </div>
      <div className="grid gap-8">
        <div className="grid gap-1">
          <h1 className="text-sm font-bold">Full Name</h1>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            className="h-9 rounded-md border border-input px-3 py-1 text-base shadow-xs focus:border-primary focus:ring-primary focus:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-1">
          <h1 className="text-sm font-bold">Email</h1>
          <input
            id="email"
            type="email"
            placeholder="email@example.com"
            required
            className="h-9 rounded-md border border-input px-3 py-1 text-base shadow-xs focus:border-primary focus:ring-primary focus:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-1">
          <h1 className="text-sm font-bold">Password</h1>
          <input
            id="password"
            type="password"
            required
            className="h-9 rounded-md border border-input px-3 py-1 text-base shadow-xs focus:border-primary focus:ring-primary focus:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-1">
          <h1 className="text-sm font-bold">Confirm Password</h1>
          <input
            id="confirmPassword"
            type="password"
            required
            className="h-9 rounded-md border border-input px-3 py-1 text-base shadow-xs focus:border-primary focus:ring-primary focus:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button className="text-md text-md transiton-colors duraton-2000 rounded-md bg-primary py-1 font-semibold text-primary-foreground ease-in-out hover:bg-primary/80">
          Create Account
        </button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href={"/login"} className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}
