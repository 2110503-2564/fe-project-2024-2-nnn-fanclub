import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { HomeIcon, Building, CircleUser, UserCog } from "lucide-react";
import { register } from "module";
import LeftTopMenu from "@/components/LeftTopMenu";

export default function TopMenu() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-c2 shadow-md border-b" color="c2">
      {/* Left Section */}
      <div className="flex-1">
        <LeftTopMenu sessoion={session} />
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
                <span className="material-icons">logout</span>
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
                <div className="text-sm md:text-l text-white hover:text-c1">
                  Register
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
