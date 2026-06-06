'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Download, ExternalLink, BookOpen } from 'lucide-react'
import { personalInfo } from '@/lib/constants'
import type { PostMeta } from '@/lib/blog'

const ROLES = [
  'Senior Full Stack Engineer',
  'Startup Technology Leader',
  'Cloud Architect',
  'AI-Assisted Dev Advocate',
  'WCAG 2.1 AA Champion',
]

export function Hero({ latestPost }: { latestPost?: PostMeta | null }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = ROLES[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText === currentRole) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      // Move to next role after a short pause
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % ROLES.length)
      }, 500)
    } else {
      const speed = isDeleting ? 40 : 80
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.slice(0, displayText.length - 1)
            : currentRole.slice(0, displayText.length + 1)
        )
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      aria-label="Hero section"
    >
      {/* Avatar */}
      <div className="mb-8 relative">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden glass p-0.5 glow-blue">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/avatar.jpg`}
            alt={`${personalInfo.name} avatar`}
            className="w-full h-full rounded-full object-cover"
            width={144}
            height={144}
          />
        </div>
        <span
          role="status"
          className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-bg-primary"
          aria-label="Available for opportunities"
          title="Available for opportunities"
        />
      </div>

      {/* Greeting */}
      <p className="text-text-secondary text-lg mb-3 font-mono tracking-widest uppercase">
        Hello, I&apos;m
      </p>

      {/* Name */}
      <h1 className="gradient-text text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-4 leading-tight">
        {personalInfo.name}
      </h1>

      {/* Typewriter role */}
      <div
        className="text-text-secondary text-xl md:text-2xl mb-8 h-8 flex items-center"
        aria-live="polite"
        aria-label={`Current role: ${displayText}`}
      >
        <span>{displayText}</span>
        <span className="cursor-blink ml-0.5 text-accent-blue" aria-hidden="true">|</span>
      </div>

      {/* Summary snippet */}
      <p className="text-text-secondary text-center max-w-2xl mb-10 leading-relaxed text-sm md:text-base">
        9+ years building and scaling fintech &amp; SaaS platforms. Expert in Node.js, React, TypeScript,
        AWS, and AI-assisted engineering workflows.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <button
          onClick={handleScrollDown}
          className="btn-gradient flex items-center gap-2"
          aria-label="View my work"
        >
          View My Work
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </button>
        <a
          href="/portfolio/Himanshu_Shrivastava_Resume.pdf"
          download
          className="btn-outline flex items-center gap-2"
          aria-label="Download resume PDF"
        >
          Download Resume
          <Download className="w-4 h-4" aria-hidden="true" />
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex items-center gap-2"
          aria-label="View LinkedIn profile (opens in new tab)"
        >
          LinkedIn
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
        <Link
          href="/blog"
          className="btn-outline flex items-center gap-2"
          aria-label="Read my writing"
        >
          Read My Writing
          <BookOpen className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Latest article pill */}
      {latestPost && (
        <Link
          href={`/blog/${latestPost.slug}`}
          className="mb-16 inline-flex items-center gap-2 glass px-4 py-2 text-sm text-text-secondary hover:text-accent-blue hover:border-accent-blue/50 transition-all group"
          aria-label={`Latest article: ${latestPost.title}`}
        >
          <span className="text-accent-purple font-mono text-xs uppercase tracking-wider">Latest</span>
          <span className="w-px h-3 bg-glass-border" aria-hidden="true" />
          <span className="group-hover:text-accent-blue transition-colors truncate max-w-[280px] md:max-w-[400px]">
            {latestPost.title}
          </span>
        </Link>
      )}

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 animate-bounce text-text-muted hover:text-accent-blue transition-colors"
        aria-label="Scroll down to About section"
      >
        <ChevronDown className="w-6 h-6" aria-hidden="true" />
      </button>
    </section>
  )
}
