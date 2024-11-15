import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
    children: React.ReactNode;
}


export function MdxPostContainer({children, ...props}: Props) {
    return (
        <div className={cn("w-screen h-full text-center", props.className)} {...props}>
            <div className="flex items-center justify-center flex-col gap-4 w-full mx-auto">
                <div className="max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}