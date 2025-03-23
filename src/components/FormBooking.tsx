import React, { useState } from "react";

export default function FormBooking() {
  // State to manage the selected company and date
  const [selectedCompany, setSelectedCompany] = useState("TechGiant Inc.");
  const [selectedDate, setSelectedDate] = useState("2022-05-10T24:00:00");

  // Handle change in company selection
  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  };

  // Handle change in date selection
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  // Handle confirm button click
  const handleConfirm = () => {
    console.log("Confirmed", selectedCompany, selectedDate);
  };

  return (
    <div className="w-screen bg-white py-4 md:p-4">
      <div className="bg-c2 p-2 md:p-6 space-y-4 md:space-y-6 mx-6 border-2 border-storke rounded-xl">
        <div className="flex flex-col space-y-4 my-4">
          {/* Company Selection */}
          <div className="flex flex-col items-center">
            <label className="block text-center text-base md:text-2xl font-medium">
              Before : {selectedCompany}
            </label>
            <select
              value={selectedCompany}
              onChange={handleCompanyChange}
              className="text-sm md:text-lg mt-2 justify-items-center block w-3/4 px-4 py-2 bg-white rounded-md border border-storke"
            >
              <option value="TechGiant Inc.">TechGiant Inc.</option>
              <option value="Another Company">Another Company</option>
              <option value="Sample Corp">Sample Corp</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col items-center">
            <label className="block text-center text-base md:text-2xl font-medium">
              Before : {selectedDate}
            </label>
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={handleDateChange}
              className="text-sm md:text-lg mt-2 justify-items-center block w-3/4 px-4 py-2 bg-white rounded-md border border-storke"
            />
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
};