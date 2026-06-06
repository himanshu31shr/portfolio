import { Hero } from '@/components/Hero'
import { FeaturedPost } from '@/components/FeaturedPost'
import { LatestPosts } from '@/components/LatestPosts'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'
import { getLatestPost } from '@/lib/blog'

export default function HomePage() {
  const latestPost = getLatestPost()

  return (
    <>
      <Hero latestPost={latestPost} />
      <FeaturedPost />
      <LatestPosts />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  )
}
