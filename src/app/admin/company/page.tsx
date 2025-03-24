"use client";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";

export default function ManageCompanyPage() {
  const { data: session } = useSession();

  return (
    <main>
      <Header
        header="Manage Company"
        description="Manage companies for Admin"
        buttonType="Create Company"
        role = {session?.user.role as string}
      />
    </main>
  );
}
