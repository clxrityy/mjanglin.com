import { BackBtn } from "@/components/buttons/BackBtn";

export default async function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<BackBtn />
			{children}
		</>
	);
}
