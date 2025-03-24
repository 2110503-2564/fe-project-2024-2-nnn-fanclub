import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import LeftTopMenu from "@/components/LeftTopMenu";

export default function TopMenu() {
  const { data: session } = useSession();

  return (
    <div
      className="navbar bg-c2 shadow-md border-b flex justify-between"
      color="c2"
    >
      {/* Left Section */}
      <div className="flex">
        <LeftTopMenu session={session} />
      </div>

      {/* Right Section */}
      <div className="RightSection">
        {session ? (
          <ul className="flex flex-row items-center space-x-2 md:space-x-10">
            <li className="w-full font-medium text-c1 text-sm md:text-lg">
              {session.user?.name || "User"}
            </li>
            <li>
              <button
                className="w-full btn btn-ghost rounded-lg"
                onClick={() => signOut()}
              >
                <span className="material-icons text-base md:text-xl">Logout</span>
              </button>
            </li>
          </ul>
        ) : (
          <>
            <button
              className="btn btn-ghost text-c1 text-sm md:text-l font-bold "
              onClick={() => signIn()}
            >
              Login
            </button>
            <button className="rounded-xl btn p-2 md:p-4 bg-c1 hover:bg-white hover:border-c1 hover:border-2 transition duration-500 ease-in-out">
              <Link
                className="text-sm md:text-l text-white hover:text-c1"
                href="/auth/register"
              >
                Register
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
