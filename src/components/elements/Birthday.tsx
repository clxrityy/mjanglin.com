import { fetchUserAvatar } from "@/data/util/functions/user";
import { Sign } from "@/data/util/resources/signs";
import { OAuth2UserResponse } from "@/types/auth";
import Image from "next/image";


type Props = {
    user: OAuth2UserResponse;
    zodiacSign: Sign;
    birthday: { month: number, day: number };
}

export default async function Birthday({ user, zodiacSign, birthday }: Props) {

    const avatar = await fetchUserAvatar(user.id);

    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();

    function isTodayBirthday() {
        if (currentMonth === birthday.month && currentDay === birthday.day) { 
            return true;
        }
        return false;
    }


    return (
        <div className="flex flex-col gap-5 items-center h-full">
            <div className="flex justify-center items-center flex-col gap-3">
                <div className="flex items-center justify-center gap-2 flex-row">
                    <Image src={avatar || "https://cdn.discordapp.com/embed/avatars/0.png"} width={75} height={75} alt={user.username} className="rounded-full" />
                    <h4 className="text-blue-500 font-semibold">
                        @{user.username} {
                        isTodayBirthday() && (
                            <span>
                                🎉
                            </span>
                        )
                    }
                    </h4>
                    
                </div>

            </div>
            <div className="flex flex-row gap-2 items-center bg-zinc-800 px-2 py-1 rounded-md">
                <p className="text-xl font-mono text-zinc-400">
                    {birthday.month}/{birthday.day}
                </p>
                <p className={`font-mono text-2xl font-extrabold px-2 rounded-full`}>
                    {zodiacSign.symbol}
                </p>
            </div>
            <hr className="border w-full border-white/30 my-5" />
        </div>
    )
}