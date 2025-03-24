import axios from "axios";

function deleteBooking(token: string, bookingId: string): Promise<BookingApi> {
  return axios
    .delete(process.env.BASE_API_URL + `/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return { ...res.data, message: "DELETE_OK" };
    })
    .catch((err) => {
      return { success: false, message: err };
    });
}

export { deleteBooking };