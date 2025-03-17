import MainLayout from "@/components/layout"
import { getMdxFileBySlug } from "@/lib/api"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const mdxFile = await getMdxFileBySlug(slug)
  if (!mdxFile) return notFound()

  const components = {
    //
  }

  const { content } = mdxFile

  return (
    <MainLayout>
      <article>
        <MDXRemote source={content} />
      </article>
    </MainLayout>
  )
}
