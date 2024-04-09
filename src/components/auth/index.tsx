"use client";
import authenticate from "@/util/authenticate";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ComponentPropsWithRef, useState } from "react";

type Props = ComponentPropsWithRef<"form">;

export default function Auth({ ...props }: Props) {
    
    const [credentials, setCredentials] = useState<string>("");

    const router = useRouter();

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) { 
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const credentialsData = formData.get("credentials") as string || credentials;

        const response = authenticate(credentialsData);

        if (response) {
            router.push(`/admin/${credentialsData}`);
        } else {
            alert("Incorrect credentials");
        }
    }


    return <form {...props} onSubmit={onSubmit} className="w-full flex items-center h-full justify-center max-w-md">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center h-full gap-3">
            <input name="credentials" id="credentials" type="password" className="w-full bg-transparent border border-white/50 rounded-md text-white py-2 px-2" required />
            <Button isIconOnly type="submit" className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white font-semibold tracking-wider w-2/3">Login</Button>
        </div>
    </form>
}