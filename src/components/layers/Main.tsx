import { Suspense } from "react";
import Background from "./Background"
import Loading from "@/app/loading";

type Props = {
    children: React.ReactNode;
}

export default async function Main({ children }: Props) {
    return <div className="static flex">
        <Background />
        <main className="relative my-40">
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </main>
    </div>
}