"use client";

import { useEffect, useState } from "react";


type Props = {
    text: string;
    delay: number;
}
/**
 * Typewriter animation
 * @param {string} text - The text to animate
 * @param {number} delay - The delay of the animation (ms)
 */


export default function Typewriter({ text, delay }: Props) {

    const [currentText, setCurrentText] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }

    }, [currentIndex, delay, text]);

    return <span className="typewriter">
        {text}
    </span>
}