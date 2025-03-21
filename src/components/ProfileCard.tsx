import React from "react";
import { UserModel } from "../../interface";

interface ProfileCardProps {
  user: UserModel;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="card w-80 bg-base-100 shadow-xl p-6">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg font-bold">User Information</h2>
        <div className="avatar my-4">
          <div className="w-24 rounded-full bg-neutral-focus text-neutral-content">
            <span className="text-4xl">👤</span>
          </div>
        </div>
        <div className="text-left">
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

