import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { BlogPreview } from '@/components/BlogPreview'
import { Contact } from '@/components/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <BlogPreview />
      <Contact />
    </>
  )
}
