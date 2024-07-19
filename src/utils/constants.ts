import configurations from "@/config";
import { ProjectParams } from "./types";

export const PROJECTS = [
    {
        name: "hbd",
        short_desc: "A dynamic Discord birthday bot",
        images: ["/img/hbd_example.gif"],
        link: "/project/hbd",
        github: "https://github.com/clxrityy/mjanglin.com/tree/hbd",
        thumbnail: "/img/hbd.png",
        description: "A discord bot that allows users to set and view birthdays of members within a guild. Highly customizable for guild admins. Runs on edge runtime.",
        tags: [
            "Nextjs",
            "Vercel",
            "Discord",
            "Prisma",
            "PostgreSQL",
            "TypeScript"
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
            "Nextjs",
            "Vercel",
            "React",
            "TypeScript",
            "PostgreSQL",
            "Prisma",
            "Recharts",
        ],
        style: {
            gradient_from: "#D53733aa",
            gradient_to: "#000"
        },
        demo_link: "https://sleepgraph.mjanglin.com",
        link: "https://sleepgraph.mjanglin.com",
        description: "A web application that allows users to input their sleep data and visualize it with different graphs. Users can view their sleep patterns over time and see how their sleep quality changes.",
        images: [
            "/img/sleepgraph_example_1.gif",
            "/img/sleepgraph_example_2.gif",
        ]
    }

] as ProjectParams[];

export const TAGS = [
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
    }
] as const;