import axios from "axios";

export default async function getMe(token: string): Promise<UserApi> {
    return await axios.get(process.env.BASE_API_URL + "/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    .then((res) => {
        return { ...res.data, message: "GET_OK" } as UserApi;
    })
}