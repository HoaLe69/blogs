import path from "path"
import fs from "fs"
import matter from "gray-matter"
import readingTime from "reading-time"
import type { IPost } from "@/lib/types"

const BLOG_PATH = "src/blogs"
const MDX_EXTENSION = ".mdx"

type Frontmatter = {
  title: string
  description: string
  excerpt: string
  publicDate: string
  banner?: string
  tag?: string
  draft: boolean
}

type PostFile = {
  content: string
  data: Frontmatter
  slug: string
}

function blogsDirectory() {
  return path.join(process.cwd(), BLOG_PATH)
}

function readAndParseMarkdown(filePath: string) {
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  return { data: normalizeFrontmatter(data, filePath), content }
}

function assertString(value: unknown, field: string, filePath: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Missing required frontmatter "${field}" in ${filePath}`)
  }

  return value.trim()
}

function normalizeFrontmatter(data: Record<string, unknown>, filePath: string): Frontmatter {
  const title = assertString(data.title, "title", filePath)
  const description = assertString(data.description, "description", filePath)
  const publicDate = assertString(data.publicDate, "publicDate", filePath)
  const date = new Date(publicDate)

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid frontmatter "publicDate" in ${filePath}`)
  }

  return {
    title,
    description,
    publicDate,
    excerpt: typeof data.excerpt === "string" && data.excerpt.trim() ? data.excerpt.trim() : description,
    banner: typeof data.banner === "string" && data.banner.trim() ? data.banner.trim() : undefined,
    tag: typeof data.tag === "string" && data.tag.trim() ? data.tag.trim() : undefined,
    draft: data.draft === true,
  }
}

function getMdxFileNames() {
  return fs.readdirSync(blogsDirectory()).filter(fileName => fileName.endsWith(MDX_EXTENSION))
}

function getSlugFromFileName(fileName: string) {
  return fileName.slice(0, -MDX_EXTENSION.length)
}

function readPostFileBySlug(slug: string): PostFile | null {
  const filePath = path.join(blogsDirectory(), `${slug}${MDX_EXTENSION}`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const { data, content } = readAndParseMarkdown(filePath)
  return { slug, data, content }
}

function toPostSummary(post: PostFile): IPost {
  const stats = readingTime(post.content)

  return {
    slug: post.slug,
    ...post.data,
    minsRead: stats.text,
    wordCount: stats.words,
  }
}

export async function getAllPostSlugs() {
  return getMdxFileNames()
    .map(fileName => readPostFileBySlug(getSlugFromFileName(fileName)))
    .filter((post): post is PostFile => post !== null && !post.data.draft)
    .map(post => post.slug)
}

export async function getListPost(options: { includeDrafts?: boolean } = {}) {
  const posts = getMdxFileNames()
    .map(fileName => readPostFileBySlug(getSlugFromFileName(fileName)))
    .filter((post): post is PostFile => post !== null)
    .filter(post => options.includeDrafts || !post.data.draft)
    .map(toPostSummary)
    .sort((a, b) => new Date(b.publicDate).getTime() - new Date(a.publicDate).getTime())

  return posts
}

export async function getMdxFileBySlug(slug: string) {
  try {
    const post = readPostFileBySlug(slug)
    if (!post || post.data.draft) {
      return null
    }

    const summary = toPostSummary(post)

    return {
      data: summary,
      content: post.content,
      readingTime: summary.minsRead,
      wordCount: summary.wordCount,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
