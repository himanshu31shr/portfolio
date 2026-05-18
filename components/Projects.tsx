import { TrendingUp } from 'lucide-react'
import { projects } from '@/lib/constants'
import { GlassCard } from './GlassCard'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

export function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <SectionHeading
        title="Projects"
        subtitle="Impactful systems built from scratch — with measurable results."
        id="projects-heading"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ScrollReveal key={project.name} delay={index * 0.15}>
            <GlassCard hover className="p-6 h-full flex flex-col">
              {/* Project name & tagline */}
              <div className="mb-4">
                <h3 className="text-text-primary font-bold text-xl mb-1">
                  {project.name}
                </h3>
                <p className="text-accent-blue text-sm font-medium">{project.tagline}</p>
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Highlights */}
              <ul
                className="space-y-1 mb-4 flex-1"
                aria-label={`${project.name} highlights`}
              >
                {project.highlights.map((h, i) => (
                  <li key={i} className="text-text-secondary text-xs leading-relaxed flex gap-2">
                    <span className="text-accent-purple shrink-0 mt-0.5" aria-hidden="true">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="border-t border-glass-border pt-4 mb-4">
                  <div className="flex items-center gap-1 text-text-muted text-xs mb-2">
                    <TrendingUp className="w-3 h-3" aria-hidden="true" />
                    <span>Key Metrics</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.metrics.map((metric) => (
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

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2" aria-label={`${project.name} tech stack`}>
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
