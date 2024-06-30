import { CommandData } from "@/types/interactions";

type Props = {
    data: CommandData;
}

export default function Command({ data, ...props }: Props) {

    return (
        <div {...props} className="command flex flex-col items-center justify-center bg-gradient-to-r from-zinc-800/60 to-zinc-700/50 px-4 py-2 rounded-md shadow-lg gap-5">
            <div className="flex flex-col items-center gap-2">
                <div className="flex flex-row justify-stretch items-center gap-10">
                <pre className="text-xl bg-zinc-950/70 px-1 py-1 rounded-md">
                    /{data.name}
                    </pre>
                    <pre className="hidden md:flex text-xs bg-zinc-800 text-zinc-400 rounded-md px-1 py-1">
                        {data.id}
                    </pre>
                </div>
                <div className="bg-zinc-950/60 rounded-md px-4 py-2 flex flex-col gap-3 items-center justify-center w-full">
                    <p className="text-zinc-200 text-lg font-semibold max-w-sm text-center">
                        {data.description}
                    </p>
                </div>
            </div>
            {data.options && (<table className="space-y-4 mx-10 py-2 rounded-xl shadow-lg w-full flex items-center flex-col bg-zinc-900/75">
                {/* <thead className="">
                    <tr className="border-b-2 border-white/25">
                        <th className="text-xs font-semibold uppercase">type</th>
                        <th className="text-xs font-semibold uppercase">id</th>
                        {data.options && (
                            <th className="text-xs font-semibold uppercase">options</th>
                        )}
                    </tr>
                </thead> */}
                <tbody className="">
                    <tr className="space-x-4 h-auto">
                        
                        <td className="text-base flex items-center flex-col">
                            <ul className="gap-2 space-y-2">
                                {data.options.map((option, i) => (
                                    <li key={i} className={`flex flex-col gap-2 ${option.required ? "text-red-500" : "text-cyan-500"}`}>
                                        <div className="flex flex-col items-center justify-between gap-5">
                                            <span className="font-bold --font-roboto tracking-wide">
                                                {option.name}
                                            </span>
                                            <span className="text-zinc-300 text-sm">
                                                {option.description}
                                            </span>
                                        </div>
                                        {option.options && (
                                            <ul className="gap-2 grid grid-cols-1 lg:grid-cols-2 text-base border-t border-white/60 pt-2 text-default items-center justify-center pl-2">
                                                {option.options.map((subOption, j) => (
                                                    <li key={j} className="space-x-3 flex flex-col space-y-2">
                                                        <span className={`${subOption.required ? "text-red-500" : "text-purple-500 font-semibold --font-roboto tracking-wider"}`}>
                                                            {subOption.name}
                                                        </span>
                                                        <span className="text-[0.85rem] text-zinc-300 font-light">
                                                            {subOption.description}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>

                                        )}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        
                    </tr>
                </tbody>
            </table>)}
        </div>
    )
}