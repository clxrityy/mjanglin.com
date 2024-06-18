import Command from "@/components/Command";
import Search from "@/components/ux/Search";
import { CONFIG } from "@/config";
import { CommandData } from "@/types/interactions";

export default async function Page() {

    try {
        const commands = await fetch(`${CONFIG.URLS.DISCORD_API_BASE_URL}/applications/${process.env.CLIENT_ID!}/commands`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN!}`
            },
            next: { revalidate: 60 * 5 }
        }).then((res) => res.json() as Promise<CommandData[]>)



        if (commands.length <= 0) {
            return (<h3 className="font-semibold font-mono uppercase tracking-wide">
                No commands found
            </h3>)
        }

        return (
            <div className="w-full h-full flex flex-col">
                <Search commands={commands} />
            </div>
        )

    } catch (e: any) {
        console.error(e);
        return (<div className="flex flex-col items-center justify-center w-full">
            <h3 className="font-semibold font-mono uppercase tracking-wide">
                Error
            </h3>
            <pre className="rounded-md px-2 py-2 bg-zinc-800">
                {e.message}
            </pre>
        </div>)
    }

}