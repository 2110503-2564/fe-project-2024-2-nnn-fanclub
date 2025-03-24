import axios from "axios";

export default function createBooking(token: string, bookingId: string, apptDate: string): Promise<BookingApi> {
return axios
    .post(
        process.env.BASE_API_URL + `/companies/${bookingId}/booking`,
        { apptDate },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    )
    .then((res) => {
        return { ...res.data, message: "CREATE_OK" };
    })
    .catch((err) => {
        return { success: false, message: err };
    });
}