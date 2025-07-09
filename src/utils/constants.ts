export const CONSTANTS = {
    POSTS_PER_PAGE: 4,
    SPOTIFY_ARTIST_ID: "0HaFO6TLXEZ2De3d67dThV",
    WEATHER_CACHE_DURATION: 300000, // 5 minutes
    DEFAULT_WEATHER_TEMP: 0,
    GOOGLE_ANALYTICS_ID: "G-DH9C4WZGMK",
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
