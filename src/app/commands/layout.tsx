import { Metadata } from "next";

export const metadata: Metadata = {
    title: "hbd | commands",
    description: "A list of all the commands available in hbd",
}

export default function CommandsLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {

    return <div className="flex w-full h-full items-center">
        <div className="container">
            {children}
        </div>
    </div>
    
}