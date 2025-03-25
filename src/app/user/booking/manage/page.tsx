import Header from "@/components/Header";
import FormBooking from "@/components/FormBooking";

export default function EditBooking() {
  return (
    <main>
      <Header
        header="Edit Booking"
        description="Edit your interview booking"
        buttonType="Book an Interview"
        role="user"
      />
      {/* Content */}
      <FormBooking action="update"/>
    </main>
  );
}