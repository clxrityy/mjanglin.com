import { CONFIG } from "@/config";
import { parseUser } from "@/utils/user";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = parseUser();

    if (!user) {
        return redirect(CONFIG.OAUTH2_INVITE_URL);
    }

    return (
        <main>
            <div className="flex items-center justify-center flex-col gap-10">
                <h1>hbd</h1>
                <div className="flex items-center justify-center flex-col gap-2">
                    <h3>
                        Welcome, {user.username}!
                    </h3>
                    <Image src={user.avatar!} alt="avatar" width={100} height={100} />
                </div>
            </div>
        </main>
    )
}