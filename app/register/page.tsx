"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/app/components/LoginForm";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password != confirmPassword) {
      return;
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        return;
      }
      console.log(data);
      router.push("/video");
    } catch (err) {
      console.error(err);
    }
  };
  // react-ruery
  // debounce, error, loading
  return (
    <div>
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={handelSubmit}
      />
      <h1>Register</h1>
      <form onSubmit={handelSubmit}>
        <input
          required
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          required
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          value={confirmPassword}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
