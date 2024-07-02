import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import Dashbar from "./Dashbar";
import { SleepUser } from "@prisma/client";

type Props = {
    children: React.ReactNode;
    userData: {
        sleepData: {
            id: string;
            userId: string;
            duration: number;
            date: Date;
        }[]
    } & SleepUser;
}

export default function DashLayout({ children, userData }: Props) {
    return <ResizablePanelGroup direction="horizontal" className="w-screen h-screen relative">
        <ResizablePanel minSize={10} defaultSize={20} className="flex-row w-full h-screen max-w-xl justify-center justify-items-center hidden md:flex px-3">
            <Dashbar userData={userData} />
        </ResizablePanel>
        <ResizableHandle className="h-screen border border-zinc-200/30 border-separate hidden md:flex" />
        <ResizablePanel minSize={80} defaultSize={100} className="w-full">
            <div className="w-full h-full">
                {children}
            </div>
        </ResizablePanel>

    </ResizablePanelGroup>
}