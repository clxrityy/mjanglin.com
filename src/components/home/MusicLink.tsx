import Link from "next/link";

/** A low-key line to the music page: a few slow equaliser bars, then the name. */
export function MusicLink() {
	return (
		<Link href="/music" prefetch={false} className="music-line">
			<span className="music-eq" aria-hidden="true">
				<span />
				<span />
				<span />
				<span />
			</span>
			<span>music</span>
			<span className="music-handle">@clxrity →</span>
		</Link>
	);
}
