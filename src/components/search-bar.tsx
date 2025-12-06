"use client"

import { Search, X } from "lucide-react"
import { useState } from "react"

interface SearchBarProps {
    onSearch: (query: string) => void
    placeholder?: string
}

export default function SearchBar({ onSearch, placeholder = "Search posts..." }: SearchBarProps) {
    const [query, setQuery] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        onSearch(value)
    }

    const handleClear = () => {
        setQuery("")
        onSearch("")
    }

    return (
        <div className="relative w-full mb-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full pl-11 pr-10 py-3 rounded-lg border-2 border-bg2 bg-bg-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-emphasis transition-colors"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>
        </div>
    )
}
