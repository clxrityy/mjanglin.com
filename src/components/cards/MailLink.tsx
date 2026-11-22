import { LuMail } from "react-icons/lu";
import { URLS } from "@/config";

export function MailLink() {
	return (
		<a
			href={`mailto:${URLS.email}`}
			className="about-action"
			title={URLS.email}
		>
			<LuMail aria-hidden="true" />
			Email me
		</a>
	);
}
