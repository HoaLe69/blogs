export type IPost = {
  title: string
  slug: string
  description: string
  excerpt: string
  banner?: string
  publicDate: string
  minsRead?: string
  tag?: string
  draft: boolean
  wordCount?: number
}

export type IPostLC = IPost & {
  time: string
  difficult: string
  topic: string
}
