import { HomeIcon, Building, CircleUser, UserCog } from "lucide-react";
import Link from "next/link";

export default function LeftTopMenu(session: any) {
  return (
    <div className="flex items-center space-x-4">
      {/* icon */}
      <div className="flex items-center justify-center rounded-full bg-c1 md:w-12 md:h-12 w-9 h-9">
        <span className="text-center font-semibold text-white md:text-lg text-sm">
          NNN
        </span>
      </div>

      {/* in small size(default) */}
      <div className="block md:hidden">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {/* Home */}
              <li>
                <Link href="/" className="flex items-center">
                  <HomeIcon size={24} />
                  Home
                </Link>
              </li>
              {/* Companies */}
              <li>
                <Link
                  href="/booking"
                  className="flex items-center"
                >
                  <Building size={24} />
                  Companies
                </Link>
              </li>
              {/* Show My Profile if user is logged in */}
              {session?.session?.user && (
                <li>
                  <Link
                    href={
                      session?.session?.user?.role === "admin"
                        ? "/admin/booking"
                        : "/user"
                    }
                    className="flex items-center"
                  >
                    <CircleUser size={24} />
                    {session?.session?.user?.role === "admin"
                      ? "Manage Booking"
                      : "My Profile"}
                  </Link>
                </li>
              )}
              {/* Show Manage Company if user is admin */}
              {session?.session?.user?.role === "admin" && (
                <li>
                  <Link href="/admin/company" className="flex items-center">
                    <UserCog size={24} />
                    Manage Company
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* in medium and large size */}
      <div className="hidden md:flex items-center space-x-4">
        <span className="text-xl font-bold text-c1">JobFair</span>
        <ul className="menu menu-horizontal px-1 space-x-4">
          {/* Home */}
          <li>
            <Link href="/" className="flex items-center">
              <HomeIcon size={24} />
              Home
            </Link>
          </li>
          {/* Companies */}
          <li>
            <Link
              href="/booking"
              className="flex items-center"
            >
              <Building size={24} />
              Companies
            </Link>
          </li>
          {/* Show My Profile if user is logged in */}
          {session?.session?.user && (
            <li>
              <Link
                href={
                  session?.session?.user?.role === "admin"
                    ? "/admin/booking"
                    : "/user"
                }
                className="flex items-center"
              >
                <CircleUser size={24} />
                {session?.session?.user?.role === "admin"
                  ? "Manage Booking"
                  : "My Profile"}
              </Link>
            </li>
          )}
          {/* Show Manage Company if user is admin */}
          {session?.session?.user?.role === "admin" && (
            <li>
              <Link href="/admin/company" className="flex items-center">
                <UserCog size={24} />
                Manage Company
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
