import Container from "@/components/container"
import Header from "@/components/header"
import { getListBlogs } from "@/lib/api"
import Link from "next/link"
import type { IBlog } from "@/lib/types"
import MainLayout from "@/components/layout"

export default async function Home() {
  const blogs: IBlog[] = await getListBlogs()
  return (
    <main>
      <MainLayout>
        <h1>Diving in the web dev</h1>
        <p className="pb-2">Master web development. join my journey</p>
        <hr />

        {blogs &&
          blogs.map(blog => {
            return (
              <Link key={blog.slug} href={`/h/${blog.slug}`}>
                <span>{blog.title}</span>
              </Link>
            )
          })}
      </MainLayout>
    </main>
  )
}
