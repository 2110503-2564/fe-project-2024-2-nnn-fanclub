import axios from "axios";

export default function createCompany(
  token: string,
  name: string,
  address: string,
  website: string,
  description: string,
  telephone: string
): Promise<BookingApi> {
  return axios
    .post(
      process.env.BASE_API_URL + `/companies`,
      { name, address, website, description, telephone },
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
