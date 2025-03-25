import type { Metadata } from "next";
import { Poppins, IBM_Plex_Sans_Thai_Looped } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { Toaster } from "react-hot-toast";

const engFont = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin']
});

const thaiSans = IBM_Plex_Sans_Thai_Looped({
  weight: ['400', '600', '700'],
  subsets: ['thai']
});

export const metadata: Metadata = {
  title: "Job Fair",
  description: "Job Fair is a platform for job seekers and employers.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const nextAuthSession = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body
        className={`${engFont.className} ${thaiSans.className} antialiased`}
      >
        <Toaster />
        <NextAuthProvider session={nextAuthSession}>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
