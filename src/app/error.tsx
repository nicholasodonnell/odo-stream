'use client'

export type ErrorProps = {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps): React.ReactNode {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-4 text-center">
      <h1 className="font-brand text-3xl">Something went wrong</h1>
      <pre className="mx-auto max-w-4xl whitespace-pre-wrap">
        {error.message}
      </pre>
      <button
        className="rounded-full border border-white px-4 py-2 font-bold transition-colors hover:bg-white hover:text-black"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  )
}
