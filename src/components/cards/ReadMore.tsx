"use client";

import "@/styles/css/readmore.css";
import { COLORS } from "@/config";
import { useRouter } from "next/navigation";

export function ReadMore({ children }: { children: React.ReactNode }) {

    const router = useRouter();

    return (
        /* From Uiverse.io by vinodjangid07 */
        <button className="readmore-btn focus:ring ring-offset-1" onClick={() => router.push("/about")} aria-label="about">
            <span className="book-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={COLORS.primary_blue}
                    viewBox="0 0 126 75"
                    className="book"
                >
                    <rect
                        strokeWidth="3"
                        stroke="#fff"
                        rx="7.5"
                        height="70"
                        width="121"
                        y="2.5"
                        x="2.5"
                    ></rect>
                    <line strokeWidth="3" stroke="#fff" y2="75" x2="63.5" x1="63.5"></line>
                    <path
                        strokeLinecap="round"
                        strokeWidth="4"
                        stroke="#fff"
                        d="M25 20H50"
                    ></path>
                    <path
                        strokeLinecap="round"
                        strokeWidth="4"
                        stroke="#fff"
                        d="M101 20H76"
                    ></path>
                    <path
                        strokeLinecap="round"
                        strokeWidth="4"
                        stroke="#fff"
                        d="M16 30L50 30"
                    ></path>
                    <path
                        strokeLinecap="round"
                        strokeWidth="4"
                        stroke="#fff"
                        d="M110 30L76 30"
                    ></path>
                </svg>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 65 75"
                    className="book-page"
                >
                    <path
                        strokeLinecap="round"
                        strokeWidth="4"
                        stroke="#fff"
                        d="M40 20H15"
                    ></path>
                    <path
                        strokeLinecap="round"
                        strokeWidth="4"
                        stroke="#fff"
                        d="M49 30L15 30"
                    ></path>
                    <path
                        strokeWidth="3"
                        stroke="#fff"
                        d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"
                    ></path>
                </svg>
            </span>
            <span className="text">{children}</span>
        </button>

    )

}