"use client";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </ThemeProvider>
    );
}