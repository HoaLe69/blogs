"use client"

import { Heart } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { getSupabase } from "@/lib/supabase/client"

interface Props {
  slug: string
}

export default function HeartButton({ slug }: Props) {
  const [count, setCount] = useState<number>(0)
  const [beating, setBeating] = useState(false)

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) return

    let active = true
    supabase
      .from("post_likes")
      .select("count")
      .eq("post_slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        if (active && data) setCount(data.count ?? 0)
      })
    return () => {
      active = false
    }
  }, [slug])

  const handleLike = useCallback(async () => {
    const supabase = getSupabase()
    if (!supabase) return

    // Optimistic increment
    setCount(c => c + 1)
    // Trigger heartbeat animation
    setBeating(true)
    window.setTimeout(() => setBeating(false), 800)

    const { data, error } = await supabase
      .from("post_likes")
      .select("count")
      .eq("post_slug", slug)
      .maybeSingle()

    if (error) {
      setCount(c => c - 1)
      return
    }

    if (data) {
      // Row exists -> increment
      const { error: updateError } = await supabase
        .from("post_likes")
        .update({ count: (data.count ?? 0) + 1 })
        .eq("post_slug", slug)
      if (updateError) setCount(c => c - 1)
    } else {
      // Row missing -> insert
      const { error: insertError } = await supabase
        .from("post_likes")
        .insert({ post_slug: slug, count: 1 })
      if (insertError) setCount(c => c - 1)
    }
  }, [slug])

  return (
    <button
      onClick={handleLike}
      aria-label="Like this post"
      className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        beating ? "border-red bg-red/10 text-red" : "border-text-secondary/30 hover:border-red hover:text-red"
      }`}
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          beating ? "heartbeat-once fill-red text-red" : "group-hover:text-red"
        }`}
      />
      <span>{count}</span>
    </button>
  )
}
