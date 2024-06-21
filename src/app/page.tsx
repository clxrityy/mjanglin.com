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
                        Welcome, {user.username}!
                    </h3>
                </div>
                <div className="flex items-center justify-center flex-col h-full w-full">
                    <Button>
                        <Link href="/commands">
                            view all commands
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
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}