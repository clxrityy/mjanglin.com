import Image from "next/image";
import { urlFor } from "../lib/image";
import { getImageDimensions } from "@sanity/asset-utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function SanityImageComponent({ value }: { value: any }) {
    const imageUrl = urlFor(value).fit("min").url();

    const { width, height } = getImageDimensions(value);

    return (
        <div className="w-full h-fit flex items-center justify-center">
            <Image unoptimized width={width} height={height / 4} src={imageUrl} alt={value.assetId} className="rounded-sm w-fit h-fit max-w-screen-lg" loading="lazy" style={{
                maxWidth: "50%",
                height: "auto"
            }}
            />
        </div>
    )
}