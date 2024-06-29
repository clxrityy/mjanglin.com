import { fetchUser, fetchUserAvatar } from "@/data/util/functions/user";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

type Props = {
    params: { id: string };
}

export default async function Page({ params }: Props) {
    const user = await fetchUser(params.id);
    const avatar = await fetchUserAvatar(params.id);

    const userData = await db.user.findFirst({
        where: {
            userId: params.id
        }
    });
    const wishesSent = await db.wish.findMany({
        where: {
            userId: params.id
        }
    });
    const wishesReceived = await db.wish.findMany({
        where: {
            targetUserId: params.id
        }
    });
    const userGuilds = await db.user.findFirst({
        where: {
            userId: params.id
        },
        include: {
            guilds: true
        }
    });

    if (!userData) {
        return (
            <div className="flex items-center justify-center h-screen flex-col gap-10">
                <div className="flex flex-col items-center gap-4">
                <h3 className="text-red-400 uppercase text-5xl">User not found</h3>
                <p className="opacity-80">
                    If the user exists, they may not have logged in to the application yet.
                </p>
                </div>
                <Link href="/" className="px-4 py-3 rounded-md border-2 text-3xl font-semibold border-white/60 transition hover:scale-105 focus:ring-2 focus:ring-offset-2 flex flex-row gap-2 items-center">
                    <FaHome /> Home
                </Link>
            </div>
        )
    }

    return (
        <div className="flex items-center my-10 w-screen rounded-md px-10 justify-center">
            <div className="flex flex-col items-center gap-[75px]">
                <div className="flex flex-row items-center gap-4">
                    <Image src={avatar} width={64} height={64} alt={user.username} className="rounded-full" />
                    <h3 className="text-5xl text-blue-400">@{user.username}</h3>

                </div>
                <hr className="w-3/5 border-blue-300" />
                <div className="flex items-center flex-col gap-6">
                    <h2 className="text-zinc-300 opacity-90">
                        Info
                    </h2>
                    <ul className="list-disc flex flex-col gap-2 text-lg">
                        <li>
                            Authenticated — {userData.accessToken && userData.refreshToken ? (

                                <span className="font-mono px-1 py-1 bg-green-700 rounded-sm">true</span>

                            ) : (
                                <span className="font-mono px-1 py-1 bg-red-700 rounded-sm">
                                    false
                                </span>
                            )}
                        </li>
                        <li>
                            Guild count — <span className="font-mono px-1 py-1 bg-zinc-700 rounded-sm">{userGuilds?.guilds.length}</span>
                        </li>
                        <li>
                            Birthday wishes sent — <span className="font-mono px-1 py-1 bg-zinc-700 rounded-sm">{wishesSent.length}</span>
                        </li>
                        <li>
                            Birthday wishes received — <span className="font-mono px-1 py-1 bg-zinc-700 rounded-sm">{wishesReceived.length}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}