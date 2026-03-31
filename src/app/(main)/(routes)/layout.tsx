import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export default async function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Link
				href="/"
				className="absolute top-0 px-3 py-4 link"
				aria-label="back"
			>
				<MdArrowBack size={30} className="relative z-50" />
			</Link>
			{children}
		</>
	);
}
