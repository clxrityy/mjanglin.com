import { LocationGlobe } from "@/components/weather/LocationGlobe";
import { SkyScene } from "@/components/weather/SkyScene";
import { SunPanel } from "@/components/weather/SunPanel";
import {
	DetailsPanel,
	GlobeCaption,
	HourlyPanel,
	NowPanel,
} from "@/components/weather/WeatherPanels";
import { type Condition, type Phase, skyFor } from "@/lib/sky";
import { getForecast, resolvePlace } from "@/lib/weather";
import { exo } from "@/styles/fonts";

/** Development only: preview any sky with ?wx=rain&phase=day */
const PREVIEW_CODES: Record<Condition, number> = {
	clear: 0,
	partly: 2,
	cloudy: 3,
	fog: 45,
	drizzle: 53,
	rain: 63,
	snow: 73,
	storm: 95,
};

function previewTime(
	phase: string | undefined,
	sunrise: number,
	sunset: number,
) {
	const at: Partial<Record<Phase, number>> = {
		dawn: sunrise,
		day: sunrise + (sunset - sunrise) * 0.4,
		golden: sunset - 65 * 60,
		dusk: sunset,
		night: sunset + 4 * 3600,
	};
	return at[phase as Phase];
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ wx?: string; phase?: string }>;
}) {
	const place = await resolvePlace();
	const preview =
		process.env.NODE_ENV === "development" ? await searchParams : {};
	const previewCode = PREVIEW_CODES[preview.wx as Condition];
	const real = place ? await getForecast(place) : null;
	const weather =
		real && previewCode !== undefined
			? {
					...real,
					current: {
						...real.current,
						code: previewCode,
						isDay: preview.phase !== "night",
					},
				}
			: real;

	// Colour the whole page by the sky over the location; neutral night if we can't tell.
	const now = Math.floor(Date.now() / 1000);
	const sunrise = weather?.today.sunrise ?? now + 3600;
	const sunset = weather?.today.sunset ?? now + 7200;
	const sky = skyFor({
		code: weather?.current.code ?? 2,
		now: previewTime(preview.phase, sunrise, sunset) ?? now,
		sunrise,
		sunset,
	});

	const vars = {
		"--sky-top": sky.colors.top,
		"--sky-mid": sky.colors.mid,
		"--sky-glow": sky.colors.glow,
		"--sky-accent": sky.colors.accent,
	} as React.CSSProperties;

	return (
		<div className={`wx ${exo.className}`} style={vars}>
			<SkyScene
				condition={sky.condition}
				phase={sky.phase}
				intensity={sky.intensity}
				daylight={sky.daylight}
				cloudCover={weather?.current.cloudCover ?? 40}
				windSpeed={weather?.current.windSpeed ?? 0}
			/>

			<div className="wx-grid">
				{place && weather ? (
					<>
						<div
							className="wx-area-now rise-in"
							style={{ "--i": 0 } as React.CSSProperties}
						>
							<NowPanel place={place} weather={weather} sky={sky} />
						</div>
						<div
							className="wx-area-globe rise-in"
							style={{ "--i": 1 } as React.CSSProperties}
						>
							<section
								className="wx-panel wx-globe glass"
								aria-label="Location"
							>
								<div className="wx-radiance" aria-hidden="true" />
								<LocationGlobe
									lat={place.lat}
									lon={place.lon}
									label={`${place.city}, ${place.country}`}
								/>
								<GlobeCaption place={place} />
							</section>
						</div>
						<div
							className="wx-area-sun rise-in"
							style={{ "--i": 2 } as React.CSSProperties}
						>
							<SunPanel
								timezone={weather.timezone}
								sunrise={weather.today.sunrise}
								sunset={weather.today.sunset}
								nextSunrise={weather.nextSunrise}
							/>
						</div>
						<div
							className="wx-area-info rise-in"
							style={{ "--i": 3 } as React.CSSProperties}
						>
							<DetailsPanel weather={weather} />
						</div>
						<div
							className="wx-area-hours rise-in"
							style={{ "--i": 4 } as React.CSSProperties}
						>
							<HourlyPanel weather={weather} />
						</div>
					</>
				) : (
					<section className="wx-panel wx-empty glass rise-in">
						<p className="wx-eyebrow">Weather</p>
						<h1 className="wx-place">
							{place ? "The forecast is unavailable" : "Couldn't find you"}
						</h1>
						<p className="wx-sub">
							{place
								? `No word from the sky over ${place.city} right now. Try again in a bit.`
								: "Your location couldn't be worked out from this connection."}
						</p>
					</section>
				)}
			</div>
		</div>
	);
}
