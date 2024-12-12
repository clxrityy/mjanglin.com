import { Exo } from "next/font/google";

const exo = Exo({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    preload: true,
    variable: "--font-exo"
})


export {
    exo
}