import axios from "axios";

export async function userRegister({name, telephone, email, password}: UserModel): Promise<UserApi> {
    const response = await axios.post(process.env.BASE_API_URL + "/auth/register", {
        name,
        telephone,
        email,
        password,
        role: "user"
    });

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }

    return response.data;
}