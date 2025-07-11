"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SVGIcon from "@/components/Buttons";
// import SvgIcon, { IconName } from "@/components/SvgIcon";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
    <div className="card justify-center items-center w-96 h-96 ">
      <div className=" card justify-center items-center h-screen bg-base-100 shadow-xl "> 
      <h1>Login</h1>
      <form onSubmit={handelSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <div>
        <button className="btn bg-white text-black border-[#e5e5e5]" onClick={() => signIn("google")}>
          {/* <SVGIcon ariaLabel="Google logo" width={16} height={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" /> */}
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
          Login with Google
        </button>
        <br />
        <button onClick={() => signIn("github")}>Login with Github</button>
          {/* <SVGIcon ariaLabel="GitHub logo" width={16} height={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" /> */}
          
          Login with Email
      </div>
      <div>
        <p>
          donst have an account?{" "}
          <button
            className="btn btn-link"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
          <button onClick={() => router.push("/forgot-password")}>
            Forgot Password
          </button>
        </p>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
