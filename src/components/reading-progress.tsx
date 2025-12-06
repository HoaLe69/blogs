"use client"

import { useEffect, useState } from "react"

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrollPercent = (scrollTop / docHeight) * 100
            setProgress(scrollPercent)
        }

        window.addEventListener("scroll", updateProgress)
        updateProgress() // Initial calculation

        return () => window.removeEventListener("scroll", updateProgress)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-bg2 z-[1001]">
            <div
                className="h-full bg-button-bg-toggle transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}
