import React, { useEffect } from "react";
import { useState } from "react";
import Image from 'next/image';
import gravatarProfile from "@/libs/gravatarProfile";

interface ProfileCardProps {
  user: UserModel;
}

export default function ProfileCard({ user }: ProfileCardProps) {

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState< 'load' | 'err' | 'ok' >('load');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await gravatarProfile(user.email);
        if (profile) {
          setProfileImage("https://gravatar.com/avatar/" + profile + "?s=256&d=retro");
          setLoading('ok');
        } else {
          setProfileImage(null);
          setLoading('err');
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
        setProfileImage(null);
        setLoading('err');
      }
    };
  
    fetchProfile();
  }, []);
  

  return (
    <div className="w-full flex flex-col rounded-xl border border-storke bg-c2 shadow-lg p-4 hover:shadow-xl hover:-translate-1 transition duration-300 ease-in-out">
      <div className="text-xl md:text-2xl font-bold mb-5 text-center">
        User Information
      </div>
      <div className="avatar mb-5 flex items-center justify-center">
        {
          loading === 'load' ? (
            <p>Loading...</p>
          ) : loading === 'err' || profileImage === null ? (
            <p>Error loading profile image</p>
          ) : (
            <div className="w-1/2">
              <Image 
                src={profileImage || ''}
                alt="Profile Image"
                width={256}
                height={256}
                className="rounded-full" 
              />
            </div>
          )
        }
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
