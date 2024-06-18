import { CommandData } from "@/types/interactions";

type Props = {
    data: CommandData;
}

function Card({ data }: Props) {
    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-zinc-800/60 to-zinc-700/50 px-4 py-2 rounded-md shadow-inner border border-zinc-300/60 gap-5">
            <div>
                <pre className="text-lg bg-zinc-950/70 px-1 py-1 rounded-md">
                    /{data.name}
                </pre>
                <p className="text-sm">
                    {data.description}
                </p>
            </div>
        </div>
    )
}

export default Card;