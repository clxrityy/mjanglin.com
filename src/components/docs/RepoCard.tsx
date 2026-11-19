import { FaGithub } from "react-icons/fa";
import { HiOutlineStar } from "react-icons/hi";
import { VscRepoForked } from "react-icons/vsc";

type Repo = {
	full_name: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
};

async function getRepo(repo: string): Promise<Repo | null> {
	try {
		const res = await fetch(`https://api.github.com/repos/${repo}`, {
			headers: { Accept: "application/vnd.github+json" },
			next: { revalidate: 86_400 },
		});
		return res.ok ? ((await res.json()) as Repo) : null;
	} catch {
		return null;
	}
}

type Props = {
	/** "owner/name" */
	repo: string;
	/** Shown instead of (or when GitHub doesn't return) the repo description. */
	description?: string;
};

/** GitHub repository card. Falls back to a plain link if the API is unavailable. */
export async function RepoCard({ repo, description }: Readonly<Props>) {
	const data = await getRepo(repo);
	const text = description ?? data?.description;

	return (
		<a
			href={`https://github.com/${repo}`}
			target="_blank"
			rel="noopener noreferrer"
			className="repo-card"
		>
			<span className="repo-card-name">
				<FaGithub aria-hidden size={16} />
				{repo}
			</span>
			{text && <span className="repo-card-description">{text}</span>}
			{data && (
				<span className="repo-card-meta">
					{data.language && <span>{data.language}</span>}
					<span>
						<HiOutlineStar aria-hidden size={13} />
						{data.stargazers_count}
					</span>
					<span>
						<VscRepoForked aria-hidden size={13} />
						{data.forks_count}
					</span>
				</span>
			)}
		</a>
	);
}
