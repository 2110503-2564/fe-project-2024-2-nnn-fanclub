import Header from "@/components/Header";
import FormBooking from "@/components/FormBooking";

export default function CreateBooking() {
  return (
    <main>
      <Header
        header="Creat Booking"
        description="Create your interview booking"
        buttonType="Book an Interview"
        role="user"
      />
      {/* Content */}
      <FormBooking/>
    </main>
  );
}