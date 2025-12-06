import Link from "next/link"
import { Home, Search, FileQuestion } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Container from "@/components/container"

export default function NotFound() {
    return (
        <>
            <Header />
            <Container>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-12">
                    <FileQuestion size={120} className="text-text-secondary mb-6" />
                    <h1 className="text-6xl font-bold mb-4 text-text-primary">404</h1>
                    <h2 className="text-2xl font-semibold mb-4 text-text-primary">Page Not Found</h2>
                    <p className="text-text-secondary mb-8 max-w-md">
                        Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-6 py-3 bg-button-bg-toggle text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                        >
                            <Home size={20} />
                            Go to Homepage
                        </Link>
                        <Link
                            href="/#search"
                            className="flex items-center gap-2 px-6 py-3 border-2 border-bg2 text-text-primary rounded-lg hover:border-text-emphasis transition-colors font-medium"
                        >
                            <Search size={20} />
                            Search Posts
                        </Link>
                    </div>

                    <div className="mt-12">
                        <p className="text-text-secondary mb-4">Popular pages:</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link href="/" className="text-text-link hover:underline">
                                Blog Posts
                            </Link>
                            <span className="text-text-secondary">•</span>
                            <Link href="/about-le" className="text-text-link hover:underline">
                                About Me
                            </Link>
                            <span className="text-text-secondary">•</span>
                            <Link href="/rss.xml" className="text-text-link hover:underline">
                                RSS Feed
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    )
}
