"use client";
import { cn, handleMessage } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import google from "@/public/google-icon.png";


export default function Login() {
  const router = useRouter();
  const [loginButtonLoading, setLoginButtonLoading] = useState(false);
  const [googleLoginButtonLoading, setGoogleLoginButtonLoading] = useState(false);

  const Login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginButtonLoading(true);

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    const loginData = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (loginData?.error) {
      handleMessage("Error", "Ooops!Credentials invalid!", "destructive");
      setLoginButtonLoading(false);
    } else {
      router.push("/home");
      setLoginButtonLoading(false);
    }
  };

  return (
    <section className="login">
      <div className="title">
        <h2>Login Form</h2>
      </div>

      <form
        onSubmit={(e) => {
          Login(e);
        }}
      >
        <div className="input">
          <input
            type="email"
            name="email"
            className="email"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            className="password"
            placeholder="Password"
          />
        </div>
        <div className="button">
          <button>
            <span className={cn({"disappear":!loginButtonLoading})}>
              <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <circle className="spin2" cx="400" cy="400" fill="none"
                r="200" stroke-width="50" stroke="#000"
                stroke-dasharray="700 1400"
                stroke-linecap="round" />
              </svg>
            </span>
            <span className={cn({"disappear":loginButtonLoading})}>Login</span>  
        </button>
        </div>
      </form>

      <div className="text">
        <div className="forgot-password">
          <p>
            Forgot password? <Link href="/forgotPassword">Click Here</Link>
          </p>
        </div>
        <div className="not-account">
          <p>
            Don&rsquo;t have an account? <Link href="/signin">Sign up</Link>
          </p>
        </div>
      </div>
      <p className="or">Or</p>
      <div className="google-sign">
        <button
          onClick={() => {
            setGoogleLoginButtonLoading(true);
            signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT, redirect: true });
          }}
        >
          
          <span className={cn({"disappear":!googleLoginButtonLoading})}>
            <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
              <circle className="spin2" cx="400" cy="400" fill="none"
              r="200" stroke-width="50" stroke="#000"
              stroke-dasharray="700 1400"
              stroke-linecap="round" />
            </svg>
          </span>
          <span className={cn({"disappear":googleLoginButtonLoading})}>
            <Image width={20} height={20}  src={`/images/google.png`} alt="google icon" />
            Sign with Google
          </span>
        </button>
      </div>
    </section>
  );
}
