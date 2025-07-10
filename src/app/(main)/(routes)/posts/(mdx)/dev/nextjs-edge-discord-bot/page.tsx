"use client";

import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

const Content = dynamic(() => import("./content.mdx").then(mod => mod.default), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="flex flex-col gap-4 mx-10 overflow-y-scroll mt-20 mb-20 w-screen">
      <MDXProvider>
        <Content />
      </MDXProvider>
    </div>
  );
}