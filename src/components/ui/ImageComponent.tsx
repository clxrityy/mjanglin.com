"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const ImageComponent = (props: {
    image: Omit<ImageProps, "width" | "height"> & {
        width: number;
        height: number;
    },
    className?: string;
}) => {

    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-full h-full">
            {loading && (
                <Skeleton
                    size={{
                        width: props.image.width,
                        height: props.image.height,
                    }}
                />
            )}
            <Image
                className={props.className}
                {...props.image}
                onLoadingComplete={() => setLoading(false)}
            />
        </div>
    );
}