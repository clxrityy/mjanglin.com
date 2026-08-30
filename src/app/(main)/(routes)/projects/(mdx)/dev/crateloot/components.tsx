import { ImageComponent } from "@/components/ui/ImageComponent";
import { r2AssetPath } from "@/utils/assets";
import Link from "next/link";

export function CrateLootImage() {
	return (
		<ImageComponent
			image={{
				src: r2AssetPath("assets/crateloot-crate-example.png"),
				alt: "CrateLoot",
				width: 2366,
				height: 848,
				className: "rounded-md w-auto h-auto",
				unoptimized: true,
				placeholder: "blur",
				blurDataURL: r2AssetPath("assets/blur-loading-img.png"),
			}}
		/>
	)
}

export function CrateLootHeader() {
	return (
		<div className="flex flex-col items-center justify-center gap-2 w-full">
			<header className="flex flex-row items-center gap-3 w-fit">
				<h1 className="text-4xl font-bold text-center">CrateLoot</h1>
				<ImageComponent
					image={{
						src: r2AssetPath("assets/crateloot.png"),
						alt: "CrateLoot",
						width: 64,
						height: 64,
						className: "rounded-md",
						unoptimized: true,
						placeholder: "blur",
						blurDataURL: r2AssetPath("assets/blur-loading-img.png"),
					}}
				/>
			</header>
			<div className="w-full flex flex-col lg:flex-row items-start justify-center gap-2">
				<SupportedVersions />
				<SupportedPlugins />
			</div>
			<code>
				Compatible with versions <b>1.19.2+</b>
			</code>
		</div>
	)
}

export function SupportedVersions() {
	return (
		<div className="flex flex-col items-center justify-center gap-2 w-full">
			<div className="w-fit">
				<h3 className="font-semibold">Supported <b>native</b> versions:</h3>
				<table className="w-2/3 border border-gray-300 rounded-md overflow-hidden">
					<thead className="">
						<tr className="">
							<th>Version</th>
							<th>Java</th>
						</tr>
					</thead>
					<tbody className="text-center">
						<tr>
							<td><code>1.19.2</code></td>
							<td>Java 17</td>
						</tr>
						<tr>
							<td><code>1.21.8</code></td>
							<td>Java 21</td>
						</tr>
						<tr>
							<td><code>26.2</code></td>
							<td>Java 25</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export function SupportedPlugins() {
	return (
		<div className="flex flex-col items-center justify-center gap-2 w-full">
			<div className="w-fit">
				<h3 className="font-semibold">Included plugin support:</h3>
				<ul className="list-disc list-inside">
					<li>
						<a href="https://www.spigotmc.org/resources/towny.72694/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
							Towny
						</a>
					</li>
					<li>
						<a href="https://www.spigotmc.org/resources/vault.34315/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
							Vault
						</a>
					</li>
					<li>
						<a href="https://www.spigotmc.org/resources/nuvotifier.13449/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
							NuVotifier
						</a>
					</li>
					<li>
						<a href="https://www.spigotmc.org/resources/votifier.13449/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
							Votifier
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export function CrateLootCommands() {
	return (
		<div className="flex flex-col items-center justify-center gap-2 w-full">
			<div className="w-full">
				<table className="w-5/7 md:w-6/7 lg:w-2/3 border border-gray-300 rounded-md overflow-auto text-xs lg:text-sm xl:text-base">
					<thead className="">
						<tr className="">
							<th>Command</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody className="text-start">
						<tr>
							<td><code>/crateloot compat</code></td>
							<td>Displays the plugin's compatibility report</td>
						</tr>
						<tr>
							<td><code>/crateloot status</code></td>
							<td>Displays the plugin's status report</td>
						</tr>
						<tr>
							<td><code>/crateloot reload</code></td>
							<td>Reloads the plugin's configurations</td>
						</tr>
						<tr>
							<td>
								<code>
									/crateloot bind
								</code>
							</td>
							<td>
								Binds a crate to the container you're facing.
							</td>
						</tr>
						<tr>
							<td>
								<code>
									/crateloot unbind
								</code>
							</td>
							<td>
								Unbinds the crate you're facing.
							</td>
						</tr>
						<tr>
							<td>
								<code>
									/crateloot key
								</code>
							</td>
							<td>
								<table className="w-full border border-gray-300 rounded-md overflow-hidden">
									<tbody className="text-sm">
										<tr>
											<td><code>create [id]</code></td>
											<td>Create a key with the item in hand</td>
										</tr>
										<tr>
											<td><code>name [id] [display-name...]</code></td>
											<td>Set the display name of a key</td>
										</tr>
										<tr>
											<td><code>lore [id] [line1|line2|line3]</code></td>
											<td>Set the lore of a key</td>
										</tr>
										<tr>
											<td><code>give [player] [id] [amount]</code></td>
											<td>Gives a player a crate key(s)</td>
										</tr>
										<tr>
											<td><code>info [id]</code></td>
											<td>Displays information about a key</td>
										</tr>
										<tr>
											<td><code>delete [id]</code></td>
											<td>Deletes a key</td>
										</tr>
										<tr>
											<td><code>list</code></td>
											<td>Lists all keys</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export function CrateLootDownload() {
	return (
		<div className="flex flex-col items-center justify-center gap-2 w-full">
			<Link href={r2AssetPath("assets/CrateLoot-0.4.0.jar")} download>
				<button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
					CrateLoot-0.4.0.jar
				</button>
			</Link>
		</div>
	)
}

export function CrateLootStatusImage() {
	return (
		<ImageComponent
			image={{
				src: r2AssetPath("assets/crateloot-status.png"),
				alt: "CrateLoot Status",
				width: 2220,
				height: 764,
				className: "rounded-sm w-auto h-auto",
				unoptimized: true,
				placeholder: "blur",
				blurDataURL: r2AssetPath("assets/blur-loading-img.png"),
			}}
		/>
	);
}