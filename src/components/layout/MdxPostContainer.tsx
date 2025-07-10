import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
    children: React.ReactNode;
}


export default function MdxPostContainer({ children, ...props }: Readonly<Props>) {
    return (
        <div className={cn("h-full text-center mx-auto w-full", props.className)} {...props}>
            <div className="flex items-center justify-center w-full">
                {children}
            </div>
        </div>
    );
}