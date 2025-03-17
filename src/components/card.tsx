import Image from "next/image"
import Link from "next/link"

interface Props {
  title: string
  banner: string
  slug: string
  publicDate: string
  minsRead: string
}

export default function Card({ title, banner, slug, publicDate, minsRead }: Props) {
  return (
    <div className="md:w-[calc(50%-0.5rem)] md:first:w-full w-full mb-4">
      {banner && (
        <div className="w-full h-52 rounded-xl overflow-hidden">
          <Image className="w-full h-full object-cover" width={640} height={204} src={banner} alt={title} />
        </div>
      )}
      <Link key={slug} href={`/h/${slug}`}>
        <h2 className="text-xl font-bold mt-2 mb-1 hover:underline truncate">{title}</h2>
      </Link>
      <div className="flex items-center gap-2">
        <span className="dark:text-dark-text-secondary text-light-text-secondary">{publicDate}</span>
        <span className="dark:text-dark-text-secondary text-light-text-secondary">{minsRead}</span>
      </div>
    </div>
  )
}
