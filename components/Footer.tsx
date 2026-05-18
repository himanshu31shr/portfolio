import Link from 'next/link'
import { Globe, Mail, Code2, Heart } from 'lucide-react'
import { personalInfo } from '@/lib/constants'

const SOCIAL_LINKS = [
  {
    icon: Globe,
    label: 'GitHub',
    href: personalInfo.github,
  },
  {
    icon: Globe,
    label: 'LinkedIn',
    href: personalInfo.linkedin,
  },
  {
    icon: Mail,
    label: 'Email',
    href: `mailto:${personalInfo.email}`,
  },
] as const


export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="border-t border-glass-border mt-20 py-12 px-4"
      role="contentinfo"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-primary font-bold text-xl mb-6 hover:text-accent-blue transition-colors"
          aria-label={`${personalInfo.name} — back to home`}
        >
          <Code2 className="w-5 h-5 text-accent-blue" aria-hidden="true" />
          <span className="gradient-text">{personalInfo.name}</span>
        </Link>

        {/* Social links */}
        <nav aria-label="Social media links" className="mb-6">
          <ul className="flex justify-center gap-4" role="list">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="w-10 h-10 glass flex items-center justify-center rounded-lg text-text-secondary hover:text-accent-blue hover:border-accent-blue/50 transition-all"
                  aria-label={
                    href.startsWith('mailto')
                      ? `Send email to ${personalInfo.name}`
                      : `${label} profile (opens in new tab)`
                  }
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <p className="text-text-muted text-sm flex items-center justify-center gap-1 flex-wrap">
          <span>
            &copy; {currentYear} {personalInfo.name}. Built with
          </span>
          <Heart className="w-3 h-3 text-accent-pink fill-accent-pink" aria-label="love" />
          <span>using</span>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:underline"
            aria-label="Next.js (opens in new tab)"
          >
            Next.js
          </a>
          <span>&amp;</span>
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-purple hover:underline"
            aria-label="Tailwind CSS (opens in new tab)"
          >
            Tailwind CSS
          </a>
        </p>
      </div>
    </footer>
  )
}
