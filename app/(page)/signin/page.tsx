"use client";
import { cn, handleMessage } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import * as z from "zod";

const userSchema = z.object({
  username: z.string().min(1, { message: "First Name is required" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password have to contain at least 8 characters" }),
  passwordConfirmation: z
    .string()
    .min(8, { message: "Password Confirmation and password not match" }),
});

export default function Signin() {
  const router = useRouter();
  const [signInLoadingButton, setSignInLoadingButton] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignInLoadingButton(true);

    const input = event.currentTarget;

    const data = {
      username: input.username.value,
      email: input.email.value,
      password: input.password.value,
      passwordConfirmation: input.passwordConfirmation.value,
    };

    const result = userSchema.safeParse(data);

    if (!result.success) {
      let errorMessage = "";

      result.error.issues.forEach((issue) => {
        errorMessage += issue.path[0] + "=> " + issue.message + ". ";
      });

      handleMessage("Something went wrong", errorMessage, "destructive");
      setSignInLoadingButton(false);
      return;
    }

    const resp = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await resp.json();

    if (!response.success) {
      handleMessage("Something went wrong", response.message, "destructive");
      setSignInLoadingButton(false);
    } else {
      handleMessage("Success", response.message, "default");
      setSignInLoadingButton(false);
      router.push("/login");
    }
  };

  return (
    <section className="signin">
      <div className="title">
        <h2>Sign in Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="text"
            name="username"
            className="username"
            placeholder="Username"
          />
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
          <input
            type="password"
            name="passwordConfirmation"
            className="password-confirmation"
            placeholder="Password confirmation"
          />
        </div>
        <div className="button">
          <button>
            <span className={cn({"disappear":!signInLoadingButton})}>
              <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <circle className="spin2" cx="400" cy="400" fill="none"
                r="200" stroke-width="50" stroke="#000"
                stroke-dasharray="700 1400"
                stroke-linecap="round" />
              </svg>
            </span>
            <span className={cn({"disappear":signInLoadingButton})}>Sign In</span> </button>
        </div>
        <div className="back-login">
          <Link href="/login">Back to login page</Link>
        </div>
      </form>
    </section>
  );
}
