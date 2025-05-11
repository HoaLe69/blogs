import { useCallback, useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

const MODES = ["light", "dark"]

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<"light" | "dark" | undefined>(undefined)

  useEffect(() => {
    if (typeof localStorage == undefined) return

    if (!("theme" in localStorage)) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark")
      } else {
        setTheme("light")
      }
    }
    if (localStorage.theme) setTheme(localStorage.theme)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme == "light") {
      root.classList.remove("dark")
    } else {
      root.classList.add("dark")
    }
  }, [theme])

  const handleChange = useCallback(() => {
    const t = theme == "light" ? "dark" : "light"
    setTheme(t)
    localStorage.setItem("theme", t)
  }, [theme])

  return (
    <button onClick={handleChange} className="flex items-center bg-[#bdae93] px-1 py-0.5 rounded-full gap-1">
      {MODES.map(mode => {
        const active = theme == mode
        return (
          <span
            key={mode}
            className={`cursor-pointer ${active && "bg-[#fe8019]"} rounded-full p-1 text-light-text-primary`}
          >
            {mode === "light" ? <Sun /> : <Moon />}
          </span>
        )
      })}
    </button>
  )
}
