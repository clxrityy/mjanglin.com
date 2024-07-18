import Background from "./Background";

type Props = {
    children: React.ReactNode;
}

export default async function Main({ children }: Props) {
    return <div className="relative w-screen h-screen">
        <Background />
        <main className="">
            {children}
        </main>
    </div>
}