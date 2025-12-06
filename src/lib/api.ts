import path from "path"
import fs from "fs"
import matter from "gray-matter"
import readingTime from "reading-time"

const BLOG_PATH = "src/blogs"

function blogsDirectory() {
  const blogsPath = path.join(process.cwd(), BLOG_PATH)
  return blogsPath
}

function readAndParseMarkdown(filePath: string) {
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  return { data, content }
}

export async function getListPost() {
  const paths = blogsDirectory()
  const fileNames = fs.readdirSync(paths)

  const blogs = fileNames.map(fileName => {
    const filePath = path.join(paths, fileName)
    const { data, content } = readAndParseMarkdown(filePath)
    const stats = readingTime(content)

    return {
      slug: fileName.replace(".mdx", ""),
      title: data.title,
      banner: data.banner,
      publicDate: data.publicDate,
      minsRead: stats.text, // Auto-calculated reading time
      tag: data.tag,
    }
  })
  return blogs
}

export async function getMdxFileBySlug(slug: string) {
  try {
    const filePath = path.join(process.cwd(), BLOG_PATH, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) {
      return null
    }
    const result = readAndParseMarkdown(filePath)
    const stats = readingTime(result.content)

    return {
      ...result,
      readingTime: stats.text,
      wordCount: stats.words,
    }
  } catch (error) {
    console.log(error)
  }
}
