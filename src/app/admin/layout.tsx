'use client';
import TopMenu from "@/components/TopMenu";

export default function AdminLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <TopMenu />
            {children}
        </div>
    )
}