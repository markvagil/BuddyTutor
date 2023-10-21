"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook from Next.js
import { Button } from "../../components/ui/button";
import Link from "next/link";

export const SignInPage = () => {
  const router = useRouter(); // Initialize useRouter hook

  const redirectToAuth0Login = () => {
    router.push("https://buddy-tutor.onrender.com/login"); // Redirect to /login route
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center">Sign In</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your password"
          />
        </div>
        <Button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
          asChild
        >
          <Link href="/dashboard">Sign In</Link>
        </Button>
        {/* Auth0 Sign In Button */}
        <Button
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 mt-4"
          onClick={redirectToAuth0Login}
        >
          Sign In with Auth0
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
