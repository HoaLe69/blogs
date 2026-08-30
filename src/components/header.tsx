"use client"
import { useEffect, useState, useCallback } from "react"
import { Terminal, Menu, X } from "lucide-react"
import ThemeToggleButton from "./theme-toggle-button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { isStreaksAuthed } from "@/lib/streaks-auth"

export default function Header() {
  const pathname = usePathname()
  const [showStreaks, setShowStreaks] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Only reveal the Streaks link after the password gate has been passed.
    const check = () => setShowStreaks(isStreaksAuthed())
    check()
    // Re-check on route change (each page navigation re-mounts Header).
    window.addEventListener("storage", check)
    return () => window.removeEventListener("storage", check)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const classLinks =
    "tracking-wide hover:text-light-text-primary hover:dark:text-dark-text-primary dark:text-dark-text-secondary text-light-text-secondary hover:underline underline-offset-3 decoration-2"
  const classActive = "text-light-text-primary! dark:text-dark-text-primary! underline underline-offset-3 decoration-2"

  return (
    <div className="backdrop-blur-md top-0 mt-12 sticky z-[1000]">
      <div className="max-w-2xl mx-auto px-4">
        <header className="flex py-2 items-center">
          <Link href="/" onClick={closeMenu}>
            <div className="flex bg-logo-bg items-center gap-2 px-2 py-1 rounded-lg text-white">
              <Terminal size={18} />
              <span className="text-xl font-medium tracking-wider">LeHoa</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="ml-auto flex items-center gap-4">
            <ul className="hidden md:flex items-center gap-3">
              <li className={`${classLinks} ${pathname == "/" && classActive} decoration-orange-500`}>
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
            <div className="hidden md:block">
              <ThemeToggleButton />
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="md:hidden p-1 text-text-secondary hover:text-text-primary transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden border-t border-text-secondary/10 bg-bg-base/95 backdrop-blur-md">
          <nav className="max-w-2xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              href="/"
              className={`${classLinks} ${pathname == "/" && classActive} decoration-orange-500 py-1`}
              onClick={closeMenu}
            >
              Blogs
            </Link>
            {showStreaks && (
              <Link
                href="/streaks"
                className={`${classLinks} ${pathname == "/streaks" && classActive} decoration-purple-600 py-1`}
                onClick={closeMenu}
              >
                Streaks
              </Link>
            )}
            <Link
              href="/about-le"
              className={`${classLinks} ${pathname == "/about-le" && classActive} decoration-green-600 py-1`}
              onClick={closeMenu}
            >
              About
            </Link>
            <div className="pt-2 border-t border-text-secondary/10">
              <ThemeToggleButton />
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
