"use client"
import { handleMessage } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function Login() {
  const router = useRouter();

  const Login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    
    const loginData = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false
    }) ;

    if (loginData?.error) {
      handleMessage("Error", "Ooops!Something went wrong.", "destructive");
    } else {
      router.push('/home');
    }
    
  }


  return (
    <div className="content">
      <div className="title">
        <h2>Login Form</h2>
      </div>

      <form onSubmit={e => {
        Login(e)
      }
      }>
        <div className="input">
          <input type="email" name="email" className="email" placeholder="Email" />
          <input type="password" name="password" className="password" placeholder="Password" />
        </div>
        <div className="button">
          <button>Login</button>
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
            Don't have an account? <Link href="/signin">Sign up</Link>
          </p>
        </div>
      </div>
      <p className="or">Or</p>
      <div className="google-sign">
        <button onClick={() => {
          signIn('google', {callbackUrl: "/home", redirect: true});
        }}>
          <Image width={20} height={20} src="/google.png" alt="google icon" />
          Sign with Google
          </button>
      </div>
    </div>
  );
}
