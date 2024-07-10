import { CommandData } from "@/types/interactions";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../ui/Card";

type Props = {
    data: CommandData;
}

export default function Command({ data, ...props }: Props) {

    return (
        <Card {...props} className="box-shadow-box">
            <CardHeader>
                <CardTitle>
                    <h3 className="font-mono bg-zinc-800 px-2 py-1 rounded-md w-fit hover:underline underline-offset-4 focus:text-blue-500 text-2xl">/{data.name} </h3>
                </CardTitle>
                <CardDescription>
                    {data.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {data.options && (
                    <table className="w-full">
                        <tbody className="text-zinc-300">
                            {data.options.map((option, i) => (
                                <tr key={i} className="border rounded-lg border-zinc-600 hover:bg-slate-700/40 transition-colors hover:border-zinc-400 hover:rounded-xl hover:shadow">
                                    <td className="px-4 py-3 shadow-md">
                                        <ul>
                                            <li className="flex flex-col gap-4">
                                                <div className="flex flex-row gap-2 items-center text-lg">
                                                    <pre className={`font-semibold ${option.required ? "text-red-500" : "text-cyan-500"}`}>{option.name}</pre>
                                                    <span>{option.description}</span>
                                                </div>
                                                {option.options && (
                                                    <ul className="indent-5">
                                                        {option.options.map((subOption, j) => (
                                                            <li key={j} className="flex flex-row gap-2 items-center">
                                                                <span className={`font-semibold ${option.required ? "text-red-500" : "text-purple-400"}`}>{subOption.name}</span>
                                                                <span>{subOption.description}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </CardContent>
            <CardFooter>
                <pre className="text-xs">
                    {data.id}
                </pre>
            </CardFooter>
        </Card>
    );
}