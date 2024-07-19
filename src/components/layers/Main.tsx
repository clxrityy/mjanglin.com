import Background from "./Background";

type Props = {
    children: React.ReactNode;
}

export default async function Main({ children }: Props) {
    return <div className="static flex">
        <Background />
        <main className="relative my-40">
            {children}
        </main>
    </div>
}