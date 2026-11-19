import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "MJ Anglin | Projects",
	description: "A collection of projects written by MJ Anglin",
};

// The back button comes from the parent (routes) layout.
export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="relative min-h-screen w-full">{children}</div>;
}
