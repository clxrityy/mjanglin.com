'use client';
import { ScreenSize } from "@/util/types";
import { useEffect, useState } from "react";



export function useScreenSize(base: number) {

    const [dimensions, setDimensions] = useState<ScreenSize>({
        width: base,
        height: base,
    });
    const [size, setSize] = useState<number>(base);

    useEffect(() => {


        function handleResize() {
            setDimensions({
                width: innerWidth,
                height: innerHeight,
            });

            if (dimensions.width <= 640) {
                setSize(base * 0.76);
            } else if (dimensions.width <= 768 && dimensions.width > 640) {
                setSize(base);
            } else if (dimensions.width <= 1024 && dimensions.width > 768) {
                setSize(base * 0.96);
            } else if (dimensions.width <= 1280 && dimensions.width > 1024) {
                setSize(base * 1.43);
            } else if (dimensions.width <= 1536 && dimensions.width > 1280) {
                setSize(base * 1.6);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, [dimensions, base]);

    return size;
}