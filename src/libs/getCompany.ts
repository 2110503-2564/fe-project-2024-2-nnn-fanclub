import axios from "axios";

export default async function getCompany(
  token: string,
  companyId: string
): Promise<CompaniesApi> {
  return await axios
    .get(process.env.BASE_API_URL + `/companies/${companyId}`, {
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
