import Header from "@/components/Header";
import FormCompany from "@/components/FormCompany";

export default function EditBooking() {
  return (
    <main>
      <Header
        header="Admin Edit Company"
        description="Admin Edit Company"
        buttonType="Create Company"
        role="admin"
      />
      {/* Content */}
      <FormCompany action="update" />
    </main>
  );
}
