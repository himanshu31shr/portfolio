'use client'

import { useState, useEffect, useRef } from 'react'
import { List } from 'lucide-react'

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const article = document.querySelector('article')
    /* istanbul ignore next */
    if (!article) return

    const elements = article.querySelectorAll('h2, h3')
    const items: TocItem[] = Array.from(elements).map((el) => {
      // Ensure each heading has an id
      /* istanbul ignore next */
      if (!el.id) {
        el.id = el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') ?? ''
      }
      return {
        id: el.id,
        /* istanbul ignore next */
        text: el.textContent ?? '',
        level: el.tagName === 'H2' ? 2 : 3,
      }
    })

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(items)

    // Set up intersection observer for scroll-spy
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    )

    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  if (headings.length < 2) {
    return null
  }

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    /* istanbul ignore next */
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center gap-2 glass px-4 py-2 text-sm text-text-secondary mb-6"
        aria-expanded={isOpen}
        aria-controls="table-of-contents"
        aria-label={isOpen ? 'Hide table of contents' : 'Show table of contents'}
      >
        <List className="w-4 h-4" aria-hidden="true" />
        Table of Contents
      </button>

      {/* TOC list */}
      <nav
        id="table-of-contents"
        className={`${
          isOpen ? 'block' : 'hidden'
        } lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto`}
        aria-label="Table of contents"
      >
        <p className="hidden lg:block text-text-muted text-xs font-mono uppercase tracking-wider mb-4">
          On This Page
        </p>
        <ul className="space-y-1 border-l border-glass-border" role="list">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => handleClick(heading.id)}
                className={`block w-full text-left text-sm py-1.5 border-l-2 -ml-px transition-colors ${
                  heading.level === 3 ? 'pl-6' : 'pl-4'
                } ${
                  activeId === heading.id
                    ? 'toc-active'
                    : 'text-text-secondary hover:text-text-primary border-l-transparent'
                }`}
                aria-current={activeId === heading.id ? 'location' : undefined}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
