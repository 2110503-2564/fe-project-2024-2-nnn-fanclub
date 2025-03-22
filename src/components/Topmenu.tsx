import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { HomeIcon, Building, CircleUser, UserCog } from "lucide-react";
import Link from "next/link";

export default function Topmenu() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-[#fcfbf7] shadow-md border-b" color="fcfbf7">
      {/* Left Section */}
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <div className="avatar">
            <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
              <span>NNN</span>
            </div>
          </div>
          <span className="text-xl font-bold text-[#8a7e66]">JobFair</span>
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li>
              <Link href="/" className="flex items-center">
                {/* Use Link to navigate to the homepage */}
                <HomeIcon size={24} />
                Home
              </Link>
            </li>
            <li>
            <Link href="/" className="flex items-center">
                <Building size={24} />
                Companies
              </Link>
            </li>
            <li>
            <Link href="/" className="flex items-center">
                <CircleUser size={24} />
                My Profile
              </Link>
            </li>
            {/* Show Manage Company if user is admin */}
            {session?.user?.role === "admin" && (
              <li>
                <a className="flex items-center">
                  <UserCog size={24} />
                  Manage Company
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-none">
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <span className="font-medium text-[#8a7e66]">
                {session.user?.name || "User"}
              </span>
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => signOut()}
              >
                <span className="material-icons">logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-ghost text-[#8a7e66] text-l font-bold"
                onClick={() => signIn()}
              >
                Login
              </button>
              <button className="btn text-[#ffffff] bg-[#8a7e66]">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
