"use client";

import { useEffect, useState } from "react";
import { DeleteModal } from "../modals/Delete";

type Props = {
    userId: string;
}

export default function ModalProvider({ userId }: Props) {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <DeleteModal userId={userId} />
        </>
    )
}