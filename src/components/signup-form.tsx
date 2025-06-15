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
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      return;
    }

    try {
      setIsSigningUp(true);
      await signUpWithEmail(formData.name, formData.email, formData.password);
      router.replace("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
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
        <button
          onClick={handleSubmit}
          disabled={isSigningUp}
          className="mt-4 flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSigningUp ? (
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
              Creating account...
            </>
          ) : (
            "Create account"
          )}
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
