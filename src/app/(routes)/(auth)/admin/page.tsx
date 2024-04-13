import Auth from "@/components/auth";
import { Suspense } from "react";

export default function Page() {

    return (
        <div className="w-full flex items-center justify-center h-full">
            <h1 className="sr-only">
                Admin Login
            </h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Auth />
            </Suspense>
        </div>
    )
}