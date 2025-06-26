"use client";

import { useRouter, useParams } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export function BackBtn() {
    const router = useRouter();
    const { id } = useParams();

    const handleBack = () => {
        if (id?.length) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className="fixed top-0 left-0 px-3 py-4 z-50 hover:scale-110 transition-transform ease-linear rounded-full text-white/80 focus:text-blue-500 cursor-pointer"
            aria-label="back"
        >
            <MdArrowBack size={30} className="relative z-50" />
        </button>
    );
}