export type IPost = {
  title: string
  slug: string
  banner?: string
  publicDate: string
  minsRead?: string
  tag?: string
}

export type IPostLC = IPost & {
  time: string
  difficult: string
  topic: string
}
