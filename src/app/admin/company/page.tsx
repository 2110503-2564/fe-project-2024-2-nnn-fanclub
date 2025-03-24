"use client";
import CompanyCardManage from "@/components/CompanyCardManage";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import getCompanies from "@/libs/getCompanies";
import { deleteBooking } from "@/libs/deleteBooking";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"

export default function ManageCompanyPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [companies, setCompanies] = useState<CompanyModel[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [removeRef, setRemoveRef] = useState<string>("");

  //fetch Data
  useEffect(() => {
    //fetch Companies
    const fectchCompanies = async () => {
      try {
        const res = await getCompanies(session?.verifiedToken as string);
        if (!res.success) {
          throw new Error(`error : ${res.message}`);
        }
        setCompanies(res.data as CompanyModel[]);
        console.log("Companies: ", companies);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };
    fectchCompanies();
  }, [session]);
  if(loading) return <div>Loading...</div>;

  // for remove Button
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
          error: "Error can't remove company",
        })
        .then(() => {
          window.location.reload();
        });
    } else {
      toast.error("Error can't remove company");
    }
  };

  return (
    <main>
      {/* dialog remove */}
      <dialog id="modal-remove" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Comfirm Delete ?</h3>
          <p className="py-4">Are you confirm to delete this company</p>
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
        header="Manage Company"
        description="Manage companies for Admin"
        buttonType="Create Company"
        role={session?.user.role as string}
      />
      {/* Companies List */}
      <div className="w-screen bg-white py-4 md:p-4">
        <div className="bg-c2 p-2 md:p-6 space-y-4 md:space-y-6 mx-6 border-2 border-storke rounded-xl">
          <div className="font-bold text-center text-2xl md:text-3xl">
            Companies
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : companies ? (
            companies.map((company: CompanyModel) => (
              <CompanyCardManage
                key={company._id}
                name={company.name}
                description={company.description}
                address={company.address}
                telephone={company.telephone}
                website={company.website}
                onEdit={() => {
                  router.push(`/admin/company/${company._id}`);
                }}
                onRemove={() => removeDialog(company._id)}
              />
            ))
          ) : (
            <div className="text-center text-xl text-red-700">
              No company data available
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
