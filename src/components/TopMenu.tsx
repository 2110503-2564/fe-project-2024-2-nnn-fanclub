import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut } from "lucide-react";
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
          <ul className="flex flex-row items-center space-x-1 md:space-x-5">
            <li className="w-[100px] md:w-full font-medium text-c1 text-sm truncate md:text-base">
              {session.user?.name || "User"}
            </li>
            <li>
              <button
                className="w-full btn btn-ghost rounded-lg flex items-center space-x-2"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut className="text-sm md:text-base" />
                <span className="hidden md:inline text-sm md:text-base">Logout</span>
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
