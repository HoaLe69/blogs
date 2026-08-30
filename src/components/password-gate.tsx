"use client"

import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"
import { isStreaksAuthed, setStreaksAuthed } from "@/lib/streaks-auth"

// Password comes from the build-time env var (set in .env.local / hosting dashboard).
const PASSWORD = process.env.NEXT_PUBLIC_STREAKS_PASSWORD || "streaks"

interface Props {
  children: ReactNode
}

export default function PasswordGate({ children }: Props) {
  const [ready, setReady] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [showPw, setShowPw] = useState(false)

  // Read the flag client-side only, to avoid SSR/hydration mismatch.
  useEffect(() => {
    setAuthed(isStreaksAuthed())
    setReady(true)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input === PASSWORD) {
      setStreaksAuthed()
      setAuthed(true)
      setError("")
    } else {
      setError("Incorrect password.")
      setInput("")
    }
  }

  if (!ready) return null
  if (authed) return <>{children}</>

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="mb-4 p-3 rounded-2xl bg-text-secondary/10">
        <Lock size={28} className="text-text-secondary" />
      </span>
      <h2 className="text-lg font-semibold mb-1">Private page</h2>
      <p className="text-sm text-text-secondary mb-6">Enter the password to continue.</p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            value={input}
            onChange={e => {
              setInput(e.target.value)
              setError("")
            }}
            placeholder="Password"
            autoFocus
            className="w-full rounded-lg border border-text-secondary/30 bg-transparent px-4 py-2.5 pr-10 text-sm outline-none focus:border-text-emphasis transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPw(v => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {error && <p className="text-xs text-[var(--red)]">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-lg bg-text-emphasis py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 cursor-pointer"
        >
          Enter
        </button>
      </form>
    </div>
  )
}