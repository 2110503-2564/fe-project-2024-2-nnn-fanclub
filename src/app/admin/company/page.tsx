"use client";
import CompanyCardManage from "@/components/CompanyCardManage";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import getCompanies from "@/libs/getCompanies";

export default function ManageCompanyPage() {
  const { data: session } = useSession();

  const [companies, setCompanies] = useState<CompanyModel[] | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <main>
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
                onEdit={() => console.log("Edit")}
                onRemove={() => console.log("Remove")}
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
