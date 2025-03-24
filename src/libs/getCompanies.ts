import axios from "axios";

export default async function getCompanies(
  token: string
): Promise<CompaniesApi> {
  return await axios
    .get(process.env.BASE_API_URL + "/companies", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return { ...res.data, message: "GET_OK" } as CompaniesApi;
    })
    .catch((err) => {
      return { success: false, message: err } as CompaniesApi;
    });
}
