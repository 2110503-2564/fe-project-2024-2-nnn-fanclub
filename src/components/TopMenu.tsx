import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import LeftTopMenu from "@/components/LeftTopMenu";

export default function TopMenu() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-c2 shadow-md border-b" color="c2">
      {/* Left Section */}
      <div className="flex-1">
        <LeftTopMenu session={session} />
      </div>

      {/* Right Section */}
      <div className="flex-none">
        <div className="flex items-center space-x-4">
          {session ? (
            <div>
              <span className="font-medium text-c1">
                {session.user?.name || "User"}
              </span>
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => signOut()}
              >
                <span className="material-icons">Logout</span>
              </button>
            </div>
          ) : (
            <>
              <button
                className="btn btn-ghost text-c1 text-sm md:text-l font-bold "
                onClick={() => signIn()}
              >
                Login
              </button>
              <button className="rounded-xl btn p-2 md:p-4 bg-c1 hover:bg-white hover:border-c1 hover:border-2 transition duration-500 ease-in-out">
                <Link className="text-sm md:text-l text-white hover:text-c1" href="/auth/register">
                  Register
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
