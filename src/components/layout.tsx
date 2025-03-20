import Container from "./container"
import Header from "./header"
import Banner from "./banner"
import Footer from "./footer"

interface Props {
  children: React.ReactNode
  slug?: string
}

export default function MainLayout({ children, slug }: Props) {
  return (
    <div>
      <Header />
      <Banner slug={slug} />
      <Container>{children}</Container>
      <Footer />
    </div>
  )
}
