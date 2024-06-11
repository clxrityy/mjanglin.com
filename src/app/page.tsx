import { CONFIG } from "@/config";
import { parseUser } from "@/utils/user";
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

                </div>
            </div>
        </main>
    )
}