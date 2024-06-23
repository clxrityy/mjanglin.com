import Button from "@/components/ui/Button";
import { CONFIG } from "@/config";
import { CommandData } from "@/types/interactions";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

type Props = {
    params: { id: string };
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    try {
        const commands = await fetch(`${CONFIG.URLS.DISCORD_API_BASE_URL}/applications/${CONFIG.VALUES.CLIENT_ID}/commands`, {
            headers: {
                Authorization: `Bot ${CONFIG.VALUES.BOT_TOKEN}`
            },
            next: {
                revalidate: 60 * 5
            }
        }).then((res) => res.json() as Promise<CommandData[]>);

        const command = commands.find(c => c.id === params.id);

        return {
            title: `hbd | ${command?.name}`,
            description: `View command details for ${command?.name}`,
        }

    } catch (e: any) {
        console.error(e);
        return {
            title: "hbd | Command",
            description: "View command details",
        }
    }
}

export default async function CommandPage({ params }: Props) {
    try {
        const commands = await fetch(`${CONFIG.URLS.DISCORD_API_BASE_URL}/applications/${CONFIG.VALUES.CLIENT_ID}/commands`, {
            headers: {
                Authorization: `Bot ${CONFIG.VALUES.BOT_TOKEN}`
            },
            next: {
                revalidate: 60 * 5
            }
        }).then((res) => res.json() as Promise<CommandData[]>);

        const command = commands.find(c => c.id === params.id);

        if (!command) {
            return (
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1>Command not found</h1>
                    <Button>
                        <Link href="/commands">
                            Back to commands
                        </Link>
                    </Button>
                </div>
            )
        }

        return (
            <pre>
                {JSON.stringify(command, null, 2)}
            </pre>
        )

    } catch (e: any) {
        console.error(e);
        return (
            <div className="flex flex-col items-center justify-center gap-4 h-full">
                <h1 className="uppercase">Error</h1>
                <pre className="text-red-500">
                    {e.message}
                </pre>
            </div>
        )
    }
}