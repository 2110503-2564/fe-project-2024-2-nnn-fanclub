"use client";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getMe from "@/libs/getMe";
import InterviewCard from "@/components/InterviewCard";
import getUserBooking from "@/libs/getUserBooking";
import dayjs from "dayjs";
import { deleteBooking } from "@/libs/deleteBooking";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ProfileCardProps {
  user: UserModel;
}

export default function AdminManageBooking() {
  const { data: session } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState<UserModel | null>(null); // Store User data
  const [booking, setBooking] = useState<BookingApi | null>(null); // Store all user booking
  const [loading, setLoading] = useState(true);
  const [removeRef, setRemoveRef] = useState<string>("");

  //fetch Data
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

  //for remove button
  const removeDialog = async (bookingId: string) => {
    setRemoveRef(bookingId);
    const modal = document.getElementById(
      "modal-remove"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  const removeAction = async () => {
    if (removeRef && session) {
      toast
        .promise(deleteBooking(session.verifiedToken, removeRef), {
          loading: "Loading...",
          success: "Remove successfully!",
          error: "Error can't remove booking",
        })
        .then(() => {
          window.location.reload();
        });
    } else {
      toast.error("Error can't remove booking");
    }
  };

  return (
    <div>
      {/* dialog remove */}
      <dialog id="modal-remove" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Comfirm Delete ?</h3>
          <p className="py-4">Are you confirm to delete this booking</p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-x-2">
                <button
                  className="btn btn-error text-white"
                  onClick={removeAction}
                >
                  Delete
                </button>
                <button className="btn">Keep</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      {/* Header */}
      <Header
        header="Profile Admin"
        description="Manage all interview bookings"
        buttonType="Book an Interview"
        role="admin"
      />
      {/* Content */}
      <div className="flex flex-col md:flex-row align-start justify-center py-10 px-2 bg-white gap-6">
        {/* Profile Card */}
        {userData && (
          <div className="w-full md:w-[20%]">
            <ProfileCard user={userData as UserModel} />
          </div>
        )}
        {/* My Interviews */}
        <div className="w-full md:w-[75%] bg-c2 p-2 md:p-6 space-y-4 md:space-y-6 border-2 border-storke rounded-xl">
          <div className="font-bold text-center text-2xl md:text-3xl">
            My Interviews
          </div>
          {booking?.data &&
          Array.isArray(booking.data) &&
          booking.data.length > 0 ? (
            <div className="space-y-4 md:space-y-6">
              {booking.data.map((booking: BookingModel, index: number) => (
                <InterviewCard
                  key={index}
                  companyName={booking.company.name}
                  bookingDate={dayjs(booking.apptDate).utc().format("YYYY-MM-DD")}
                  name={booking.user.name}
                  onEdit={() => {
                    router.push(`/admin/booking/manage?id=${booking._id}`);
                  }}
                  onRemove={() => removeDialog(booking._id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-lg">
              You have no interview scheduled
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
