import { IMAGES } from "@/config";
import "@/styles/css/hero.css";
import Image from "next/image";
import { SocialsMenu } from "./layout/SocialsMenu";
import { exo } from "@/styles/fonts";

export function HeroCard() {
    return (
        <div className={`e-card playing z-20 ${exo.className}`}>
            <div className="image"></div>

            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>


            <div className="infotop">
                <Image src={IMAGES.LOGO} alt="logo" width={100} height={100} className="icon filter drop-shadow bg-blend-overlay mix-blend-darken" />
                <p className="font-bold">
                    Developer & Creator
                </p>
                <div className="name">mjanglin</div>
            </div>
            <SocialsMenu />
        </div>
    );
}