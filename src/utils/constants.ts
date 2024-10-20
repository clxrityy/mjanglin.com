import configurations from "@/config";
import { Blog, ProjectParams, Tag } from "./types";

export const TAGS: Tag[] = [
    {
        name: "Nextjs",
        icon: configurations.icons.nextjs,
        color: "#fff"
    },
    {
        name: "Vercel",
        icon: configurations.icons.vercel,
        color: "#fff"
    },
    {
        name: "Discord",
        icon: configurations.icons.discord,
        color: configurations.colors.discord,
    },
    {
        name: "Prisma",
        icon: configurations.icons.prisma,
        color: "#fff"
    },
    {
        name: "PostgreSQL",
        icon: configurations.icons.postgresql,
        color: configurations.colors.postgresql,
    },
    {
        name: "TypeScript",
        icon: configurations.icons.typescript,
        color: configurations.colors.typescript,
    },
    {
        name: "React",
        icon: configurations.icons.react,
        color: configurations.colors.react,
    },
    {
        name: "Recharts",
        icon: configurations.icons.recharts,
        color: "#fff"
    },
    {
        name: "Web Audio API",
        icon: configurations.icons.audio,
        color: "#fff"
    },
    {
        name: "NodeJS",
        icon: configurations.icons.nodejs,
        color: configurations.colors.nodejs
    }
] as const;

export const PROJECTS = [
    {
        name: "hbd",
        short_desc: "A dynamic Discord birthday bot",
        examples: [{
            webm: "/img/hbd_example.webm",
            mp4: "/img/hbd_example.mp4"
        }],
        link: "/blogs/dev/hbd",
        github: "https://github.com/clxrityy/mjanglin.com/tree/hbd",
        thumbnail: "/img/hbd.png",
        description: "A discord bot that allows users to set and view birthdays of members within a guild. Highly customizable for guild admins. Runs on edge runtime.",
        tags: [
            TAGS[0],
            TAGS[1],
            TAGS[2],
            TAGS[3],
            TAGS[4],
            TAGS[5],
            TAGS[9]
        ],
        style: {
            gradient_from: configurations.colors.discord,
            gradient_to: "#000"
        },
        demo_link: "https://hbd.mjanglin.com"
    },
    {
        name: "sleep graph",
        short_desc: "Calculate and visualize your sleep patterns",
        thumbnail: "/img/sleep-graph.png",
        github: "https://github.com/clxrityy/mjanglin.com/tree/sleepgraph",
        tags: [
            TAGS[0],
            TAGS[1],
            TAGS[2],
            TAGS[3],
            TAGS[4],
            TAGS[5],
            TAGS[6],
        ],
        style: {
            gradient_from: "#D53733aa",
            gradient_to: "#000"
        },
        demo_link: "https://sleepgraph.mjanglin.com",
        link: "https://sleepgraph.mjanglin.com",
        description: "A web application that allows users to input their sleep data and visualize it with different graphs. Users can view their sleep patterns over time and see how their sleep quality changes.",
        examples: [
            {
                webm: "/img/sleepgraph_example_1.webm",
                mp4: "/img/sleepgraph_example_1.mp4"
            },
            {
                webm: "/img/sleepgraph_example_2.webm",
                mp4: "/img/sleepgraph_example_2.mp4"
            }
        ]
    },
    {
        name: "react-audio",
        short_desc: "A react audio component library",
        thumbnail: "/img/react-audio.png",
        github: "https://github.com/clxrityy/react-audio",
        tags: [
            TAGS[0],
            TAGS[7],
            TAGS[8],
            TAGS[9]
        ],
        description: "A react component library that allows users to easily add audio players to their web applications. The library is highly customizable and supports multiple audio sources.",
        link: "https://clxrityy.github.io/react-audio/?path=/docs/home--docs",
        examples: [
            {
                webm: "/img/react-audio_example_1.webm",
                mp4: "/img/react-audio_example_1.mp4"
            },
            {
                webm: "/img/react-audio_example_2.webm",
                mp4: "/img/react-audio_example_2.mp4"
            }
        ],
        style: {
            gradient_from: "#000",
            gradient_to: "#000"
        }
    }

] as ProjectParams[];

export const BLOGS: Blog[] = [
    {
        title: "hbd | A dynamic Discord birthday bot",
        date: "2024-04-20",
        description: "An overview of building a Discord bot that runs on edge runtime with Nextjs and deployed with Vercel, integrating it with a dashboard, and setting up an OAuth2 flow with Discord.",
        link: "/blogs/dev/hbd",
        thumbnail: "/img/hbd.png",
        tags: [
            TAGS[0],
            TAGS[1],
            TAGS[2],
            TAGS[3],
            TAGS[4],
            TAGS[5],
            TAGS[9]
        ]
    }
]