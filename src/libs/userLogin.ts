import axios from "axios";

export default async function userLogin(email: string, password: string): Promise<UserApi> {
    return await axios.post(process.env.BASE_API_URL + "/auth/login", {
        email,
        password
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
                message: "Invalid Email or Password"
            } as UserApi;
        }

        return { ...res.data, message: "Login Success"} as UserApi;
    })
    .catch((err) => {
        return {
            success: false,
            message: "Unexpected Error"
        } as UserApi;
    });
}