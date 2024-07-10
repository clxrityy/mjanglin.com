import { Metadata } from "next";

export const metadata: Metadata = {
    title: "hbd | commands",
    description: "A list of all the commands available within hbd",
}

export default function CommandsLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {

    return <main>
        <div className="mx-auto">
            {children}
        </div>
    </main>
    
}