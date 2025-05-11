import { Copyright, Github, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-4 flex flex-col items-center justify-between">
      <span className="text-text-secondary text-sm flex items-center gap-2">
        <Copyright size={16} /> {new Date().getFullYear()} Hoa Lee. All Rights Reserved.
      </span>
      <div className="flex items-center gap-2 my-1">
        <ButtonLink href="https://github.com/HoaLe69" icon={<Github size={18} />} />
        <ButtonLink href="https://www.linkedin.com/in/devpure/" icon={<Linkedin size={18} />} />
        <ButtonLink href="https://www.instagram.com/vwn_hfo.691/" icon={<Instagram size={18} />} />
      </div>
    </footer>
  )
}

interface ButtonLinkProps {
  icon: React.ReactNode
  href: string
}
function ButtonLink({ icon, href }: ButtonLinkProps) {
  return (
    <Link href={href} target="_blank" className="text-text-secondary p-1 hover:scale-120 transition-all cursor-pointer">
      {icon}
    </Link>
  )
}
