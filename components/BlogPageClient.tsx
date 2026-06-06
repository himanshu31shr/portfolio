'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag, ArrowRight, FileText } from 'lucide-react'
import type { PostMeta } from '@/lib/blog'
import { GlassCard } from '@/components/GlassCard'
import { ScrollReveal } from '@/components/ScrollReveal'

interface BlogPageClientProps {
  posts: PostMeta[]
  allTags: string[]
}

export function BlogPageClient({ posts, allTags }: BlogPageClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts

  return (
    <>
      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-8" role="group" aria-label="Filter posts by tag">
          <button
            onClick={() => setActiveTag(null)}
            className={`tag text-xs cursor-pointer transition-all ${
              activeTag === null
                ? 'bg-accent-blue/20 border-accent-blue/50 text-accent-blue'
                : ''
            }`}
            aria-pressed={activeTag === null}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`tag text-xs cursor-pointer transition-all ${
                activeTag === tag
                  ? 'bg-accent-blue/20 border-accent-blue/50 text-accent-blue'
                  : ''
              }`}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Post count */}
      <div className="flex items-center gap-2 text-text-muted text-sm mb-8">
        <FileText className="w-4 h-4" aria-hidden="true" />
        <span>{filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}</span>
        {activeTag && (
          <span className="text-text-muted">
            tagged <span className="text-accent-blue">{activeTag}</span>
          </span>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-secondary text-lg">
            {activeTag ? `No posts tagged "${activeTag}".` : 'No posts yet. Coming soon!'}
          </p>
          {activeTag ? (
            <button
              onClick={() => setActiveTag(null)}
              className="btn-outline mt-6 inline-flex items-center gap-2"
              aria-label="Clear tag filter"
            >
              Clear Filter
            </button>
          ) : (
            <Link href="/" className="btn-outline mt-6 inline-flex items-center gap-2">
              Back to Home
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="block group"
                aria-label={`Read: ${post.title}`}
              >
                <GlassCard hover className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Cover thumbnail (optional) */}
                    {post.coverImage && (
                      <div className="w-full md:w-40 shrink-0 rounded-lg overflow-hidden aspect-[16/9] md:aspect-[4/3] bg-bg-tertiary">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${post.coverImage}`}
                          alt={`Cover image for ${post.title}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          width={160}
                          height={120}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        <Tag className="w-3 h-3 text-text-muted" aria-hidden="true" />
                        {post.tags.map((tag) => (
                          <span key={tag} className="tag text-xs">{tag}</span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="text-text-primary font-bold text-lg mb-1 group-hover:text-accent-blue transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2">
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
                        <span className="hidden sm:flex items-center gap-1 text-accent-blue group-hover:gap-2 transition-all">
                          Read more
                          <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}
    </>
  )
}
