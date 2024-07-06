import Background from "./Background";

type Props = {
    children: React.ReactNode;
}

export default function Main({children}: Props) {
    return <>
        <Background />
        <main>
            {children}
        </main>
    </>
}