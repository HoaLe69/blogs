import MainLayout from "@/components/layout"
import Divider from "@/components/divider"
import Image from "next/image"

interface CustomImageCmpProps {
  des: string
  src: string
  alt: string
  width?: number
  height?: number
}

function CustomImageCmp({ des, src, alt, width = 1000 / 3, height = 600 / 3 }: CustomImageCmpProps) {
  return (
    <div className="flex flex-col items-center w-full py-8">
      <Image className="rounded-xl object-cover mb-2" src={src} alt={alt} width={width} height={height} />
      <i className="text-text-secondary text-sm">{des}</i>
    </div>
  )
}

export default function Page() {
  return (
    <MainLayout>
      <h1 className="mb-2!">Hi there, I&apos;m HoaLe 👋</h1>
      <span>I&apos;m a passionate Full-Stack Developer based on HCM, VietNam.</span>
      <article className="prose dark:prose-invert max-w-none">
        <Divider />
        <p>
          Hey! I&apos;m <span className="text-text-emphasis">Hoa</span>, a passionate Information Technology student and
          aspiring Software Engineer. I&apos;m currently in my final year at{" "}
          <span className="text-text-emphasis">Ho Chi Minh City University Of Education</span> and I&apos;m excited to
          be wrapping up my degree this summer.
        </p>
        <p>
          I&apos;ve always been fascinated by technology --- How it works, how it evolves, and how it shapes our world.
          From my first computer programming class to diving deep into algorithms and data structures, I knew IT was the
          field for me. But beyond just the academic side, I&apos;ve always been curious about learing new tools,
          programming languages, and latest tech trends. This blog is my way of documenting and sharing what I&apos;ve
          learned, as well as helping others on their own tech journeys.
        </p>
        <CustomImageCmp
          src="/images/author/home.jpg"
          alt="home author"
          des="This is the view of my hometown where I grew up."
        />
        <p>
          This blog is mix of everything I love : <span className="text-text-emphasis">technology</span>,{" "}
          <span className="text-text-emphasis">learning</span>, and living as a student. I started this blog to share my
          experiences and insights as I navigate the world of Information Technology, particularly as a student who’s
          about to graduate and step into the professional world. Here, you&apos;ll find content related to:
        </p>
        <ul>
          <li>
            <strong>Data Structures & Algorithms</strong> – My experiences with these foundational concepts and tips on
            mastering them.
          </li>
          <li>
            <strong>Programming Tutorials </strong>– Step-by-step guides on coding in various languages, including [list
            some languages you focus on, e.g., Python, Java, C++].
          </li>
          <li>
            <strong>Tech Tips & Tricks </strong>– Helpful hints on software development, debugging, and using
            development tools.
          </li>
          <li>
            <strong>Learning New Technologies</strong> – I&apos;ll share how I approach learning new tech, from
            frameworks to tools and emerging technologies.
          </li>
          <li>
            <strong>Student Life & Challenges</strong> – A look at balancing university life with the pressures of
            coursework, projects, and internships.
          </li>
        </ul>
        <CustomImageCmp
          src="/images/author/home2.jpg"
          alt="home author"
          des="The is the another view of my hometown. (My Mom appears in this picture)"
        />
        As a student, I know how overwhelming the tech world can be, and I want this blog to be a resource that makes
        things easier to understand, break down complex concepts, and inspire you to learn more.
        <p>
          I believe everyone&apos;s got a story worth sharing, and I hope this blog inspires to notice the little things
          that make life special.
        </p>
      </article>
    </MainLayout>
  )
}
