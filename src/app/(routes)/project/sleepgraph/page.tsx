"use client";

import { MDXProvider } from "@mdx-js/react";
import Content from "./content.mdx";

export default function SleepGraph() {
    return (
        <div className="blog-content">
            <MDXProvider>
                <Content />
            </MDXProvider>
        </div>
    )
}