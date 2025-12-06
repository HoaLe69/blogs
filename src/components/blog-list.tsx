"use client"

import type { IPost } from "@/lib/types"
import Card from "@/components/card"
import { Newspaper } from "lucide-react"
import SearchBar from "@/components/search-bar"
import { useState } from "react"

interface BlogListProps {
    initialBlogs: IPost[]
}

export default function BlogList({ initialBlogs }: BlogListProps) {
    const [filteredBlogs, setFilteredBlogs] = useState<IPost[]>(initialBlogs)
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        if (!query.trim()) {
            setFilteredBlogs(initialBlogs)
            return
        }

        const lowercaseQuery = query.toLowerCase()
        const filtered = initialBlogs.filter(
            blog =>
                blog.title.toLowerCase().includes(lowercaseQuery) || blog.tag?.toLowerCase().includes(lowercaseQuery)
        )
        setFilteredBlogs(filtered)
    }

    return (
        <>
            <div className="pt-4">
                <SearchBar onSearch={handleSearch} placeholder="Search by title or tag..." />
            </div>
            {filteredBlogs.length > 0 ? (
                <div className="flex flex-wrap justify-between">
                    {filteredBlogs.map(blog => {
                        return <Card key={blog.slug} {...blog} />
                    })}
                </div>
            ) : searchQuery ? (
                <div className="flex flex-col items-center py-12 text-text-secondary">
                    <Newspaper size={100} />
                    <span className="text-text-secondary font-medium mt-4">No posts found for &quot;{searchQuery}&quot;</span>
                    <button
                        onClick={() => handleSearch("")}
                        className="mt-4 px-4 py-2 bg-button-bg-toggle text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Clear search
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center py-12 text-text-secondary">
                    <Newspaper size={100} />
                    <span className="text-text-secondary font-medium mt-4">The author has no posts yet.</span>
                </div>
            )}
        </>
    )
}
