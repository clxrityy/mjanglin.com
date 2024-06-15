import { CONFIG } from "@/config";
import { APIApplication } from "discord-api-types/v10";

export default async function Page() {

    try {
        const commands = await fetch(`${CONFIG.DISCORD_API_BASE_URL}/applications/${process.env.CLIENT_ID!}/commands`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN!}`
            },
            next: {revalidate: 60 * 5}
        }).then((res) => res.json() as Promise<APIApplication[]>)

        if (commands.length <= 0) {
            return <h3 className="font-semibold font-mono uppercase tracking-wide">
                No commands found
            </h3>
        }

        return (
            <div className="flex flex-col">
                {commands.map((command) => {
                    return (
                        <div key={command.id} className="flex flex-col">
                            <h3 className="font-semibold font-mono uppercase tracking-wide">
                                {command.name}
                            </h3>
                            <p>
                                {command.description}
                            </p>
                        </div>
                    )
                })}
            </div>
        )

    } catch (e: any) {
        console.error(e);
        return <div className="flex flex-col items-center justify-center w-full">
            <h3 className="font-semibold font-mono uppercase tracking-wide">
                Error
            </h3>
            <pre className="rounded-md px-2 py-2 bg-zinc-800">
                {e.message}
            </pre>
        </div>
    }

}