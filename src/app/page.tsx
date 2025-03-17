import { getListBlogs } from "@/lib/api"
import type { IBlog } from "@/lib/types"
import MainLayout from "@/components/layout"
import Card from "@/components/card"

export default async function Home() {
  const blogs: IBlog[] = await getListBlogs()
  return (
    <main>
      <MainLayout>
        <h1 className="font-bold text-4xl">Diving in the web dev</h1>
        <p className="pb-2">Master web development. join my journey</p>
        <hr />
        <div className="flex flex-wrap justify-between pt-4">
          {blogs.map(blog => {
            return <Card key={blog.slug} {...blog} />
          })}
        </div>
      </MainLayout>
    </main>
  )
}
