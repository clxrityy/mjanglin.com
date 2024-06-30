import { Nunito, Roboto } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], preload: true, variable: "--font-nunito" });
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"], preload: true, variable: "--font-roboto" });

export const FONTS = {
    nunito,
    roboto
}