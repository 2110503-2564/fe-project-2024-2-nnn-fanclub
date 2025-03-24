"use client";
import Header from "@/components/Header";
import TopMenu from "@/components/TopMenu";
import ProfileCard from "@/components/ProfileCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getMe from "@/libs/getMe";
import InterviewCard from "@/components/InterviewCard";
import getUserBooking from "@/libs/getUserBooking";

interface ProfileCardProps {
  user: UserModel;
}

export default function booking() {
  const { data: session } = useSession();

  const [userData, setUserData] = useState<UserModel | null>(null); // Store User data
  const [booking, setBooking] = useState<BookingApi | null>(null); // Store all user booking
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetch User
    const fetchUser = async () => {
      try {
        const res = await getMe(session?.verifiedToken as string);
        if (!res.success) {
          throw new Error(`error : ${res.message}`);
        }
        setUserData(res.data as UserModel);
        console.log("userData: ", userData);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchUser();

    //fetch Booking
    const fetchBooking = async () => {
      try {
        const res = await getUserBooking(session?.verifiedToken as string);
        if (!res.success) {
          throw new Error(`error : ${res.message}`);
        }
        setBooking(res);
        console.log("booking User: ", booking);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [session]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <TopMenu />
      <Header
        header="My Profile"
        description="Manage your account and interview bookings"
        buttonType="Book an Interview"
      />
      {/* Content */}
      <div className="flex flex-col md:flex-row align-start justify-center py-10 px-2 bg-white gap-6">
        {/* Profile Card */}
        <div className="w-full md:w-[20%]">
          <ProfileCard user={userData as UserModel} />
        </div>
        {/* My Interviews */}
        <div className="w-full md:w-[75%] bg-c2 p-2 md:p-6 space-y-4 md:space-y-6 border-2 border-storke rounded-xl">
          <div className="font-bold text-center text-2xl md:text-3xl">
            My Interviews
          </div>
          {(() => {
            const interviewCards = [];
            for (let i = 0; i < 3; i++) {
              interviewCards.push(
                <InterviewCard
                  key={i}
                  companyName="Google"
                  bookingDate="2021-10-12"
                  onEdit={() => console.log("Edit")}
                  onRemove={() => console.log("Remove")}
                />
              );
            }
            return interviewCards;
          })()}
        </div>
      </div>
    </div>
  );
}
