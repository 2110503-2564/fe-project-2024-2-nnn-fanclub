"use client";
import React, { useEffect, useState } from "react";
import { Building, Calendar } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import getCompany from "@/libs/getCompany";
import createBooking from "@/libs/createBooking";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import updateBooking from "@/libs/updateBooking";
import getBooking from "@/libs/getBooking";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function FormBooking({ action }: { action: string }) {
  //(0)initial setup
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  //(1)redirect path / fetch data for info in input
  useEffect(() => {
    if (!searchParams.has("id")) {
      router.push("/user/");
      toast.error("Invalid URL. Redirecting to booking page.");
    } else {
      const companyId = searchParams.get("id");
      //fetch company API for create page(input company)
      if (companyId && session && action === "create") {
        getCompany(session.verifiedToken, companyId)
          .then((company) => {
            if (!company.success) {
              toast.error("Not found company in system");
            } else if (company.data) {
              const obj = Array.isArray(company.data)
                ? company.data[0]
                : company.data;
              setSelectedCompanyName(obj.name);
              setSelectedCompany(obj._id);
            }
          })
          .catch((error) => {
            toast.error("Failed to fetch company data.");
            console.error(error);
          });
      }
      //fetch booking API for update page(input datePicker/booking)
      else if (companyId && session && action === "update") {
        getBooking(session.verifiedToken, companyId)
          .then((company) => {
            if (!company.success) {
              toast.error("Not found company in system");
            } else if (company.data) {
              const obj = Array.isArray(company.data)
                ? company.data[0]
                : company.data;
              setSelectedCompanyName(obj.company.name);
              setSelectedCompany(obj._id);
              setSelectedDate(dayjs(obj.apptDate));
            }
          })
          .catch((error) => {
            toast.error("Failed to fetch company data.");
            console.error(error);
          });
      }
    }
  }, []);

  //(2)State to manage the selected company and date
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompantName, setSelectedCompanyName] = useState("loading");
  const [selectedDate, setSelectedDate] = useState<Dayjs>(
    dayjs("2022-05-10T17:00:00.000Z").utc()
  );

  const handleDateChange = (e: any) => {
    setSelectedDate(e.utc());
  };

  //(3)Handle confirm button click
  const handleConfirm = async () => {
    if (session && selectedCompany) {
      //create booking
      if (action === "create") {
        toast.promise(
          async () => {
            await createBooking(
              session.verifiedToken,
              selectedCompany,
              selectedDate.toDate().toISOString()
            ).then((res) => {
              if (res.success) {
                if (session.user.role === "user") router.push("/user");
                else router.push("/admin/booking");
              } else {
                throw new Error(res.message);
              }
            });
          },
          {
            loading: "Creating booking...",
            success: "Created booking successfully.",
            error: (err) => err.message || "Failed to create booking.",
          }
        );
      }
      //update booking
      else {
        toast.promise(
          async () => {
            await updateBooking(
              session.verifiedToken,
              selectedCompany,
              selectedDate.toDate().toISOString()
            ).then((res) => {
              if (res.success) {
                if (session.user.role === "user") router.push("/user");
                else router.push("/admin/booking");
              } else {
                throw new Error(res.message);
              }
            });
          },
          {
            loading: "Creating booking...",
            success: "Created booking successfully.",
            error: (err) => err.message || "Failed to create booking.",
          }
        );
      }
    }
  };

  return (
    <div className="w-screen bg-white py-4 md:p-4">
      <div className="bg-c2 p-2 md:p-6 space-y-4 md:space-y-6 mx-6 border-2 border-storke rounded-xl">
        <div className="flex flex-col space-y-4 my-4">
          {/* Company Selection */}
          <div className="flex flex-col items-center">
            <label className="block text-center text-base md:text-2xl font-medium">
              <h2 className="card-title">
                {" "}
                <Building size={23} />
                Company
              </h2>
            </label>
            <select
              defaultValue={selectedCompany}
              className="text-sm md:text-lg mt-2 justify-items-center block w-3/4 px-4 py-2 bg-white rounded-md border border-storke"
            >
              <option defaultValue={selectedCompany}>
                {selectedCompantName}
              </option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col items-center">
            <label className="block text-center text-base md:text-2xl font-medium">
              <h2 className="card-title">
                {" "}
                <Calendar size={23} />
                Appointment
              </h2>
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate.utc()}
                onChange={handleDateChange}
                className="text-sm md:text-lg mt-2 justify-items-center block w-3/4 px-4 py-2 bg-white rounded-md border border-storke"
              />
            </LocalizationProvider>
          </div>

          {/* Confirm Button */}
          <div className="flex flex-col items-center mt-6">
            <button
              onClick={handleConfirm}
              className="text-xl w-2/4 py-2 bg-bggreen text-black rounded-md border border-storke hover:bg-green-500 hover:text-white transition duration-300"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
