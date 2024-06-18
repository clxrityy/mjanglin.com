"use client";

import { CommandData } from "@/types/interactions";
import { ChangeEvent, useState } from "react";
import SearchList from "./SearchList";
import Scroll from "../ui/Scroll";
import Command from "../Command";

export default function Search({ commands }: { commands: CommandData[] }) {
    const [searchField, setSearchField] = useState<string>("");

    const filteredCommands = commands.filter(command => {
        return (
            command.name.toLowerCase().includes(searchField.toLowerCase()) ||
            command.description.toLowerCase().includes(searchField.toLowerCase())
        );
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchField(e.target.value);
    }

    function searchList() {
        return (
            <Scroll>
                <SearchList commands={filteredCommands} />
            </Scroll>
        )
    }

    return (
        <section className="gap-5 flex flex-col items-center">
            <div className="flex items-center justify-center flex-col xl:flex-row gap-3 xl:justify-between">
                <h2 className="text-center">
                    Search for a command
                </h2>
                <div className="flex flex-col items-center gap-1 justify-center">
                    <p className="uppercase font-bold text-zinc-400">
                        Options / paramaters:
                    </p>
                    <pre className="flex flex-col gap-2 items-center uppercase text-base mx-auto">

                        <span className="text-red-500">
                            required*
                        </span>
                        <span className="text-cyan-500">
                            optional*
                        </span>
                    </pre>
                </div>
            </div>
            <div className="py-2 mx-auto max-w-sm w-full">
                <input
                    type="text"
                    placeholder="Search for a command"
                    className="w-full px-2 py-2 rounded-md border border-zinc-300/60"
                    onChange={handleChange}
                />
            </div>
            {searchList()}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {commands.map((command) => {

                    if (command.name.includes(searchField) || command.name.includes(searchField) || command.options?.map((option) => option.name).includes(searchField) || command.options?.map((option) => option.name).includes(searchField)) {
                        return (
                            <Command key={command.id} data={command} />
                        )
                    } else if (searchField === "") {
                        return (
                            <Command key={command.id} data={command} />
                        )
                    } else if (!command.name.includes(searchField) || !command.name.includes(searchField)) {
                        return (
                            <div key={command.id} />
                        )
                    }

                })}
            </div>
        </section>
    )
}

