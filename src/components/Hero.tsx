import { IMAGES } from "@/config";
import "@/styles/css/hero.css";
import Image from "next/image";
import { SocialsMenu } from "./layout/SocialsMenu";
import { exo } from "@/styles/fonts";
import { COMPONENT_SIZES } from "@/utils/constants";

export function HeroCard() {
    return (
        <div className={`e-card playing z-20 overflow-x-clip ${exo.className}`}>
            <div className="image"></div>

            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>

            <div className="infotop">
                <Image
                    src={IMAGES.LOGO}
                    alt="logo"
                    width={COMPONENT_SIZES.HERO_ICON.width}
                    height={COMPONENT_SIZES.HERO_ICON.height}
                    className="icon filter drop-shadow bg-blend-overlay mix-blend-darken"
                    priority
                />
                <p className="font-bold">
                    Developer & Creator
                </p>
                <div className="name">mjanglin</div>
            </div>
            <SocialsMenu />
        </div>
    );
}