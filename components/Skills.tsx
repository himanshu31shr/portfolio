import {
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  BarChart3,
  Bot,
} from 'lucide-react'
import { skillCategories, type SkillCategory } from '@/lib/constants'
import { GlassCard } from './GlassCard'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

const ICON_MAP = {
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  BarChart3,
  Bot,
} as const

type IconName = keyof typeof ICON_MAP

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const IconComponent = ICON_MAP[category.icon as IconName]

  // Bento grid: first two cards are wider
  const isWide = index === 0 || index === 1

  return (
    <ScrollReveal delay={index * 0.08} className={isWide ? 'md:col-span-2 lg:col-span-1' : ''}>
      <GlassCard hover className="p-6 h-full">
        <div className="flex items-center gap-3 mb-4">
          {IconComponent && (
            <div
              className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center"
              aria-hidden="true"
            >
              <IconComponent className="w-5 h-5 text-accent-blue" />
            </div>
          )}
          <h3 className="text-text-primary font-semibold">{category.name}</h3>
        </div>
        <div className="flex flex-wrap gap-2" aria-label={`${category.name} skills`}>
          {category.skills.map((skill) => (
            <span key={skill} className="tag">
              {skill}
            </span>
          ))}
        </div>
      </GlassCard>
    </ScrollReveal>
  )
}

export function Skills() {
  return (
    <section
      id="skills"
      className="section"
      aria-labelledby="skills-heading"
    >
      <SectionHeading
        title="Skills"
        subtitle="From frontend pixels to cloud infrastructure — a full-stack toolkit."
        id="skills-heading"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {skillCategories.map((category, index) => (
          <SkillCategoryCard
            key={category.name}
            category={category}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
