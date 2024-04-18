import SignOutButton from "@/components/SignOutButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="content">
      <section className="home">
        <div className="avatar">
          <div className="profile">
            {session?.user?.image ? (
              <img src={session?.user?.image } alt="profile" />
            ):(
              <img src="man.png" alt="profile" />
            )}
          </div>
        </div>
        <div className="email">
          <p>{session?.user?.email}</p>
        </div>
        <div className="button">
          <SignOutButton />
        </div>
      </section>
    </div>
  );
}
