'use client';
import Footer from "@/components/Footer";
import TopMenu from "@/components/TopMenu";

export default function AdminLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <TopMenu />
            {children}
            <Footer />
        </div>
    )
}