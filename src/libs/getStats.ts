import axios from "axios";

export default async function getStats(
  token: string
): Promise<StatsApi> {
  return await axios
    .get(process.env.BASE_API_URL + "/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return { ...res.data, message: "GET_OK" } as StatsApi;
    })
    .catch((err) => {
      return { success: false, message: err } as StatsApi;
    });
}
