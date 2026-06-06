import type { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { SectionHeading } from '@/components/SectionHeading'
import { BlogPageClient } from '@/components/BlogPageClient'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Engineering insights, technical deep-dives, and lessons learned from 9+ years of building at scale. By Himanshu Shrivastava.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const allTags = getAllTags()

  return (
    <div className="pt-20">
      <div className="section">
        <SectionHeading
          title="Writing"
          subtitle="Engineering insights from 9+ years of building at scale."
          id="blog-heading"
        />

        <BlogPageClient posts={posts} allTags={allTags} />
      </div>
    </div>
  )
}
