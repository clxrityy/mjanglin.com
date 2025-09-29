import { cn } from "@/lib/cn";
import { ComponentProps } from "react";


interface Props extends ComponentProps<"div"> {
    gray?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
    opacity?: number;
    size?: {
        width: number | string;
        height: number | string;
    }
}


export const Skeleton = ({ gray, opacity, size, ...props }: Props) => {

    const { width, height } = size || { width: "100%", height: "100%" };

    const style = {
        opacity,
        ...props.style,
    }

    const bgGrayClass = gray ? `bg-gray-[${gray}]` : "bg-gray-500";
    const widthClass = `w-[${width}]`;
    const heightClass = `h-[${height}]`;
    const className = cn(
        bgGrayClass,
        "rounded-xl",
        "animate-pulse",
        widthClass,
        heightClass,
        props.className
    );

    return (
        <div style={style} className={className} />
    )
}