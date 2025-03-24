import React, { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { Building, MapPin, Phone, Link } from "lucide-react";

export default function FormCompany() {
  // State to manage
  const [name, setName] = useState("before value name");
  const [description, setDescription] = useState("before value description");
  const [address, setAddress] = useState("before value address");
  const [tele, setTele] = useState("before value tele");
  const [website, setWebsite] = useState("before value website");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handleTele = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTele(e.target.value);
  };
  const handleWebsite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };

  // Handle confirm button click
  const handleConfirm = () => {
    console.log("Confirmed", name, description, address, tele, website);
  };

  return (
    <div className="w-screen bg-white py-4 md:p-4">
      <div className="bg-c2 p-2 md:p-6 space-y-4 md:space-y-6 mx-6 border-2 border-storke rounded-xl">
        <div className="flex flex-col space-y-4 my-4">
          {/* Form Text Input Name */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-3/4 flex justify-start">
              <label className="block text-base md:text-xl font-medium text-gray-700">
                <h2 className="card-title text-base md:text-3xl font-bold">
                  {" "}
                  <Building size={23} />
                  Company Name
                </h2>
              </label>
            </div>
            <div className="w-3/4 bg-white rounded-md border border-storke">
              <TextField
                fullWidth
                variant="outlined"
                value={name}
                onChange={handleName}
                placeholder="Name of the Company"
                className="text-sm md:text-lg"
              />
            </div>
          </div>

          {/* Form Text Input Description */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-3/4 flex justify-start">
              <label className="block text-base md:text-xl font-medium text-gray-700">
                <h2 className="card-title text-base md:text-3xl font-bold">
                  {" "}
                  <MapPin size={23} />
                  Description
                </h2>
              </label>
            </div>
            <div className="w-3/4 bg-white rounded-md border border-storke">
              <TextField
                fullWidth
                variant="outlined"
                value={description}
                onChange={handleDescription}
                placeholder="Name of the Company"
                className="text-sm md:text-lg"
              />
            </div>
          </div>

          {/* Form Text Input Address */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-3/4 flex justify-start">
              <label className="block text-base md:text-xl font-medium text-gray-700">
                <h2 className="card-title text-base md:text-3xl font-bold">
                  {" "}
                  <MapPin size={23} />
                  Address
                </h2>
              </label>
            </div>
            <div className="w-3/4 bg-white rounded-md border border-storke">
              <TextField
                fullWidth
                variant="outlined"
                value={address}
                onChange={handleAddress}
                placeholder="Name of the Company"
                className="text-sm md:text-lg"
              />
            </div>
          </div>

          {/* Form Text Input Telephone number */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-3/4 flex justify-start">
            <label className="block text-base md:text-xl font-medium text-gray-700">
              <h2 className="card-title text-base md:text-3xl font-bold">
                {" "}
                <Phone size={23} />
                Telephone number
              </h2>
            </label>
            </div>
            <div className="w-3/4 bg-white rounded-md border border-storke">
              <TextField
                fullWidth
                variant="outlined"
                value={tele}
                onChange={handleTele}
                placeholder="Name of the Company"
                className="text-sm md:text-lg"
              />
            </div>
          </div>

          {/* Form Text Input Website */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-3/4 flex justify-start">
            <label className="block text-base md:text-xl font-medium text-gray-700">
              <h2 className="card-title text-base md:text-3xl font-bold">
                {" "}
                <Link size={23} />
                Website
              </h2>
            </label>
            </div>
            <div className="w-3/4 bg-white rounded-md border border-storke">
              <TextField
                fullWidth
                variant="outlined"
                value={website}
                onChange={handleWebsite}
                placeholder="Name of the Company"
                className="text-sm md:text-lg"
              />
            </div>
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
