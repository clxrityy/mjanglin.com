"use client";

export default function Error({ error, reset }: { error: Error, reset: () => void }) { 
    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Error</h1>
            <pre className="text-red-500 text-sm">{error.message}</pre>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}