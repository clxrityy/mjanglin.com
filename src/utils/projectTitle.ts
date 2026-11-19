/** Splits "Name — tagline" / "Name - tagline" into its two parts. */
export function splitProjectTitle(title: string) {
	const match = title.match(/^(.+?)\s+[—–-]\s+(.+)$/);
	return match
		? { name: match[1], tagline: match[2] }
		: { name: title, tagline: null };
}
