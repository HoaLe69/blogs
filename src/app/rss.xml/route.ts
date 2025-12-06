import { getListPost } from "@/lib/api"

function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
}

export async function GET() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const blogs = await getListPost()

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lee Hoa Blog</title>
    <link>${siteUrl}</link>
    <description>A blog about learning, sharing, and exploring knowledge in technology, programming, and software development.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${blogs
            .map(
                blog => `
    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${siteUrl}/blogs/${blog.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blogs/${blog.slug}</guid>
      <pubDate>${new Date(blog.publicDate).toUTCString()}</pubDate>
      <description>${escapeXml(blog.title)}</description>
      ${blog.tag ? `<category>${escapeXml(blog.tag)}</category>` : ""}
    </item>`
            )
            .join("")}
  </channel>
</rss>`

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
    })
}
