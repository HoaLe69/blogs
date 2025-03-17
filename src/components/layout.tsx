import Container from "./container"
import Header from "./header"

interface Props {
  children: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  )
}
