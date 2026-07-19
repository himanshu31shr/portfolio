import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { getAllCaseStudies } from '@/lib/case-studies'
import { SectionHeading } from '@/components/SectionHeading'
import { GlassCard } from '@/components/GlassCard'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Anonymized deep-dives into production systems — architecture decisions, trade-offs, and measurable outcomes.',
}

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies()

  return (
    <div className="pt-20">
      <div className="section">
        <SectionHeading
          title="Case Studies"
          subtitle="Anonymized deep-dives into systems I have built — context, architecture, and outcomes."
          id="case-studies-heading"
        />

        {studies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-secondary mb-6">No case studies published yet.</p>
            <Link
              href="/"
              className="text-accent-blue hover:underline text-sm"
              aria-label="Back to home"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((study, index) => (
              <ScrollReveal key={study.slug} delay={index * 0.1}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  aria-label={`Read case study: ${study.title}`}
                  className="block h-full"
                >
                  <GlassCard hover className="p-6 h-full flex flex-col">
                    <p className="text-text-muted text-xs font-mono mb-2">{study.clientRole}</p>
                    <h2 className="text-text-primary font-bold text-xl mb-2 group-hover:text-accent-blue">
                      {study.title}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                      {study.excerpt}
                    </p>

                    {study.metrics.length > 0 && (
                      <div className="border-t border-glass-border pt-4 mb-4">
                        <div className="flex items-center gap-1 text-text-muted text-xs mb-2">
                          <TrendingUp className="w-3 h-3" aria-hidden="true" />
                          <span>Key Metrics</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {study.metrics.slice(0, 2).map((metric) => (
                            <span
                              key={metric}
                              className="text-xs px-2 py-0.5 rounded bg-accent-purple/10 border border-accent-purple/20 text-accent-purple"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted font-mono text-xs">{study.readTime}</span>
                      <span className="inline-flex items-center gap-1 text-accent-blue">
                        Read study
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
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
