"use client"

import { useCallback, useEffect, useState, type FormEvent } from "react"
import { getSupabase } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"

type Comment = Database["public"]["Tables"]["comments"]["Row"]

interface Props {
  slug: string
}

export default function Comments({ slug }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Fetch comments
  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) return

    let active = true
    supabase
      .from("comments")
      .select("*")
      .eq("post_slug", slug)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (active && data) setComments(data)
      })
    return () => { active = false }
  }, [slug])

  // Subscribe to realtime inserts
  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) return

    const channel = supabase
      .channel(`comments:${slug}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments", filter: `post_slug=eq.${slug}` },
        (payload) => {
          setComments(prev => [payload.new as Comment, ...prev])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [slug])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) {
      setError("Please fill in both name and comment.")
      return
    }

    const supabase = getSupabase()
    if (!supabase) {
      setError("Supabase is not configured.")
      return
    }

    setSubmitting(true)
    setError("")

    const { error: insertError } = await supabase.from("comments").insert({
      post_slug: slug,
      name: name.trim(),
      content: content.trim(),
    })

    if (insertError) {
      setError("Failed to post comment. Please try again.")
      setSubmitting(false)
      return
    }

    // Reset form (realtime subscription will pick up the new comment)
    setName("")
    setContent("")
    setSubmitting(false)
  }, [slug, name, content])

  return (
    <section id="comments" className="mt-12 border-t border-text-secondary/20 pt-8">
      <h2 className="text-xl font-semibold mb-6">Comments ({comments.length})</h2>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-lg border border-text-secondary/30 bg-transparent px-4 py-2 text-sm outline-none focus:border-green transition-colors"
          />
        </div>
        <div>
          <textarea
            placeholder="Write a comment..."
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full rounded-lg border border-text-secondary/30 bg-transparent px-4 py-2 text-sm outline-none focus:border-green transition-colors resize-none"
          />
        </div>
        {error && <p className="text-sm text-red">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-green px-6 py-2 text-sm font-medium text-bg0 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* Comment list */}
      <div className="space-y-6">
        {comments.length === 0 && (
          <p className="text-sm text-text-secondary">No comments yet — be the first!</p>
        )}
        {comments.map(c => (
          <div
            key={c.id}
            className="rounded-lg border border-text-secondary/20 bg-bg1/40 px-5 py-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold">{c.name}</span>
              <span className="text-xs text-text-secondary">
                {new Date(c.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{c.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
