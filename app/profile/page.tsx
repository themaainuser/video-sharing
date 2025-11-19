"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Container } from "../components/container";
import { Button } from "../components/ui/button";
import User from "@/models/User";

const Profile = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const res = await fetch("/api/auth/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: session.user.email }),
          });

          const { user } = await res.json();
          setUserData(user);
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }
      }
    };

    fetchUserData();
  }, [status, session]);

  const updateEmail = async (updatedEmail: string) => {
    const user = await User.findOneAndUpdate(
      { email: userData.email },
      { email: updatedEmail },
    );
  };

  return (
    <div className="item-start flex min-h-screen justify-start gap-10">
      <Container className="flex h-screen flex-col items-center justify-center">
        <p>this is profile</p>
        <div>
          {status === "loading" && <p>Loading session...</p>}
          {status === "unauthenticated" && <p>You are not logged in.</p>}
          {status === "authenticated" && (
            <div>{userData ? userData.email : null}</div>
          )}
        </div>
      </Container>
      <Container>
        <form className="flex h-screen flex-col items-center justify-center bg-red-400">
          <input type="text" placeholder="Enter your name" />
          <Button onClick={() => updateEmail("newemail@example.com")}>
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Profile;
