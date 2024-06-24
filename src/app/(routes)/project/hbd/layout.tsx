"use client";

import { MDXProvider } from "@mdx-js/react";
import Content from "./page.mdx";

export default function Hbd() {
    return (
        <div className="blog-content">
            <MDXProvider>
                <Content />
            </MDXProvider>
        </div>
    )
}