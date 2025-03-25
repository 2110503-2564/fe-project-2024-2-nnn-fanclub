"use client";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getMe from "@/libs/getMe";
import InterviewCard from "@/components/InterviewCard";
import dayjs from "dayjs";
import { deleteBooking } from "@/libs/deleteBooking";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CardStats from "@/components/CardStats";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ProfileCardProps {
  user: UserModel;
}

export default function AdminManageBooking() {
  const { data: session } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState<UserModel | null>(null); // Store User data
  const [bookings, setBookings] = useState<BookingModel[] | null>(null); // Store all user bookings
  const [loading, setLoading] = useState(true);
  const [removeRef, setRemoveRef] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDay, setSelectedDay] = useState<string>(""); // Selected day for filtering

  // Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe(session?.verifiedToken as string);
        if (!res.success) {
          throw new Error(`error : ${res.message}`);
        }
        setUserData(res.data as UserModel);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [session]);

  // Fetch Booking Data with Pagination and Day Filter
  useEffect(() => {
    const fetchBookings = async (page: number, day: string) => {
      try {
        setLoading(true);
        const res = await axios.get<BookingApi>(
          `${process.env.BASE_API_URL}/bookings?page=${page}&day=${day}`,
          {
            headers: {
              Authorization: `Bearer ${session?.verifiedToken}`,
            },
          }
        );
        if (res.data.success) {
          setBookings(res.data.data as BookingModel[]);
          setTotalPages(res.data.pagination?.maxPage || 1);
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings(currentPage, selectedDay);
  }, [currentPage, session, selectedDay]);

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
    setCurrentPage(1); // Reset to the first page when changing the day
  };

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
          setBookings((prev) =>
            prev ? prev.filter((booking) => booking._id !== removeRef) : null
          );
        });
    } else {
      toast.error("Error can't remove booking");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* dialog remove */}
      <dialog id="modal-remove" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete?</h3>
          <p className="py-4">Are you sure you want to delete this booking?</p>
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
      {/* Stat */}
      <CardStats />
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
          {/* Day Filter */}
          <div className="flex justify-center items-center gap-4">
            <label htmlFor="day-select" className="font-bold">
              Select Day:
            </label>
            <select
              id="day-select"
              className="select select-bordered"
              value={selectedDay}
              onChange={handleDayChange}
            >
              <option value="">All Days</option>
              <option value="10">May 10</option>
              <option value="11">May 11</option>
              <option value="12">May 12</option>
              <option value="13">May 13</option>
            </select>
          </div>
          {bookings && bookings.length > 0 ? (
            <>
              <div className="space-y-4 md:space-y-6">
                {bookings.map((booking: BookingModel, index: number) => (
                  <InterviewCard
                    key={index}
                    companyName={booking.company.name}
                    bookingDate={dayjs(booking.apptDate)
                      .utc()
                      .format("YYYY-MM-DD")}
                    name={booking.user.name}
                    onEdit={() => {
                      router.push(`/admin/booking/manage?id=${booking._id}`);
                    }}
                    onRemove={() => removeDialog(booking._id)}
                  />
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  className="btn btn-outline"
                  onClick={() => handlePageChange("prev")}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-outline"
                  onClick={() => handlePageChange("next")}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
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
