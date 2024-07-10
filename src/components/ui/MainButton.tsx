import { ComponentProps } from "react";

type ButtonProps = {
    children: React.ReactNode;
    color?: "primary" | "secondary" | "tertiary" | "danger";
} & ComponentProps<"button">;

export default function MainButton({ children, color, ...props }: ButtonProps) {
    
    let buttonColor = "bg-gradient-to-r from-white to-zinc-200 text-black";

    if (color) {
        switch (color) {
            case "primary":
                break;
            case "secondary":
                buttonColor = "bg-gradient-to-r from-black to-gray-800 text-white";
                break;
            case "tertiary":
                buttonColor = "bg-transparent text-white border border-white";
                break;
            case "danger":
                buttonColor = "bg-gradient-to-r from-red-400 to-red-600 text-white";
                break;
        }
    }

    return <button {...props} className={`${buttonColor} px-4 py-3 font-bold rounded-md focus:outline-none focus:ring-4 focus:ring-offset-2 ring-blue-400 transition-all shadow hover:scale-95 hover:rounded-xl box-shadow-btn`}>
        {children}
    </button>
}