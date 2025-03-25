import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function updateBooking(
  token: string,
  companyId: string,
  apptDate: string
): Promise<BookingApi> {
  return axios
    .put(
      process.env.BASE_API_URL + `/bookings/${companyId}`,
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
      if (dayjs(apptDate).utc().get("date") > 13 || dayjs(apptDate).utc().get("date") < 10 || dayjs(apptDate).utc().get("y") != 2022 || dayjs(apptDate).utc().get("month") != 4) {
        return { success: false, message: "Invalid date (It's between 10-13 May 2022 only!)" };
      }

      return { success: false, message: err };
    });
}