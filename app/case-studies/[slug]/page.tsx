import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Calendar, Clock, ArrowLeft, Briefcase, User } from 'lucide-react'
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
  getAllCaseStudies,
} from '@/lib/case-studies'
import { GlassCard } from '@/components/GlassCard'
import { AuthorCard } from '@/components/AuthorCard'
import { ShareBar } from '@/components/ShareBar'
import { TableOfContents } from '@/components/TableOfContents'
import { personalInfo } from '@/lib/constants'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)

  if (!study) {
    return { title: 'Case Study Not Found' }
  }

  return {
    title: study.meta.title,
    description: study.meta.excerpt,
    openGraph: {
      title: study.meta.title,
      description: study.meta.excerpt,
      type: 'article',
      publishedTime: study.meta.date,
      images: study.meta.coverImage ? [{ url: study.meta.coverImage }] : [],
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)

  if (!study) {
    notFound()
  }

  const otherStudies = getAllCaseStudies()
    .filter((s) => s.slug !== slug)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.meta.title,
    description: study.meta.excerpt,
    datePublished: study.meta.date,
    dateModified: study.meta.date,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
      url: 'https://himanshu31shr.github.io/portfolio/',
    },
    image: study.meta.coverImage
      ? [`https://himanshu31shr.github.io/portfolio${study.meta.coverImage}`]
      : undefined,
  }

  return (
    <div className="pt-20 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
          <article aria-labelledby="case-study-title">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors mb-8 text-sm"
              aria-label="Back to all case studies"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              All Case Studies
            </Link>

            {study.meta.coverImage && (
              <div className="mb-8 rounded-xl overflow-hidden aspect-[16/9] bg-bg-tertiary">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${study.meta.coverImage}`}
                  alt={`Cover image for ${study.meta.title}`}
                  className="w-full h-full object-cover"
                  width={800}
                  height={450}
                />
              </div>
            )}

            <p className="text-accent-blue text-sm font-medium mb-3">{study.meta.clientRole}</p>

            <h1
              id="case-study-title"
              className="text-text-primary font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
            >
              {study.meta.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-text-muted text-sm mb-6 border-b border-glass-border pb-6">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" aria-hidden="true" />
                {study.meta.role}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" aria-hidden="true" />
                {study.meta.clientRole}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time dateTime={study.meta.date}>
                  {new Date(study.meta.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {study.meta.readTime}
              </span>
            </div>

            {study.meta.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8" aria-label="Tech stack">
                {study.meta.techStack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {study.meta.metrics.length > 0 && (
              <div className="glass p-4 rounded-lg mb-8" aria-label="Key metrics">
                <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-3">
                  Key Metrics
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {study.meta.metrics.map((metric) => (
                    <li key={metric} className="text-text-secondary text-sm flex gap-2">
                      <span className="text-accent-purple shrink-0" aria-hidden="true">
                        ▸
                      </span>
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                source={study.content}
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
                    const fullSrc = isExternal
                      ? src
                      : `${basePath}${src.startsWith('/') ? src : `/${src}`}`
                    return <img {...props} src={fullSrc} alt={props.alt || ''} />
                  },
                }}
              />
            </div>

            <ShareBar title={study.meta.title} slug={study.meta.slug} pathPrefix="case-studies" />

            <AuthorCard />

            {otherStudies.length > 0 && (
              <section
                className="mt-16 pt-8 border-t border-glass-border"
                aria-label="More case studies"
              >
                <h2 className="text-text-primary font-bold text-xl mb-6">More Case Studies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherStudies.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/case-studies/${related.slug}`}
                      aria-label={`Read case study: ${related.title}`}
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

          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>

        <div className="lg:hidden mt-8">
          <TableOfContents />
        </div>
      </div>
    </div>
  )
}
