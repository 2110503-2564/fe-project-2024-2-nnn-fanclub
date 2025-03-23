import axios from "axios";

export async function userRegister({name, telephone, email, password}: UserModel): Promise<UserApi> {
    return await axios.post(process.env.BASE_API_URL + "/auth/register", {
        name,
        telephone,
        email,
        password,
        role: "user"
    }, {
        validateStatus: () => true
    })
    .then((res) => {
        if (res.status >= 500) {
            return {
                success: false,
                message: "Internal Server Error"
            } as UserApi;
        } else if (res.status >= 400) {
            return {
                success: false,
                message: "Register doesn't accepted"
            } as UserApi;
        }

        return { ...res.data, message: "Register Success" } as UserApi;
    })
    .catch((err) => {
        return {
            success: false,
            message: "Unexpected Error"
        } as UserApi;
    });
}