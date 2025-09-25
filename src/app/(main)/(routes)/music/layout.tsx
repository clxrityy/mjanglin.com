import { Metadata } from "next";
import { ReactNode } from "react";
import "./styles.css";

export const metadata: Metadata = {
    description: `
        Music by MJ Anglin (clxrity)
    `
}


export default async function Layout({
    children,
}: Readonly<{ children: ReactNode }>) {

    return children;
}