import Header from "@/components/Header";
import FormCompany from "@/components/FormCompany";

export default function NewBooking() {
  return (
    <main>
      <Header
        header="Create Booking"
        description="Create your own Booking"
        buttonType="none"
        role="admin"
      />
      {/* Content */}
      <FormCompany/>
    </main>
  );
}