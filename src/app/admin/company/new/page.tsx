import Header from "@/components/Header";
import FormCompany from "@/components/FormCompany";

export default function EditBooking() {
  return (
    <main>
      <Header
        header="Admin Create Company"
        description="Admin Create Company"
        buttonType="Create Company"
        role="admin"
      />
      {/* Content */}
      <FormCompany/>
    </main>
  );
}