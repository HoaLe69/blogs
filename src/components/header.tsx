"use client"
import { Terminal } from "lucide-react"
import ThemeToggleButton from "./theme-toggle-button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  const classLinks =
    "tracking-wide hover:text-light-text-primary hover:dark:text-dark-text-primary dark:text-dark-text-secondary text-light-text-secondary hover:underline underline-offset-3 decoration-2"
  const classActive = "text-light-text-primary! dark:text-dark-text-primary! underline underline-offset-3 decoration-2"

  return (
    <div className="backdrop-blur-md top-0 mt-12  sticky z-[1000]">
      <div className="max-w-2xl mx-auto px-4">
        <header className="flex py-2 items-center">
          <div className="bg-logo-bg flex items-center gap-2 px-2 py-1 rounded-lg text-white">
            <Terminal size={18} />
            <span className="text-xl font-medium tracking-wider">LeHoa</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <ul className="flex items-center gap-3">
              <li className={`${classLinks}  ${pathname == "/" && classActive} decoration-orange-500`}>
                <Link href="/">Home</Link>
              </li>
              <li className={`${classLinks} ${pathname == "/about" && classActive} decoration-green-600`}>
                <Link href="/about">About</Link>
              </li>
            </ul>
            <ThemeToggleButton />
          </div>
        </header>
      </div>
    </div>
  )
}
