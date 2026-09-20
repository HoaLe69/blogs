# Added a stronger MDX content system.

  Changed files:

  - src/lib/api.ts
      - Added typed frontmatter normalization.
      - Validates required fields: title, description, publicDate.
      - Supports optional excerpt, banner, tag.
      - Supports draft: true filtering.
      - Adds sorted post listing by newest publicDate.
      - Adds getAllPostSlugs() for static blog route generation.
      - Adds reading time and word count to normalized post data.

  - src/lib/types.ts
      - Expanded IPost with:
          - description
          - excerpt
          - draft
          - wordCount

  - src/app/blogs/[slug]/page.tsx
      - Added generateStaticParams() using published MDX slugs. #faster 

  - src/components/card.tsx
      - Displays post excerpt under the title.

  - src/components/blog-list.tsx
      - Search now matches title, excerpt, and tag.

  - src/app/rss.xml/route.ts
      - RSS item descriptions now use excerpt instead of repeating the title.

  - src/blogs/*.mdx
      - Added excerpt. (brief description about the blog)
      - Added explicit draft: false.