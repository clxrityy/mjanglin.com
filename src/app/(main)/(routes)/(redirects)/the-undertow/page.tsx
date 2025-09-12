import { redirect } from "next/navigation";
import { Metadata } from "next";
import { r2AssetPath } from "@/utils/assets";

export const metadata: Metadata = {
    title: "The Undertow - clxrity",
    authors: [{ name: "MJ Anglin", url: "https://mjanglin.com" }, {
        name: "clxrity", url: "https://open.spotify.com/artist/0HaFO6TLXEZ2De3d67dThV",
    }],
    description: "Listen to The Undertow by clxrity. Available everywhere September 21st, 2025.",
    keywords: ["The Undertow", "clxrity", "MJ Anglin", "music", "single", "2025", "distrokid"],
    openGraph: {
        title: "The Undertow",
        description: "Listen to The Undertow by clxrity. Available everywhere September 21st, 2025.",
        url: "https://mjanglin.com/the-undertow",
        albums: ["The Undertow - clxrity"],
        emails: ["contact@mjanglin.com"],
        musicians: ["clxrity"],
        duration: 1460, // Duration in seconds (24 minutes and 20 seconds)
        determiner: "the",
        countryName: "US",
        siteName: "MJ Anglin",
        images: [
            {
                url: r2AssetPath('/assets/the-undertow.png'),
                width: 1200,
                height: 630,
                alt: "The Undertow Cover Art",
            },
        ],
        locale: "en_US",
        type: "music.song",
        ttl: 600, // Time to live in seconds (10 mins)
        videos: [
            {
                url: "https://youtu.be/ILwlqxE496E?si=b4knLnsq1u5S5Nr_",
                width: 1280,
                height: 720,
                username: "clxrity_",
                href: "https://www.youtube.com/@clxrity_",
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "The Undertow",
        description: "Listen to The Undertow by clxrity. Available everywhere September 21st, 2025.",
        images: [r2AssetPath('/assets/the-undertow.png')],
        creator: "yourclxrity",
    },
    metadataBase: new URL("https://mjanglin.com"),
    abstract: "The Undertow by clxrity",
    publisher: "MJ Anglin",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    pinterest: {
        richPin: true,
    },
    alternates: {
        canonical: "https://mjanglin.com/the-undertow",
    },
    applicationName: "The Undertow",
    appleWebApp: {
        capable: true,
        title: "The Undertow",
        statusBarStyle: "default",
        startupImage: [r2AssetPath('/assets/the-undertow.png')],
    },
    other: {
        "music:release_date": "2025-09-21",
        "music:musician": "https://open.spotify.com/artist/0HaFO6TLXEZ2De3d67dThV",
        "music:duration": "PT24M20S",
        "og:updated_time": new Date().toISOString(),
    },
    category: "music",
    classification: "The Undertow by clxrity",
    creator: "MJ Anglin",
    icons: {
        icon: r2AssetPath('/assets/the-undertow.png'),
        shortcut: r2AssetPath('/assets/the-undertow.png'),
        apple: r2AssetPath('/assets/the-undertow.png'),
        other: {
            rel: "apple-touch-icon-precomposed", url: r2AssetPath('/assets/the-undertow.png'),
        },
    }
}

export default async function Page() {
    return redirect("https://distrokid.com/hyperfollow/clxrity/the-undertow")
}