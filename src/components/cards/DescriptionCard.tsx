import "@/styles/css/description-card.css";
import { exo } from "@/styles/fonts";
import { ReadMore } from "./ReadMore";
import { ImageComponent } from "../ui/ImageComponent";

export function DescriptionCard() {
    return (
        /* From Uiverse.io by gharsh11032000 */
        <div className={`desc-card ${exo.className} font-medium text-base grayscale-[50%]`}>
            <div className="content">
                <ImageComponent
                    image={{
                        src: "/apple-touch-icon.png",
                        alt: "logo",
                        width: 100,
                        height: 100,
                        className: "grayscale brightness-200",
                        priority: true
                    }}
                />
                <ul className="para gap-2 flex flex-col items-center justify-center w-full">
                    <li>
                        Network specialist who loves to code and create.
                    </li>
                    <li>
                        I build websites and applications that interact with the world.
                    </li>
                </ul>
                <div className="w-full flex items-center justify-center">
                    <ReadMore>
                        <span className="sr-only">
                            Read more
                        </span>
                    </ReadMore>
                </div>
            </div>
        </div>

    )
}