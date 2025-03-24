import jwt from "jsonwebtoken";
import userLogin from "@/libs/userLogin";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import getMe from "@/libs/getMe";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null;
                const user = await userLogin(credentials.email, credentials.password);

                if (user && user.token) {
                    try {
                        const verifiedToken = jwt.verify(
                            user.token || "", 
                            process.env.NEXTAUTH_SECRET || ""
                        );

                        const user2 = await getMe(user.token);
                        if (user2.data) {
                            console.log(typeof verifiedToken);
                            return {
                                id: user2.data._id || "",
                                name: user2.data.name,
                                email: user2.data.email,
                                role: user2.data.role,
                                token: user.token || "",
                                verifiedToken: user.token || ""
                            };
                        } else {
                            throw new Error("Invalid Token");
                        }
                    } catch (err) {
                        throw new Error("Invalid Token");
                    }
                } else {
                    throw new Error(user.message);
                }
            },
        })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.token = user.token;
                token.verifiedToken = user.verifiedToken;
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.verifiedToken = token.verifiedToken as string;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
        newUser: '/auth/register',
    }
}