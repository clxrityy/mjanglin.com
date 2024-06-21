import Guild from "@/components/Guild";
import Button from "@/components/ui/Button";
import { CONFIG } from "@/config";
import { db } from "@/lib/db";
import { parseUser } from "@/utils/parseUser";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = parseUser();

    if (!user) {
        return redirect(CONFIG.URLS.OAUTH2_INVITE_URL);
    }

    const userGuilds = await db.user.findUnique({
        where: {
            userId: user.id
        },
        include: {
            guilds: true
        }
    })

    return (
        <main>
            <div className="flex justify-center items-center flex-col gap-10">
                <h1>hbd</h1>
                <div className="flex items-center justify-center flex-col gap-2">
                    <h3>
                        Welcome, <span className="text-blue-400 tracking-wide">{user.username}</span>!
                    </h3>
                </div>
                <div className="flex items-center justify-center flex-col md:flex-row h-full w-full gap-8">
                    <Button>
                        <Link href="/commands" className="max-w-sm">
                            Application Commands <span className="font-mono text-zinc-600/85 font-light">(/)</span>
                        </Link>
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-center gap-5">
                    <h2>
                        Guilds
                    </h2>
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4">
                            {userGuilds?.guilds.map((guild) => (
                                <Guild key={guild.guildId} {...guild} />
                            ))}
                            <Link href={CONFIG.URLS.INVITE_URL} className="px-4 py-4 text-4xl border rounded-md flex items-center justify-center hover:scale-95 transition-all shadow hover:opacity-90 hover:text-emerald-400 hover:border-emerald-400 font-extrabold hover:bg-emerald-400/15" aria-label="Add to guild">
                                +
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}