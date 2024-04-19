import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import React from "react";

export default async function Home() {
  const session = await auth();
  return (
      <section className="home">
        <div className="avatar">
          <div className="profile">
              <img src="man.png" alt="profile" />
          </div>
        </div>
        <div className="email">
          <p>{session?.user?.email}</p>
        </div>
        <div className="button">
          <SignOutButton />
        </div>
      </section>
  );
}
