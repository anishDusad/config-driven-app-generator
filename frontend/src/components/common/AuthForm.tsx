"use client";

import { useState } from "react";

import {
  login,
  signup,
} from "@/lib/api/auth";

interface Props {
  onAuthenticated: () => void;
}

export default function AuthForm({
  onAuthenticated,
}: Props) {
  const [mode, setMode] = useState<
    "login" | "signup"
  >("login");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setLoading(true);

    setError("");

    try {
      let result;

      if (mode === "signup") {
        result = await signup(
          email,
          password
        );

        setMode("login");

        alert(
          "Signup successful. Please login."
        );

        return;
      }

      result = await login(
        email,
        password
      );

      if (result.error) {
        throw new Error(result.error);
      }

      localStorage.setItem(
        "token",
        result.token
      );

      onAuthenticated();
    } catch (error: any) {
      setError(
        error.message ||
          "Authentication failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          AI App Generator
        </h1>

        <p className="text-gray-500">
          Config-driven application platform
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">
        {mode === "login"
          ? "Welcome Back"
          : "Create Account"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <div>
          <label className="block text-sm font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:border-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:border-black"
          />
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white rounded-xl py-3 font-medium text-lg"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Create Account"}
        </button>
      </form>

      <button
        onClick={() =>
          setMode(
            mode === "login"
              ? "signup"
              : "login"
          )
        }
        className="mt-6 text-blue-600 text-sm"
      >
        {mode === "login"
          ? "Don't have an account? Signup"
          : "Already have an account?"}
      </button>
    </div>
  );
}