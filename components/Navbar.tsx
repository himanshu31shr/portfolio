'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Code2 } from 'lucide-react'
import { navLinks, personalInfo } from '@/lib/constants'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMobileClose = () => setMobileOpen(false)

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-glass-border'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav
          className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-text-primary font-bold text-lg hover:text-accent-blue transition-colors"
            aria-label={`${personalInfo.name} — home`}
          >
            <Code2 className="w-5 h-5 text-accent-blue" aria-hidden="true" />
            <span className="gradient-text">HS</span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {navLinks
              .filter((link) => !(pathname.startsWith('/blog') && link.href.startsWith('#')))
              .map((link) => {
              const isActive = link.href.startsWith('#')
                ? false
                : pathname === link.href
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-accent-blue ${
                      isActive ? 'text-accent-blue' : 'text-text-secondary'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-bg-secondary/95 backdrop-blur-xl border-b border-glass-border"
          >
            <ul className="flex flex-col py-4 px-4 gap-1" role="list">
              {navLinks
                .filter((link) => !(pathname.startsWith('/blog') && link.href.startsWith('#')))
                .map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block py-3 px-4 text-text-secondary hover:text-accent-blue hover:bg-glass rounded-lg transition-colors text-sm"
                    onClick={handleMobileClose}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
