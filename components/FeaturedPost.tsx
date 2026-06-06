import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag, Sparkles } from 'lucide-react'
import { getLatestPost } from '@/lib/blog'
import { ScrollReveal } from './ScrollReveal'

export function FeaturedPost() {
  const post = getLatestPost()

  if (!post) {
    return null
  }

  return (
    <section id="featured-post" className="section" aria-labelledby="featured-post-heading">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="w-5 h-5 text-accent-purple" aria-hidden="true" />
        <h2 id="featured-post-heading" className="text-text-secondary text-sm font-mono uppercase tracking-widest">
          Latest Article
        </h2>
      </div>

      <ScrollReveal>
        <Link
          href={`/blog/${post.slug}`}
          className="block group"
          aria-label={`Read featured article: ${post.title}`}
        >
          <div className="featured-card p-1 rounded-2xl">
            <div className="bg-bg-primary rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Cover image */}
                {post.coverImage && (
                  <div className="aspect-[16/9] lg:aspect-auto lg:min-h-[320px] overflow-hidden bg-bg-tertiary">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${post.coverImage}`}
                      alt={`Cover image for ${post.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={600}
                      height={400}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  {/* Tags */}
                  <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                    <Tag className="w-3 h-3 text-text-muted" aria-hidden="true" />
                    {post.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="tag text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-text-primary font-bold text-2xl md:text-3xl mb-3 group-hover:text-accent-blue transition-colors leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Meta + CTA */}
                  <div className="flex items-center justify-between">
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
                    <span className="flex items-center gap-1.5 text-accent-blue text-sm font-medium group-hover:gap-3 transition-all">
                      Read Article
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </ScrollReveal>
    </section>
  )
}
