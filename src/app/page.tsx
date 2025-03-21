import { getListBlogs } from "@/lib/api"
import type { IBlog } from "@/lib/types"
import MainLayout from "@/components/layout"
import Divider from "@/components/divider"
import Card from "@/components/card"
import { Newspaper } from "lucide-react"

export default async function Home() {
  const blogs: IBlog[] = await getListBlogs()
  return (
    <main>
      <MainLayout>
        <div className="mb-9">
          <h1 className="font-bold text-3xl! mb-2!">
            Write down your <strong className="text-text-emphasis">Experiences</strong>,{" "}
            <strong className="text-text-emphasis">Thought</strong> <br /> are the best way to learn.
          </h1>
          <span className="text-text-secondary">That&apos;s Why this blogs was born.</span>
        </div>
        <Divider />
        {blogs.length > 0 ? (
          <div className="flex flex-wrap justify-between pt-4">
            {blogs.map(blog => {
              return <Card key={blog.slug} {...blog} />
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center py-12 text-text-secondary">
            <Newspaper size={100} />
            <span className="text-text-secondary font-medium mt-4">The author has no posts yet.</span>
          </div>
        )}
      </MainLayout>
    </main>
  )
}
