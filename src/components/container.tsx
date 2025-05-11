interface Props {
  children: React.ReactNode
}
export default function Container({ children }: Props) {
  return (
    <div id="container" className="max-w-2xl mx-auto px-4">
      {children}
    </div>
  )
}
