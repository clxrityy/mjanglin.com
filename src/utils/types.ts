export interface Post {
    title: string;
    slug: {
        current: string;
        _type: string;
    };
    publishedAt: string;
    mainImage: string;
    preview: string;
    body: unknown; // Better than any
    tags: Array<Tag>;
    _id: string;
    author: {
        _ref: string;
        _type: string;
        _id: string;
    }
}

export interface Tag {
    title: string;
    slug: {
        current: string;
    };
    _id: string;
    icon: unknown; // Better than any
}

export interface Author {
    _id: string;
    name: string;
    slug: {
        current: string;
        _type: string;
    };
    image: unknown; // Better than any
    bio: unknown; // Better than any
    _createdAt: string;
    _ref: string;
}

export interface Project {
    title: string;
    publishedAt: string; // Consider using Date in the future
    mainImage: string;
    preview: string;
    keywords: string[]; // Keep mutable for Next.js metadata compatibility
    author: string;
    slug: string;
}

export interface IpGeolocation {
    query: string;
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
}

export interface WeatherForecast {
    current: {
        time: string;
        temperature_2m: number;
        rain: number;
    }
}

// Add new error types
export interface ApiError {
    message: string;
    code?: string;
    details?: unknown;
}

export interface WeatherData {
    temp: number;
    rain: Float32Array;
}

// Add component prop types
export interface ComponentSize {
    width: number;
    height: number;
}