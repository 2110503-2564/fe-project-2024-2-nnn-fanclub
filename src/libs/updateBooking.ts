import axios from "axios";

export default function updateBooking(
  token: string,
  bookingId: string,
  apptDate: string
): Promise<BookingApi> {
  return axios
    .put(
      process.env.BASE_API_URL + `/bookings/${bookingId}`,
      { apptDate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return { ...res.data, message: "UPDATE_OK" };
    })
    .catch((err) => {
      return { success: false, message: err };
    });
}