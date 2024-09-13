import { Suspense } from "react";
import DigitalClock from "../animations/DigitalClock";
import Menu from "../tools/Menu";


export default async function Footer() {
    return (
        <footer className="fixed bottom-0 w-screen bg-zinc-900/90">
            <div className="flex flex-row w-full justify-start items-center px-4 py-2">
                <Menu />
                <div className="flex w-full justify-end">
                    <Suspense fallback={<div>
                        {new Date().toLocaleTimeString()}
                    </div>}>
                        <DigitalClock />
                    </Suspense>
                </div>
            </div>
        </footer>
    )
}