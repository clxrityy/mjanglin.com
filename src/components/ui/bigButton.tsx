import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef} from "react";
// import { cn } from "@/lib/utils";

interface BigButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof bigButtonVariants> {
    children: React.ReactNode;
}

const bigButtonVariants = cva(
    "inline-flex items-center justify-center font-semibold px-10 py-6 rounded-lg text-xl hover:scale-95 transition-transform focus:ring focus:outline-none focus:ring-offset-2 focus:ring-white disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
                destructive: "bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
                outline: "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
                ghost: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
            },
        }
    }
)

const BigButton = forwardRef<HTMLButtonElement, BigButtonProps>(({ className, variant, children, ...props }, ref) => { 
    return (
        <button
        className={cn(bigButtonVariants({ variant, className }))}
            {...props}
            ref={ref}
        >
            {children}
        </button>
    )
});

BigButton.displayName = "BigButton";

export default BigButton;