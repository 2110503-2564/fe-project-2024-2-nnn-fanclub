import axios from "axios";

export default async function userLogin(email: string, password: string): Promise<UserApi> {
    const response = await axios.post(process.env.BASE_API_URL + "/auth/login", {
        email,
        password
    });

    // TODO: Implement error handling better than this code at soon.
    if (response.status !== 200) 
        throw new Error("Failed to login");

    return response.data;
}