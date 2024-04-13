"use server";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { createProjectTable } from "../../(actions)/_actions/projects";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MJ Anglin | Admin",
    description: "Admin dashboard login",
  };

}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  try {
    await createProjectTable();
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="w-screen h-screen">
      <Toaster />
      {children}
    </div>
  );

}