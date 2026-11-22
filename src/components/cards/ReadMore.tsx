import Link from "next/link";
import { LuBookOpen } from "react-icons/lu";

export function ReadMore() {
	return (
		<Link href="/about" prefetch={false} className="about-action">
			<LuBookOpen aria-hidden="true" />
			Read more
		</Link>
	);
}
