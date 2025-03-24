"use client";
import Header from "@/components/Header";
import TopMenu from "@/components/TopMenu";
import { useSession } from "next-auth/react";

export default function ManageCompanyPage() {
  const { data: session } = useSession();

  return (
    <main>
      <TopMenu />
      <Header
        header="Manage Compant"
        description="Manage companies for Admin"
        buttonType="Create Company"
        role = {session?.user.role as string}
      />
    </main>
  );
}
