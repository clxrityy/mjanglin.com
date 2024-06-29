import { fetchUserAvatar } from "@/data/util/functions/user";
import Image from "next/image";
import Link from "next/link";

type Props = {
    userId: string;
}

export default async function UserIcon({ userId }: Props) { 
    const avatar = await fetchUserAvatar(userId);

    return (
        <div className="relative">
            <Link href={`/profile/${userId}`} className="cursor-pointer">
                <Image src={avatar} alt="User Avatar" width={25} height={25} className="w-14 h-14 rounded-full absolute top-0 right-0 px-2 py-2 hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-offset-1" unoptimized />
            </Link>
        </div>
    )
}