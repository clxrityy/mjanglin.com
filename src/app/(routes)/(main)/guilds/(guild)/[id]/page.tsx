import Birthday from "@/components/elements/Birthday";
import { fetchGuild, getGuildAvatar } from "@/data/util/functions/guild";
import { fetchUser } from "@/data/util/functions/user";
import { getZodiacSign } from "@/data/util/resources/signs";
import { db } from "@/lib/db";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

type Props = {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const id = (await params).id;

    const guild = await fetchGuild(id);

    return {
        title: `hbd | ${guild.name}`,
        description: `View birthdays for ${guild.name}`,
    }
}

export default async function Page({ params }: Props) {
    const guild = await fetchGuild((await params).id);
    const avatar = await getGuildAvatar({id: guild.id, icon: guild.icon ?? ""});

    const guildData = await db.guild.findUnique({
        where: {
            guildId: (await params).id
        },
        include: {
            members: true,
        }
    });

    let birthdays: {
        guildId: string;
        id: string;
        userId: string;
        month: number;
        day: number;
    }[] = [];

    if (guildData) {
        birthdays = await db.birthday.findMany({
            where: {
                guildId: guildData.guildId
            }
        });
    }

    return (
        <div className="flex flex-col gap-10 items-center my-10 h-full">
            <div className="flex justify-center items-center flex-col gap-10">
                <div className="flex items-center justify-center gap-2 flex-row">
                    <Image src={avatar} width={75} height={75} alt={guild.name} />
                    <h1>
                        {guild.name}
                    </h1>
                </div>
            </div>
            <div className="flex justify-center items-center">
                {birthdays.length > 0 ? (
                    <div className="flex flex-col gap-5 items-center">
                        <h2>Birthdays</h2>
                        <div className="flex items-center justify-center flex-col gap-5">
                            
                            {birthdays.map(async (birthday) => {
                                const userData = await fetchUser(birthday.userId);

                                const zodiacSign = getZodiacSign(birthday.month, birthday.day);

                                const birthdayObj = {
                                    month: birthday.month,
                                    day: birthday.day
                                }

                                return <Birthday user={userData} zodiacSign={zodiacSign} birthday={birthdayObj} key={birthday.id} />
                                    // <div key={birthday.id} className="flex flex-col items-center">
                                    //     <h4 className="text-zinc-200">@{userData.username}</h4>
                                    //     <div className="flex flex-row gap-2 items-center">
                                    //         <p className="font-mono font-light text-zinc-500">
                                    //             {birthday.month}/{birthday.day}
                                    //         </p>
                                    //         <span className="font-mono text-lg text-blue-500">
                                    //             {zodiacSign.symbol}
                                    //         </span>
                                    //     </div>
                                    // </div>
                                
                            })}
                        </div>
                    </div>
                ) : "No birthdays yet"}
            </div>
        </div>
    )
}