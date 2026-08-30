"use client"
import { useEffect, useState } from "react"
import { Terminal } from "lucide-react"
import ThemeToggleButton from "./theme-toggle-button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { isStreaksAuthed } from "@/lib/streaks-auth"

export default function Header() {
  const pathname = usePathname()
  const [showStreaks, setShowStreaks] = useState(false)

  useEffect(() => {
    // Only reveal the Streaks link after the password gate has been passed.
    const check = () => setShowStreaks(isStreaksAuthed())
    check()
    // Re-check on route change (each page navigation re-mounts Header).
    window.addEventListener("storage", check)
    return () => window.removeEventListener("storage", check)
  }, [])

  const classLinks =
    "tracking-wide hover:text-light-text-primary hover:dark:text-dark-text-primary dark:text-dark-text-secondary text-light-text-secondary hover:underline underline-offset-3 decoration-2"
  const classActive = "text-light-text-primary! dark:text-dark-text-primary! underline underline-offset-3 decoration-2"

  return (
    <div className="backdrop-blur-md top-0 mt-12  sticky z-[1000]">
      <div className="max-w-2xl mx-auto px-4">
        <header className="flex py-2 items-center">
          <Link href="/">
            <div className="flex bg-logo-bg items-center gap-2 px-2 py-1 rounded-lg text-white">
              <Terminal size={18} />
              <span className="text-xl font-medium tracking-wider">LeHoa</span>
            </div>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <ul className="flex items-center gap-3">
              <li className={`${classLinks}  ${pathname == "/" && classActive} decoration-orange-500`}>
                <Link href="/">Blogs</Link>
              </li>
              {showStreaks && (
                <li className={`${classLinks} ${pathname == "/streaks" && classActive} decoration-purple-600`}>
                  <Link href="/streaks">Streaks</Link>
                </li>
              )}
              <li className={`${classLinks} ${pathname == "/about-le" && classActive} decoration-green-600`}>
                <Link href="/about-le">About</Link>
              </li>
            </ul>
            <ThemeToggleButton />
          </div>
        </header>
      </div>
    </div>
  )
}
