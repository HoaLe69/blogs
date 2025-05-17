import { getMdxFileBySlug } from "@/lib/api"
import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"
import Container from "@/components/container"
import { notFound } from "next/navigation"
import { MDXCustomLinks, MDXCustomBoldText, MDXCustomCode, MDXCustomPre } from "@/components/mdx"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BannerDetailBlog from "@/components/banner-detail-blog"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getMdxFileBySlug(slug)

  // add more information for strong SEO in the future
  return {
    title: post?.data.title,
    description: post?.data.description,
    keywords: post?.data.tag,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const mdxFile = await getMdxFileBySlug(slug)
  if (!mdxFile) return notFound()

  const components = {
    a: MDXCustomLinks,
    strong: MDXCustomBoldText,
    code: MDXCustomCode,
    pre: MDXCustomPre,
  }

  const { data, content } = mdxFile

  const _renderBlogBanner = () => {
    if (!data.banner) return null
    return (
      <div className="w-full mt-4">
        <div className="w-full h-[320px] overflow-hidden">
          <Image
            className="w-full h-full object-cover rounded-xl"
            src={data.banner}
            alt={data.title}
            width={640}
            height={204}
          />
        </div>
      </div>
    )
  }

  return (
    <main>
      <Header />
      <BannerDetailBlog {...data} />
      <Container>
        {_renderBlogBanner()}
        <article className="prose lg:prose-lg dark:prose-invert py-8 prose-hr:mt-4 prose-hr:mb-3 max-w-none prose-headings:mt-4 prose-headings:mb-2 prose-headings:text-headings">
          <MDXRemote source={content} components={components} />
        </article>
      </Container>
      <Footer />
    </main>
  )
}
