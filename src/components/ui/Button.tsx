import { ComponentProps } from "react";

type ButtonProps = {
    children: React.ReactNode;
} & ComponentProps<"button">;

export default function Button({children, ...props}: ButtonProps) {

    return <button {...props} className="bg-gradient-to-r from-white to-zinc-200 text-black px-4 py-3 font-bold rounded-md focus:outline-none focus:ring-4 focus:ring-offset-2 ring-blue-400 transition-all shadow hover:scale-95 hover:rounded-xl">
        {children}
    </button>
}