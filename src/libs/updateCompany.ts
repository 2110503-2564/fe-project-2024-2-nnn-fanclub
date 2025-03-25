import axios from "axios";

export default function updateCompany(
  token: string,
  companyId: string,
  name: string,
  address: string,
  website: string,
  description: string,
  telephone: string
): Promise<BookingApi> {
  return axios
    .put(
      process.env.BASE_API_URL + `/companies/${companyId}`,
      { name, address, website, description, telephone },
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
