import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "MJ Anglin | Authenticate",
        description: "Admin dashboard login",
    };
    
}

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <div className="w-screen h-screen">
        {children}
        </div>
    );

}