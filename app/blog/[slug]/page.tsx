import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import { getAllPosts, getPostBySlug, getPostSlugs } from '@/lib/blog'
import { GlassCard } from '@/components/GlassCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: 'article',
      publishedTime: post.meta.date,
      images: post.meta.coverImage ? [{ url: post.meta.coverImage }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2)

  return (
    <div className="pt-20 pb-20">
      <article
        className="max-w-3xl mx-auto px-4"
        aria-labelledby="post-title"
      >
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors mb-8 text-sm"
          aria-label="Back to all blog posts"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          All Posts
        </Link>

        {/* Cover image */}
        {post.meta.coverImage && (
          <div className="mb-8 rounded-xl overflow-hidden aspect-[16/9] bg-bg-tertiary">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${post.meta.coverImage}`}
              alt={`Cover image for ${post.meta.title}`}
              className="w-full h-full object-cover"
              width={800}
              height={450}
            />
          </div>
        )}

        {/* Tags */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Tag className="w-3 h-3 text-text-muted" aria-hidden="true" />
          {post.meta.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h1
          id="post-title"
          className="text-text-primary font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
        >
          {post.meta.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-6 text-text-muted text-sm mb-8 border-b border-glass-border pb-8">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <time dateTime={post.meta.date}>
              {new Date(post.meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" aria-hidden="true" />
            {post.meta.readTime}
          </span>
        </div>

        {/* MDX Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-text-primary
            prose-p:text-text-secondary
            prose-a:text-accent-blue prose-a:no-underline hover:prose-a:underline
            prose-code:text-accent-cyan prose-code:bg-bg-tertiary prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-bg-tertiary prose-pre:border prose-pre:border-glass-border
            prose-blockquote:border-l-accent-blue prose-blockquote:text-text-secondary
            prose-strong:text-text-primary
            prose-hr:border-glass-border
            prose-li:text-text-secondary prose-li:marker:text-text-muted
            prose-table:w-full prose-table:border-collapse
            prose-th:text-text-primary prose-th:border-b prose-th:border-glass-border prose-th:p-4 prose-th:text-left prose-th:bg-bg-secondary/50
            prose-td:text-text-secondary prose-td:border-b prose-td:border-glass-border prose-td:p-4"
        >
          <MDXRemote 
            source={post.content} 
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={{
              img: (props) => {
                const src = props.src || ''
                const isExternal = src.startsWith('http')
                const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
                const fullSrc = isExternal ? src : `${basePath}${src.startsWith('/') ? src : `/${src}`}`
                return <img {...props} src={fullSrc} alt={props.alt || ''} />
              }
            }}
          />
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-glass-border" aria-label="Related posts">
            <h2 className="text-text-primary font-bold text-xl mb-6">More Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  aria-label={`Read: ${related.title}`}
                >
                  <GlassCard hover className="p-4">
                    <p className="text-text-muted text-xs mb-2 font-mono">{related.readTime}</p>
                    <h3 className="text-text-primary font-semibold text-sm hover:text-accent-blue transition-colors">
                      {related.title}
                    </h3>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
