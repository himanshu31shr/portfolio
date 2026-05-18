import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { GlassCard } from './GlassCard'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3)

  if (posts.length === 0) {
    return null
  }

  return (
    <section id="blog-preview" className="section" aria-labelledby="blog-preview-heading">
      <SectionHeading
        title="From the Blog"
        subtitle="Engineering insights from 9+ years of building at scale."
        id="blog-preview-heading"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.map((post, index) => (
          <ScrollReveal key={post.slug} delay={index * 0.12}>
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
                      width={400}
                      height={225}
                    />
                  </div>
                )}

                {/* Tags */}
                <div className="flex items-center gap-1 mb-3 flex-wrap">
                  <Tag className="w-3 h-3 text-text-muted" aria-hidden="true" />
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-text-primary font-semibold text-lg mb-2 group-hover:text-accent-blue transition-colors flex-1">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-text-muted text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>
              </GlassCard>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* View all posts CTA */}
      <ScrollReveal className="text-center">
        <Link
          href="/blog"
          className="btn-outline inline-flex items-center gap-2"
          aria-label="View all blog posts"
        >
          View All Posts
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </ScrollReveal>
    </section>
  )
}
