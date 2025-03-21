import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
        token: string;
        verifiedToken?: string;
    }

    interface Session {
        user: User & {
            verifiedToken?: string;
        };
    }

    interface JWT {
        id: string;
        role: string;
        token: string;
        verifiedToken?: string;
    }
}
