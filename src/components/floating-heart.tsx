"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"
import { getSupabase } from "@/lib/supabase/client"

// Anchor the pendant just outside the right edge of the content column
// (max-w-2xl = 672px, half = 336px); clamp to the viewport on small screens.
const HEART_LEFT = "min(calc(50% + 348px), calc(100% - 48px))"

interface Props {
  slug: string
}

export default function FloatingHeart({ slug }: Props) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const [threadTop, setThreadTop] = useState(0)
  const [threadHeight, setThreadHeight] = useState(0)

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickCount = useRef<number>(0)

  // Trigger the fall-in animation right after first paint
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Load current like count
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

  // Stretch the thread from the banner bottom down to the heart (viewport center)
  useEffect(() => {
    const update = () => {
      const banner = document.getElementById("blog-banner")
      const vh = window.innerHeight
      const top = banner ? Math.max(0, banner.getBoundingClientRect().bottom) : 0
      setThreadTop(top)
      setThreadHeight(Math.max(0, vh / 2 - top))
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const handleLike = useCallback(() => {
    clickCount.current++;

    // Debouncedsync to the API route
    if (saveTimer.current) clearTimeout(saveTimer.current)

    saveTimer.current = setTimeout(() => {
      fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heart: clickCount.current, slug }),
      }).then( () => clickCount.current = 0)
        .catch(err => console.error("Failed to sync likes", err))
    }, 2000)

    setCount(pre => pre + 1);

  }, [slug])

  return (
    <>
      {/* Thread: from the banner bottom down to the heart */}
      <div
        className="pointer-events-none fixed z-40"
        style={{ left: HEART_LEFT, transform: "translateX(-50%)", top: threadTop, height: threadHeight }}
      >
        <div
          className={`mx-auto h-full w-[2px] rounded-full bg-text-secondary/50 ${
            visible ? "animate-thread-grow" : ""
          }`}
          style={{ transformOrigin: "top" }}
        />
      </div>

      {/* Heart button: fixed at viewport center height, right of content */}
      <button
        onClick={handleLike}
        aria-label="Like this post"
        className={`hover:cursor-pointer fixed z-50 flex size-10 items-center justify-center rounded-full border-2 bg-bg-base transition-colors md:size-12 ${
            "border-text-secondary/30 text-text-secondary hover:border-red hover:text-red"
        } ${visible ? "animate-heart-drop" : "opacity-0"}`}
        style={{ left: HEART_LEFT, top: "50%" }}
      >
        <Heart className={`size-5 transition-colors md:size-6`} />
        <span className="absolute -bottom-6 text-xs font-semibold tabular-nums text-text-secondary">{count}</span>
      </button>
    </>
  )
}
