"use client";

import { useState } from "react";
import BigButton from "../ui/bigButton";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Reload() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleReload = () => {
        setIsLoading(true);
        router.refresh();
        return () => {
            setIsLoading(false);
        }
    }

    return <BigButton onClick={handleReload} variant={"outline"}>{isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Reload" }</BigButton>;
}