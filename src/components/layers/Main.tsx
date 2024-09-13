import { Suspense } from "react";
import Background from "./Background"
import Loading from "@/app/loading";

type Props = {
    children: React.ReactNode;
}

export default async function Main({ children }: Props) {
    return <div className="static flex">
        <Suspense fallback={<div className="h-screen w-screen fixed bg-gray-800 animate-pulse" />}>
            <Background />
        </Suspense>
        <main className="relative">
            <div className="my-20">
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </div>
            
        </main>
    </div>
}