import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { GlassCard } from '@/components/GlassCard'
import { SectionHeading } from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Engineering insights, technical deep-dives, and lessons learned from 9+ years of building at scale. By Himanshu Shrivastava.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="pt-20">
      <div className="section">
        <SectionHeading
          title="Blog"
          subtitle="Engineering insights from 9+ years of building at scale."
          id="blog-heading"
        />

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">No posts yet. Coming soon!</p>
            <Link href="/" className="btn-outline mt-6 inline-flex items-center gap-2">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 0.1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full group"
                  aria-label={`Read: ${post.title}`}
                >
                  <GlassCard hover className="p-6 h-full flex flex-col">
                    {/* Cover image */}
                    {post.coverImage && (
                      <div className="mb-4 rounded-lg overflow-hidden aspect-[16/9] bg-bg-tertiary">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${post.coverImage}`}
                          alt={`Cover image for ${post.title}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          width={600}
                          height={338}
                        />
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Tag className="w-3 h-3 text-text-muted" aria-hidden="true" />
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-text-primary font-bold text-xl mb-2 group-hover:text-accent-blue transition-colors flex-1">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center justify-between text-text-muted text-xs">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" aria-hidden="true" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {post.readTime}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-accent-blue group-hover:gap-2 transition-all">
                        Read more
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
