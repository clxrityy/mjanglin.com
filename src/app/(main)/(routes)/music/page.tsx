import { ICONS } from "@/config";
import { CONSTANTS } from "@/utils/constants";

const {
	spotify: Spotify,
	soundcloud: Soundcloud,
	applemusic: AppleMusic,
	youtubemusic: YouTubeMusic,
} = ICONS;

const PLATFORMS = [
	{ label: "Spotify", href: "/spotify", color: "#1DB954", Icon: Spotify },
	{
		label: "SoundCloud",
		href: "/soundcloud",
		color: "#FF5500",
		Icon: Soundcloud,
	},
	{
		label: "Apple Music",
		href: "/apple-music",
		color: "rgb(232,81,96)",
		Icon: AppleMusic,
	},
	{
		label: "YouTube Music",
		href: "https://music.youtube.com/channel/UCiJp6-CaIM46vit02HL_AGw",
		color: "#FF0000",
		Icon: YouTubeMusic,
	},
] as const;

export default function Page() {
	return (
		<div className="music-page">
			<div className="wrapper-outer" />
			<div className="wrapper" />
			<section className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center gap-8 px-6 pt-24 pb-16">
				<header className="rounded-lg border-l-4 border-white/25 bg-linear-to-l from-white/5 to-gray-300/10 px-5 py-5 backdrop-blur-sm">
					<h1 className="text-3xl font-bold sm:text-4xl">Music by MJ Anglin</h1>
					<p className="mt-2 text-base text-zinc-300">as clxrity</p>
				</header>

				<ul className="music-platforms">
					{PLATFORMS.map(({ label, href, color, Icon }) => (
						<li key={label}>
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="music-platform"
								style={{ "--brand": color } as React.CSSProperties}
							>
								<Icon aria-hidden="true" className="music-platform-icon" />
								<span>{label}</span>
							</a>
						</li>
					))}
				</ul>

				<iframe
					title="clxrity on Spotify"
					src={`https://open.spotify.com/embed/artist/${CONSTANTS.SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
					className="music-embed"
					height="352"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
				/>
			</section>
		</div>
	);
}
