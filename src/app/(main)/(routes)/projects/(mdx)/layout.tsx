import "@/styles/css/project.css";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="w-full lg:w-2/3 xl:w-1/2">
            <div className="markdown-body">
                {children}
            </div>
        </div>
    )
}