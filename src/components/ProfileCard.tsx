import React from "react";
import { CircleUserRound } from "lucide-react";

// Define the props for the ProfileCard component
interface ProfileCardProps {
  user: UserModel;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="w-full flex flex-col rounded-xl border border-storke bg-c2 shadow-lg p-4 hover:shadow-xl hover:-translate-1 transition duration-300 ease-in-out">
      <div className="text-xl md:text-2xl font-bold mb-5 text-center">
        User Information
      </div>
      <div className="avatar mb-5 flex items-center justify-center">
        <CircleUserRound size={50} />
      </div>
      <div>
        <p className="text-sm md:text-base font-semibold">Name</p>
        <p className="mb-2 text-sm">{user.name}</p>
        <p className="text-sm md:text-base font-semibold">Email</p>
        <p className="mb-2 text-sm">{user.email}</p>
        <p className="text-sm md:text-base font-semibold">Phone</p>
        <p className="text-sm">{user.telephone}</p>
      </div>
    </div>
  );
}
