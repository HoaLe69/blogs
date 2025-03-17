import path from "path"
import fs from "fs"
import matter from "gray-matter"

function blogsDirectory() {
  const blogsPath = path.join(process.cwd(), "src/blogs")
  return blogsPath
}

function readAndParseMarkdown(filePath: string) {
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  return { data, content }
}

export async function getListBlogs() {
  const paths = blogsDirectory()
  const fileNames = fs.readdirSync(paths)

  const blogs = fileNames.map(fileName => {
    const filePath = path.join(paths, fileName)
    const { data } = readAndParseMarkdown(filePath)
    return {
      slug: fileName.replace(".mdx", ""),
      title: data.title,
    }
  })
  return blogs
}

export async function getMdxFileBySlug(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "src/blogs", `${slug}.mdx`)
    if (!fs.existsSync(filePath)) {
      return null
    }
    return readAndParseMarkdown(filePath)
  } catch (error) {
    console.log(error)
  }
}
