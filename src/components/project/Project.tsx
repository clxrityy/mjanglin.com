import { projectSchema } from "@/util/objects";
import { ComponentProps } from "react";
import { z } from "zod";

type Props = {
    project: z.infer<typeof projectSchema>;
} & ComponentProps<"div">;

export default function Project({ project, ...props }: Props) {

    const color = project.color;

    return (
        <div {...props} style={{ backgroundColor: color }} className="w-full">
            {project.title}
        </div>
    )
}