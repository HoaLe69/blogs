import Link from "next/link"
import { Dot, MoveRight } from "lucide-react"
import { tags } from "@/lib/const"

interface Props {
  title: string
  banner?: string
  slug: string
  publicDate: string
  minsRead?: string
  tag?: string
}

export default function Card(props: Props) {
  const { title, slug, publicDate, minsRead, tag } = props

  return (
    <div className="w-full mb-8 group">
      <h2 className="text-xl font-medium mt-2 mb-1 truncate text-wrap">{title}</h2>
      <div className="flex items-center text-text-secondary">
        <span>{publicDate}</span>
        <Dot />
        <span>{minsRead}</span>
        {tag && <span className={`tag ${tags[tag]}`}>{tag}</span>}
      </div>
      <Link
        href={`/blogs/${slug}`}
        className="opacity-100 lg:opacity-0 flex md:hover:cursor-pointer md:hover:underline md:underline-offset-4 md:decoration-2 md:group-hover:animate-fade-in items-center gap-1 mt-1 text-text-secondary"
      >
        <MoveRight />
        <span className="text-text-secondary">Read more</span>
      </Link>
    </div>
  )
}
