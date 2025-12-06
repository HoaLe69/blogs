import { MetadataRoute } from "next"
import { getListPost } from "@/lib/api"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const blogs = await getListPost()

    const blogEntries: MetadataRoute.Sitemap = blogs.map(blog => ({
        url: `${siteUrl}/blogs/${blog.slug}`,
        lastModified: new Date(blog.publicDate),
        changeFrequency: "monthly",
        priority: 0.8,
    }))

    return [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${siteUrl}/about-le`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        ...blogEntries,
    ]
}
