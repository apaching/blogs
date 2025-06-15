"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "@/lib/auth";

export function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoggingIn(true);
      await signInWithEmail(formData.email, formData.password);
      router.push("/blog");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <form className="mx-10 flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Please enter your details
        </p>
      </div>
      <div className="grid gap-10">
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
        <button
          onClick={handleSubmit}
          disabled={isLoggingIn}
          className="mt-4 flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoggingIn ? (
            <>
              <svg
                className="h-4 w-4 animate-spin text-card-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Logging In...
            </>
          ) : (
            "Log In"
          )}
        </button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href={"/signup"} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
