import { Mail, Phone, Globe, MapPin, LucideIcon } from 'lucide-react'
import { personalInfo } from '@/lib/constants'
import { GlassCard } from './GlassCard'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

type ContactLink = {
  icon: LucideIcon
  label: string
  display: string
  href: string
  external?: boolean
}

const CONTACT_LINKS: ContactLink[] = [
  {
    icon: Mail,
    label: 'Email',
    display: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Globe,
    label: 'LinkedIn',
    display: 'linkedin.com/in/himanshu31shr',
    href: personalInfo.linkedin,
    external: true,
  },
  {
    icon: Globe,
    label: 'GitHub',
    display: 'github.com/himanshu31shr',
    href: personalInfo.github,
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    display: `+91 ${personalInfo.phone}`,
    href: `tel:+91${personalInfo.phone}`,
  },
]


export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <SectionHeading
        title="Get In Touch"
        subtitle="Open to exciting opportunities, collaborations, or just a good engineering conversation."
        id="contact-heading"
      />

      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <GlassCard className="p-8">
            <div className="flex items-center gap-2 mb-6 text-text-secondary text-sm">
              <MapPin className="w-4 h-4 text-accent-blue" aria-hidden="true" />
              <span>Based in India · Available for remote &amp; hybrid roles</span>
            </div>

            <ul className="space-y-4" aria-label="Contact information">
              {CONTACT_LINKS.map(({ icon: Icon, label, display, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-glass-hover transition-colors group"
                    aria-label={
                      external
                        ? `${label}: ${display} (opens in new tab)`
                        : `${label}: ${display}`
                    }
                  >
                    <div
                      className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center shrink-0 group-hover:bg-accent-blue/20 transition-colors"
                      aria-hidden="true"
                    >
                      <Icon className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div>
                      <p className="text-text-muted text-xs mb-0.5">{label}</p>
                      <p className="text-text-primary text-sm font-medium group-hover:text-accent-blue transition-colors">
                        {display}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  )
}
