import { codeToHtml } from "shiki"
interface Props {
  children: React.ReactNode
  href?: string
  className?: string
}
export function MDXCustomLinks({ href, children }: Props) {
  return (
    <a
      target="_blank"
      className="decoration-transparent text-light-text-link dark:text-dark-text-link hover:underline-offset-4 hover:underline hover:decoration-2 transition-all"
      href={href}
    >
      {children}
    </a>
  )
}

export function MDXCustomHeadings({ children }: Props) {
  return <h2 className="mb-2">{children}</h2>
}

export function MDXCustomBoldText({ children }: Props) {
  return <strong className="text-light-text-emphasis dark:text-dark-text-emphasis">{children}</strong>
}

export async function MDXCustomCode({ children, className }: Props) {
  const language = className?.split("-")[1]

  if (!language) {
    return (
      <code className="before:content-none after:content-none bg-code-bg p-1 rounded-md text-text-primary font-semibold">
        {children}
      </code>
    )
  }
  const html = await codeToHtml(children as string, {
    lang: language,
    theme: "gruvbox-dark-hard",
  })
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export async function MDXCustomPre({ children }: Props) {
  return <pre className="text-sm! p-2!">{children}</pre>
}
