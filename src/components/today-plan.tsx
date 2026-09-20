"use client"

import { useCallback, useEffect, useState } from "react"
import { getSupabase } from "@/lib/supabase/client"
import { Flame, Clock, CheckCircle2, Plus, Headphones, Mic, PenLine, BookOpen, Terminal, CalendarDays, BookMarked } from "lucide-react"

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

const GOAL_HOURS = 8

/** Local YYYY-MM-DD key, e.g. "2025-06-18". */
function toDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function formatHours(h: number): string {
  return Number.isInteger(h) ? `${h}` : h.toFixed(1)
}

type SkillId =
  | "listening"
  | "speaking"
  | "writing"
  | "reading"
  | "devops"
  | "ielts-review"
  | "devops-review"

interface Block {
  id: SkillId
  hours: number
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SKILL_META: Record<SkillId, { label: string; icon: typeof Flame; ielts: boolean }> = {
  listening: { label: "Listening", icon: Headphones, ielts: true },
  speaking: { label: "Speaking", icon: Mic, ielts: true },
  writing: { label: "Writing", icon: PenLine, ielts: true },
  reading: { label: "Reading", icon: BookOpen, ielts: true },
  devops: { label: "DevOps", icon: Terminal, ielts: false },
  "ielts-review": { label: "IELTS Review", icon: BookMarked, ielts: true },
  "devops-review": { label: "DevOps Review", icon: BookMarked, ielts: false },
}

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

/** ISO weekday 1=Mon … 7=Sun → day plan. */
const DAY_PLAN: Record<number, Block[]> = {
  // Mon (1), Wed (3), Fri (5) → Listening + Speaking + DevOps
  1: [
    { id: "listening", hours: 2 },
    { id: "speaking", hours: 2 },
    { id: "devops", hours: 4 },
  ],
  2: [
    { id: "reading", hours: 2 },
    { id: "writing", hours: 2 },
    { id: "devops", hours: 4 },
  ],
  3: [
    { id: "listening", hours: 2 },
    { id: "speaking", hours: 2 },
    { id: "devops", hours: 4 },
  ],
  4: [
    { id: "reading", hours: 2 },
    { id: "writing", hours: 2 },
    { id: "devops", hours: 4 },
  ],
  5: [
    { id: "listening", hours: 2 },
    { id: "speaking", hours: 2 },
    { id: "devops", hours: 4 },
  ],
  6: [
    { id: "reading", hours: 2 },
    { id: "writing", hours: 2 },
    { id: "devops", hours: 4 },
  ],
  7: [
    { id: "ielts-review", hours: 4 },
    { id: "devops-review", hours: 4 },
  ],
}

const TAGLINES: Record<number, string> = {
  1: "Listening & Speaking focus — plus DevOps.",
  2: "Reading & Writing focus — plus DevOps.",
  3: "Listening & Speaking focus — plus DevOps.",
  4: "Reading & Writing focus — plus DevOps.",
  5: "Listening & Speaking focus — plus DevOps.",
  6: "Reading & Writing focus — plus DevOps.",
  7: "Revision day — consolidate this week's learning.",
}

/** Convert JS getDay() (0=Sun) to ISO weekday (1=Mon). */
function toISOWeekday(d: number): number {
  return ((d + 6) % 7) + 1
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function TodayPlan() {
  const [now] = useState(() => new Date())
  const isoWeekday = toISOWeekday(now.getDay())
  const blocks = DAY_PLAN[isoWeekday] ?? DAY_PLAN[1]
  const totalHours = blocks.reduce((sum, b) => sum + b.hours, 0)

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(now)

  const dateKey = toDateKey(now)

  // ── Studied-time tracker (Supabase) ────────────────────
  const [studied, setStudied] = useState(0)
  const [studiedLoading, setStudiedLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [studiedError, setStudiedError] = useState("")

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) {
      setStudiedLoading(false)
      return
    }
    let active = true
    supabase
      .from("study_hours")
      .select("total_hours")
      .eq("date", dateKey)
      .maybeSingle()
      .then(
        ({ data }) => {
          if (active) {
            setStudied(data?.total_hours ?? 0)
            setStudiedLoading(false)
          }
        },
        () => {
          if (active) setStudiedLoading(false)
        }
      )
    return () => {
      active = false
    }
  }, [dateKey])

  const addHours = useCallback(
    async (inc: number) => {
      const supabase = getSupabase()
      if (!supabase) return
      if (syncing || studied >= GOAL_HOURS) return

      setSyncing(true)
      setStudiedError("")

      // Optimistic update
      setStudied(prev => Math.min(GOAL_HOURS, +(prev + inc).toFixed(6)))

      const { data, error: fetchErr } = await supabase
        .from("study_hours")
        .select("total_hours")
        .eq("date", dateKey)
        .maybeSingle()

      if (fetchErr) {
        setStudied(prev => Math.max(0, prev - inc))
        setStudiedError("Couldn't save — try again.")
        setSyncing(false)
        return
      }

      const next = Math.min(GOAL_HOURS, +((data?.total_hours ?? 0) + inc).toFixed(6))
      const result = data
        ? await supabase
            .from("study_hours")
            .update({ total_hours: next })
            .eq("date", dateKey)
        : await supabase
            .from("study_hours")
            .insert({ date: dateKey, total_hours: next })

      if (result.error) {
        setStudied(prev => Math.max(0, prev - inc))
        setStudiedError("Couldn't save — try again.")
      }
      setSyncing(false)
    },
    [dateKey, syncing, studied]
  )

  return (
    <>
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <h1 className="flex items-center gap-2.5 text-3xl font-bold">
            <span className="p-2 rounded-xl bg-text-emphasis/15">
              <Flame size={24} className="text-text-emphasis" />
            </span>
            Today
          </h1>
          <span className="flex items-center gap-1.5 text-sm text-text-secondary bg-text-secondary/10 px-3 py-1 rounded-full">
            <CalendarDays size={14} />
            {dateLabel}
          </span>
        </div>
        <p className="text-text-secondary text-sm">{TAGLINES[isoWeekday]}</p>
      </div>

      {/* ── Week strip ───────────────────────────────────────── */}
      <div className="grid grid-cols-7 gap-1.5 mb-6">
        {WEEKDAY_LABELS.map((label, i) => {
          const iso = i + 1
          const isToday = iso === isoWeekday
          return (
            <div
              key={label}
              className={`text-center py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isToday
                  ? "bg-text-emphasis/15 text-text-emphasis font-semibold ring-1 ring-text-emphasis/30"
                  : "bg-text-secondary/10 text-text-secondary"
              }`}
            >
              {label}
            </div>
          )
        })}
      </div>

      {/* ── Blocks card ─────────────────────────────────────── */}
      <div className="rounded-2xl bg-text-secondary/10 p-4 sm:p-5">
        {blocks.map((b, i) => {
          const meta = SKILL_META[b.id]
          const Icon = meta.icon
          const isIelts = meta.ielts
          return (
            <div
              key={b.id}
              className={`flex items-center gap-3 py-3 ${
                i > 0 ? "border-t border-text-secondary/15" : ""
              }`}
            >
              <span
                className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isIelts ? "bg-text-emphasis/15 text-text-emphasis" : "bg-text-link/15 text-text-link"
                }`}
              >
                <Icon size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <span className="font-medium text-sm">{meta.label}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── 8h allocation bar ───────────────────────────────── */}
      <div className="mt-5">

        <div className="flex items-center gap-4 mt-2 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-text-emphasis" />
              IELTS 
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-text-link" />
              DevOps  
            </span>
          <span className="ml-auto font-medium">{totalHours}h committed</span>
        </div>
      </div>

      {/* ── Studied today ─────────────────────────────────── */}
      <div
        className={`mt-8 rounded-2xl bg-text-secondary/10 p-4 sm:p-5 transition-opacity ${
          studiedLoading ? "opacity-60" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Clock size={16} className="text-text-secondary" />
            Studied today
          </span>
          <span className="text-sm font-bold">
            {formatHours(studied)}
            <span className="text-text-secondary font-normal"> / {GOAL_HOURS}h</span>
          </span>
        </div>

        <div className="h-3 rounded-full overflow-hidden bg-text-secondary/10">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              studied >= GOAL_HOURS ? "bg-headings" : "bg-text-emphasis"
            }`}
            style={{ width: `${Math.min(100, (studied / GOAL_HOURS) * 100)}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <button
            onClick={() => addHours(0.5)}
            disabled={syncing || studied >= GOAL_HOURS}
            className="inline-flex items-center gap-1 rounded-full bg-text-link/15 px-3 py-1.5 text-xs font-medium text-text-link transition-colors hover:bg-text-link/25 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={14} /> 0.5h
          </button>
          <button
            onClick={() => addHours(1)}
            disabled={syncing || studied >= GOAL_HOURS}
            className="inline-flex items-center gap-1 rounded-full bg-text-link/15 px-3 py-1.5 text-xs font-medium text-text-link transition-colors hover:bg-text-link/25 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={14} /> 1h
          </button>
          {studied >= GOAL_HOURS && !studiedLoading && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-headings">
              <CheckCircle2 size={14} /> Goal reached — nice work!
            </span>
          )}
          {studiedError && <span className="text-xs text-[var(--red)]">{studiedError}</span>}
        </div>
      </div>
    </>
  )
}
