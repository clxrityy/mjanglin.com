import { DM_Sans, Exo } from "next/font/google";

const exo = Exo({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	preload: true,
	variable: "--font-exo",
});

/** Soft, readable sans for readouts (/vitals, /weather, the time card) */
const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	preload: true,
	variable: "--font-soft",
});

export { dmSans, exo };
