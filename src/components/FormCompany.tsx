"use client";
import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { Building, MapPin, Phone, Link } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import getCompany from "@/libs/getCompany";
import createCompany from "@/libs/createCompany";
import updateCompany from "@/libs/updateCompany";

export default function FormCompany({ action }: { action: string }) {
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

  //=================================before=================================
  //(0)initial setup
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  //(1)redirect path / fetch data for info in input
  useEffect(() => {
    //case action === "create" -> none
    //fetch company API for update page(for info input)
    if (session && action === "update") {
      if (!searchParams.has("id")) {
        router.push("/admin/company");
        toast.error("Invalid URL. Redirecting to company page.");
      }
      const companyId = searchParams.get("id");

      if (companyId) {
        getCompany(session.verifiedToken, companyId)
          .then((company) => {
            if (!company.success) {
              toast.error("Not found company in system");
            } else if (company.data) {
              const obj = Array.isArray(company.data)
                ? company.data[0]
                : company.data;
              console.log("obj: ", obj);
              setName(obj.name);
              setDescription(obj.description);
              setAddress(obj.address);
              setTele(obj.telephone);
              setWebsite(obj.website);
            }
          })
          .catch((error) => {
            toast.error("Failed to fetch company data.");
            console.error(error);
          });
      }
    }
  }, []);

  //(2)State to manage
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [tele, setTele] = useState("");
  const [website, setWebsite] = useState("");

  //(3)Handle confirm button click
  const handleConfirm = () => {
    if (session && name && description && address && tele && website) {
      console.log("token: ", session.verifiedToken, ", action: ", action);
      //create booking
      if (action === "create") {
        toast.promise(
          async () => {
            await createCompany(
              session.verifiedToken,
              name,
              address,
              website,
              description,
              tele,
            ).then((res) => {
              if (res.success) {
                if (session.user.role === "user") router.push("/user");
                else router.push("/admin/company");
              } else {
                throw new Error(res.message);
              }
            });
          },
          {
            loading: "Creating company...",
            success: "Created company successfully.",
            error: (err) => err.message || "Failed to create booking.",
          }
        );
      }
      //update booking
      else {
        const companyId = searchParams.get("id"); 
        toast.promise( 
          async () => {
            await updateCompany(
              session.verifiedToken,
              companyId || "",
              name,
              address,
              website,
              description,
              tele
            ).then((res) => {
              if (res.success) {
                if (session.user.role === "user") router.push("/user");
                else router.push("/admin/company");
              } else {
                throw new Error(res.message);
              }
            });
          },
          {
            loading: "Creating company...",
            success: "Created company successfully.",
            error: (err) => err.message || "Failed to create company.",
          }
        );
      }
    }
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
                className="texat-sm md:text-lg"
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
