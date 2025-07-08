"use client";

export default function SomeError({ error, reset }: Readonly<{ error: Error, reset: () => void }>) {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Error</h1>
            <pre className="text-red-500 text-sm">{error.message}</pre>
            <button type="button" onClick={() => reset()}>Try again</button>
        </div>
    )
}