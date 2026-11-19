import "@/styles/page/404.css";
import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";

export default function NotFound() {
	return (
		/* From Uiverse.io by Subaashbala */
		<div className="not-found font-exo">
			<TopNav current="Not found" />
			<h1>404</h1>
			<p>Page not found</p>
			<Link href="/" className="not-found-home">
				Go home
			</Link>
			<div className="modelViewPort">
				<div className="eva">
					<div className="head">
						<div className="eyeChamber">
							<div className="eye"></div>
							<div className="eye"></div>
						</div>
					</div>
					<div className="body">
						<div className="hand"></div>
						<div className="hand"></div>
						<div className="scannerThing"></div>
						<div className="scannerOrigin"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
