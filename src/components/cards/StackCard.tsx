import "@/styles/stackcard.css";

export function StackCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="stack-container">
            <div className="stack-card1"></div>
            <div className="stack-card2"></div>
            <div className="stack-card3">
                {children}
            </div>
        </div>
    )
}