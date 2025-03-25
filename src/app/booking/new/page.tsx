import Header from "@/components/Header";
import FormBooking from "@/components/FormBooking";

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
      <FormBooking action="create"/>
    </main>
  );
}