import { CommandData } from "@/types/interactions";
import { Card } from "@nextui-org/react";

type Props = {
    commands: CommandData[];
}

function SearchList({ commands }: Props) { 
    const filtered = commands.map(command => <Card key={command.id} />);

    return (
        <div>
            {filtered}
        </div>
    )
}

export default SearchList;