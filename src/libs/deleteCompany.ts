import axios from "axios";

function deleteCompany(token: string, companyId: string): Promise<BookingApi> {
  return axios
    .delete(process.env.BASE_API_URL + `/companies/${companyId}`, {
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

export { deleteCompany };
