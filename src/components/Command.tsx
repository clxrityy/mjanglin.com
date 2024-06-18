import { CommandData } from "@/types/interactions"

type Props = {
    data: CommandData;
}

export default function Command({ data, ...props }: Props) {

    return (
        <div {...props} className="flex flex-col items-center justify-center bg-gradient-to-r from-zinc-800/60 to-zinc-700/50 px-4 py-2 rounded-md shadow-inner border border-zinc-300/60 gap-5">
            <div className="flex flex-col items-center gap-2">
                <pre className="text-lg bg-zinc-950/70 px-1 py-1 rounded-md">
                    /{data.name}
                </pre>
                <p className="text-sm">
                    {data.description}
                </p>
            </div>

            <table className="table-auto space-y-4 px-2 py-2">
                <thead className="">
                    <tr className="border-b-2 border-white/50">
                        <th className="text-xs font-semibold uppercase">type</th>
                        <th className="text-xs font-semibold uppercase">id</th>
                        {data.options && (
                            <th className="text-xs font-semibold uppercase">options</th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-zinc-900 rounded-md">
                    <tr className="space-x-4">
                        <td>
                            {data.type}
                        </td>
                        <td className="text-xs">
                            {data.id}
                        </td>
                        {data.options && (
                            <td className="text-sm flex items-center flex-col">
                                <ul className="gap-2 space-y-2">
                                    {data.options.map((option, i) => (
                                        <li key={i} className={`font-mono flex flex-col gap-2 ${option.required ? "text-red-500" : "text-cyan-500"}`}>
                                            <div className="flex flex-row items-center justify-between gap-5">
                                                <span>
                                                    {option.name}
                                                </span>
                                                <span className="text-zinc-300 text-xs">
                                                    {option.description}
                                                </span>
                                            </div>
                                            {option.options && (
                                                <ul className="gap-2 flex flex-row text-xs border-t border-white/75 pt-2 text-default">
                                                    {option.options.map((subOption, j) => (
                                                        <li key={j} className="font-mono space-x-3 flex flex-col space-y-2">
                                                            <span className={`${subOption.required ? "text-red-500" : "text-cyan-700"}`}>
                                                                {subOption.name}
                                                            </span>
                                                            <span className="text-xs text-zinc-400 font-light">
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
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}