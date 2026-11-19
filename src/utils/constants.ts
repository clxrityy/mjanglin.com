export const CONSTANTS = {
	SPOTIFY_ARTIST_ID: "0HaFO6TLXEZ2De3d67dThV",
	WEATHER_CACHE_DURATION: 300000, // 5 minutes
	DEFAULT_WEATHER_TEMP: 0,
	GOOGLE_ANALYTICS_ID: "G-DH9C4WZGMK",
} as const;

/**
 * Home page project dashboard.
 * After START_DELAY_MS of the dashboard being on screen (tab visible, not hovered),
 * tiles swap one at a time every ROTATE_INTERVAL_MS until every project has been
 * shown PASSES times, then the dashboard settles.
 */
export const DASHBOARD = {
	SLOTS: 4,
	START_DELAY_MS: 6000,
	ROTATE_INTERVAL_MS: 4500,
	TRANSITION_MS: 700,
	PASSES: 1,
} as const;

export const COMPONENT_SIZES = {
	HERO_ICON: {
		width: 100,
		height: 100,
	},
	SPOTIFY_PROFILE_ICON: {
		width: 32,
		height: 32,
	},
	SOCIAL_ICON: {
		width: 40,
		height: 40,
	},
	FLAG_ICON: {
		width: 50,
		height: 50,
	},
} as const;

export const ANIMATION_CLASSES = {
	HOVER_SCALE: "hover:scale-105 transition-all duration-300 ease-out",
	HOVER_SCALE_LARGE: "hover:scale-125 transition-all duration-300 ease-in-out",
	PULSE: "animate-pulse",
	SPIN: "animate-spin",
} as const;
