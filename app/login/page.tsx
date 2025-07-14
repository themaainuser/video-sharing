"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { LoginForm } from "@/components/LoginForm";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/"); // Redirect if session exists
    }
  }, [session, router]);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        return console.log(result.error);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    // <div className="card justify-center items-center w-96 h-96 ">
    <div className="card justify-center items-center h-screen bg-base-100 shadow-xl">
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <h1 className="flex items-center gap-2 self-center font-medium">
            Login
          </h1>
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmit={handelSubmit}
          />
        </div>
        <button
          className="btn btn-link"
          onClick={() => router.push("/register")}
        >
          Register
        </button>
        <button onClick={() => router.push("/forgot-password")}>
          Forgot Password
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
