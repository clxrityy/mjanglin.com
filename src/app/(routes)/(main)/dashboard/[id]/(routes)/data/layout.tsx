import ModalProvider from "@/components/providers/modal";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "sleepg graph data",
}

type Props = {
    params: { id: string };
    children: Readonly<React.ReactNode>;
}

export default function Layout({ children, params }: Props) { 
    return (
        <div className="flex flex-col w-full h-full">
            {children}
            <ModalProvider userId={params.id} />
        </div>
    )
}