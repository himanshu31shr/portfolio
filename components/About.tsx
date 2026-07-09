import {
  Calendar,
  Users,
  Activity,
  CircleCheck,
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  BarChart3,
  Bot,
  TestTube,
} from 'lucide-react'
import { personalInfo, stats, skillCategories, type SkillCategory } from '@/lib/constants'
import { GlassCard } from './GlassCard'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

const STAT_ICON_MAP = {
  Calendar,
  Users,
  Activity,
  Accessibility: CircleCheck,
} as const

type StatIconName = keyof typeof STAT_ICON_MAP

const SKILL_ICON_MAP = {
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  BarChart3,
  Bot,
  TestTube,
} as const

type SkillIconName = keyof typeof SKILL_ICON_MAP

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const IconComponent = SKILL_ICON_MAP[category.icon as SkillIconName]

  return (
    <ScrollReveal delay={index * 0.06}>
      <GlassCard hover className="p-5 h-full">
        <div className="flex items-center gap-3 mb-3">
          {IconComponent && (
            <div
              className="w-9 h-9 rounded-lg bg-accent-blue/10 flex items-center justify-center"
              aria-hidden="true"
            >
              <IconComponent className="w-4 h-4 text-accent-blue" />
            </div>
          )}
          <h3 className="text-text-primary font-semibold text-sm">{category.name}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5" aria-label={`${category.name} skills`}>
          {category.skills.map((skill) => (
            <span key={skill} className="tag text-xs">
              {skill}
            </span>
          ))}
        </div>
      </GlassCard>
    </ScrollReveal>
  )
}

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <SectionHeading
        title="About Me"
        subtitle="Engineer, leader, and builder — driven by impact at scale."
        id="about-heading"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
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
              const IconComponent = STAT_ICON_MAP[stat.icon as StatIconName]
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

      {/* Skills grid (absorbed from Skills section) */}
      <ScrollReveal>
        <h3 className="text-text-primary font-semibold text-lg mb-6">Technical Toolkit</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
