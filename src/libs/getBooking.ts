import axios from "axios";

export default async function getBooking(
  token: string, bookingID: string
): Promise<BookingApi> {
  return await axios
    .get(process.env.BASE_API_URL + `/bookings/${bookingID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return { ...res.data, message: "GET_OK" } as BookingApi;
    })
    .catch((err) => {
      return { success: false, message: err } as BookingApi;
    });
}
