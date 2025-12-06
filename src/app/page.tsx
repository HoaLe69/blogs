import { getListPost } from "@/lib/api"
import Divider from "@/components/divider"
import Container from "@/components/container"
import Header from "@/components/header"
import Banner from "@/components/banner"
import Footer from "@/components/footer"
import BlogList from "@/components/blog-list"

export default async function Home() {
  const blogs = await getListPost()

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
        <BlogList initialBlogs={blogs} />
      </Container>
      <Footer />
    </>
  )
}
