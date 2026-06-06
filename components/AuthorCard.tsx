import Image from 'next/image'
import { Globe, Mail } from 'lucide-react'
import { personalInfo } from '@/lib/constants'

export function AuthorCard() {
  return (
    <div className="glass p-6 rounded-xl mt-12" aria-label="About the author">
      <div className="flex items-center gap-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/avatar.jpg`}
          alt={`${personalInfo.name} avatar`}
          className="w-14 h-14 rounded-full object-cover"
          width={56}
          height={56}
        />
        <div className="flex-1">
          <p className="text-text-primary font-semibold text-sm">{personalInfo.name}</p>
          <p className="text-text-secondary text-xs leading-relaxed">
            {personalInfo.title} · {personalInfo.subtitle}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          aria-label="GitHub profile (opens in new tab)"
        >
          <Globe className="w-3.5 h-3.5" aria-hidden="true" />
          GitHub
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          aria-label="LinkedIn profile (opens in new tab)"
        >
          <Globe className="w-3.5 h-3.5" aria-hidden="true" />
          LinkedIn
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="share-btn"
          aria-label={`Email ${personalInfo.name}`}
        >
          <Mail className="w-3.5 h-3.5" aria-hidden="true" />
          Email
        </a>
      </div>
    </div>
  )
}
