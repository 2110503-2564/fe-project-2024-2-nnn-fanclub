'use client';
import Footer from "@/components/Footer";
import TopMenu from "@/components/TopMenu";

export default function UserLayout({children}: {children: React.ReactNode}) {
    return (
      <div className="mt-[10vh]">
        <TopMenu />
        {children}
        <Footer />
      </div>
    );
}