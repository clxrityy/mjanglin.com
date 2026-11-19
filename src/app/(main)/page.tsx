import { DescriptionCard } from "@/components/cards/DescriptionCard";
import { MiniMusicCard, MusicCard } from "@/components/cards/MusicCard";
import { MiniTimeCard, TimeCard } from "@/components/cards/TimeCard";
import { ProjectDashboard } from "@/components/dashboard/ProjectDashboard";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { HeroCard } from "@/components/Hero";
import { FitScript } from "@/components/home/Fit";
import { HomeShell } from "@/components/home/HomeShell";
import { projects } from "@/config";
import { shuffleArray } from "@/utils/randomize";

export const revalidate = 3600;

export default async function Page() {
	// Server picks the opening order (refreshed with ISR); the dashboard shuffles the rest client-side.
	const orderedProjects = shuffleArray(projects);

	return (
		<>
			{/* Without JavaScript the page can't measure itself, so let it scroll normally. */}
			<noscript>
				<style>{`.home{height:auto!important;overflow:visible!important}.fit-inner{opacity:1!important;--fit-scale:1!important}.rise-in{animation:none!important}`}</style>
			</noscript>
			<HomeShell
				hero={<HeroCard />}
				time={
					<ErrorBoundary>
						<TimeCard />
					</ErrorBoundary>
				}
				music={<MusicCard />}
				miniTime={<MiniTimeCard />}
				miniMusic={<MiniMusicCard />}
				about={<DescriptionCard />}
				projects={
					<ErrorBoundary>
						<ProjectDashboard projects={orderedProjects} />
					</ErrorBoundary>
				}
			/>
			<FitScript />
		</>
	);
}
