import Container from "./container"
import Header from "./header"
import Banner from "./banner"
import Footer from "./footer"

interface Props {
  children: React.ReactNode
  slug?: string
  typeOfBlog?: string
}

export default function MainLayout({ typeOfBlog, children, slug }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Banner slug={slug} typeOfBlog={typeOfBlog} />
      <div className="flex-1">
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>
  )
}
