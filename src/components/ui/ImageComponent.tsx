"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const ImageComponent = (props: {
    image: Omit<ImageProps, "width" | "height" | "alt"> & {
        width: number;
        height: number;
        alt: string;
    },
    className?: string;
}) => {

    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-full flex items-center justify-center">
            {loading && (
                <Skeleton
                    size={{
                        width: props.image.width,
                        height: props.image.height,
                    }}
                />
            )}
            <Image
                {...props.image}
                className={props.className}
                alt={props.image.alt}
                onLoad={() => setLoading(false)}
            />
        </div>
    );
}