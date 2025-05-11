import { getListPost } from "@/lib/api"
import type { IPost } from "@/lib/types"
import Divider from "@/components/divider"
import Card from "@/components/card"
import { Newspaper } from "lucide-react"
import Container from "@/components/container"
import Header from "@/components/header"
import Banner from "@/components/banner"
import Footer from "@/components/footer"

export default async function Home() {
  const blogs: IPost[] = await getListPost()
  return (
    <>
      <Header />
      <Banner />
      <Container>
        <div className="mb-9">
          <h1 className="font-bold text-3xl mb-2">
            Write down your <strong className="text-text-emphasis">Experiences</strong>,{" "}
            <strong className="text-text-emphasis">Thought</strong> <br /> are the best way to learn.
          </h1>
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
      </Container>
      <Footer />
    </>
  )
}
