import axios from "axios";

export default async function getMe(token: string): Promise<UserApi> {
    const response = await axios.get(process.env.BASE_API_URL + "/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });

    // TODO: Implement error handling better than this code at soon.
    if (response.status !== 200) 
        throw new Error("Failed to login");

    return response.data;
}