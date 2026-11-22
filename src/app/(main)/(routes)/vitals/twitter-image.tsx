import { renderVitalsImage } from "@/lib/vitals-image";

export const alt =
	"Vitals for mjanglin.com: Core Web Vitals, Lighthouse score and server pulse";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
	return renderVitalsImage();
}
