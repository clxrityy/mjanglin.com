"use client";

import { MDXProvider } from "@mdx-js/react";
import Content from "./content.mdx";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 mx-10 justify-around overflow-y-scroll">
      <MDXProvider>
        <Content />
      </MDXProvider>
    </div>
  );
}