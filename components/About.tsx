import { Calendar, Users, Activity, CircleCheck } from 'lucide-react'
import { personalInfo, stats } from '@/lib/constants'
import { GlassCard } from './GlassCard'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

const ICON_MAP = {
  Calendar,
  Users,
  Activity,
  Accessibility: CircleCheck,
} as const

type IconName = keyof typeof ICON_MAP

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <SectionHeading
        title="About Me"
        subtitle="Engineer, leader, and builder — driven by impact at scale."
        id="about-heading"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Bio */}
        <ScrollReveal direction="left">
          <GlassCard className="p-8">
            <p className="text-text-secondary leading-relaxed mb-6">
              {personalInfo.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              {['Node.js', 'React', 'TypeScript', 'AWS', 'Python', 'CI/CD'].map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Stats grid */}
        <ScrollReveal direction="right">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const IconComponent = ICON_MAP[stat.icon as IconName]
              return (
                <ScrollReveal key={stat.label} delay={index * 0.1}>
                  <GlassCard hover className="p-6 text-center">
                    {IconComponent && (
                      <IconComponent
                        className="w-7 h-7 text-accent-blue mx-auto mb-3"
                        aria-hidden="true"
                      />
                    )}
                    <p className="gradient-text text-2xl font-bold mb-1">
                      {stat.value}
                    </p>
                    <p className="text-text-secondary text-xs">{stat.label}</p>
                  </GlassCard>
                </ScrollReveal>
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
