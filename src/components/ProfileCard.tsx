import React from "react";
import { UserModel } from "../../interface";
import { CircleUserRound } from "lucide-react";

interface ProfileCardProps {
  user: UserModel;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="card w-64 bg-[#fbfbf5] shadow-lg p-4">
      <div className="card-body text-left">
        <h2 className="card-title text-xl font-bold mb-4 items-center justify-center">User Information</h2>
        <div className="avatar mb-4 flex items-center justify-center">
          <CircleUserRound size={50} />
        </div>
        <div>
          <p className="text-sm font-semibold">Name</p>
          <p className="mb-2">{user.name}</p>
          <p className="text-sm font-semibold">Email</p>
          <p className="mb-2">{user.email}</p>
          <p className="text-sm font-semibold">Phone</p>
          <p>{user.telephone}</p>
        </div>
      </div>
    </div>
  );
}