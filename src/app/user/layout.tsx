'use client';
import Footer from "@/components/Footer";
import TopMenu from "@/components/TopMenu";

export default function UserLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <TopMenu />
            {children}
            <Footer />
        </div>
    )
}