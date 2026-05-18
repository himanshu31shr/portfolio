'use client'

import { useState } from 'react'
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react'
import { experience, type ExperienceItem } from '@/lib/constants'
import { GlassCard } from './GlassCard'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const [expanded, setExpanded] = useState(false)

  const visibleAchievements = expanded ? item.achievements : item.achievements.slice(0, 2)

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="relative pl-8 md:pl-12">
        {/* Timeline dot */}
        <div
          className="absolute left-0 top-6 w-3 h-3 rounded-full bg-accent-blue border-2 border-bg-primary"
          aria-hidden="true"
        />

        <GlassCard className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <h3 className="text-text-primary font-semibold text-lg">
                {item.role}
              </h3>
              <p className="text-accent-blue font-medium">{item.company}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {item.isCurrent && (
                <span className="tag text-green-400 border-green-400/30 bg-green-400/10">
                  Current
                </span>
              )}
              <span className="text-text-muted text-sm font-mono">{item.period}</span>
            </div>
          </div>

          {/* Achievements */}
          <ul className="space-y-2" aria-label={`Achievements at ${item.company}`}>
            {visibleAchievements.map((achievement, i) => (
              <li key={i} className="text-text-secondary text-sm leading-relaxed flex gap-2">
                <span className="text-accent-purple mt-1 shrink-0" aria-hidden="true">▸</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          {/* Expand/collapse toggle */}
          {item.achievements.length > 2 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 flex items-center gap-1 text-accent-blue text-sm hover:text-accent-purple transition-colors"
              aria-expanded={expanded}
              aria-controls={`achievements-${index}`}
            >
              {expanded ? (
                <>Show less <ChevronUp className="w-4 h-4" aria-hidden="true" /></>
              ) : (
                <>Show {item.achievements.length - 2} more <ChevronDown className="w-4 h-4" aria-hidden="true" /></>
              )}
            </button>
          )}
        </GlassCard>
      </div>
    </ScrollReveal>
  )
}

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <SectionHeading
        title="Experience"
        subtitle="9+ years of building products that scale and matter."
        id="experience-heading"
      />

      {/* Timeline line */}
      <div className="relative">
        <div
          className="absolute left-[5px] md:left-[9px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-purple to-transparent"
          aria-hidden="true"
        />

        <div className="space-y-8">
          {experience.map((item, index) => (
            <ExperienceCard key={item.company} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* Summary badge */}
      <ScrollReveal className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 glass px-6 py-3 text-text-secondary text-sm">
          <Briefcase className="w-4 h-4 text-accent-blue" aria-hidden="true" />
          <span>
            {experience.length} roles across fintech, SaaS, blockchain &amp; consulting
          </span>
        </div>
      </ScrollReveal>
    </section>
  )
}
