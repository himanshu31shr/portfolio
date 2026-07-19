'use client'

import { useState, useEffect } from 'react'
import { Globe, Link as LinkIcon, Check } from 'lucide-react'

interface ShareBarProps {
  title: string
  slug: string
  /** URL segment before the slug. Defaults to blog posts. */
  pathPrefix?: string
}

export function ShareBar({ title, slug, pathPrefix = 'blog' }: ShareBarProps) {
  const [copied, setCopied] = useState(false)

  /* istanbul ignore next */
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const postUrl = `${baseUrl}/${pathPrefix}/${slug}`
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(postUrl)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    if (copied) {
      timeoutId = setTimeout(() => setCopied(false), 2000)
    }
    return () => clearTimeout(timeoutId)
  }, [copied])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className="flex items-center gap-3 mt-8 pt-8 border-t border-glass-border" aria-label="Share this article">
      <span className="text-text-muted text-xs font-mono uppercase tracking-wider">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
        aria-label="Share on Twitter (opens in new tab)"
      >
        <Globe className="w-3.5 h-3.5" aria-hidden="true" />
        Twitter
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
        aria-label="Share on LinkedIn (opens in new tab)"
      >
        <Globe className="w-3.5 h-3.5" aria-hidden="true" />
        LinkedIn
      </a>
      <button
        onClick={handleCopyLink}
        className="share-btn"
        aria-label={copied ? 'Link copied' : 'Copy link to clipboard'}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-500" aria-hidden="true" />
            Copied!
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
            Copy Link
          </>
        )}
      </button>
    </div>
  )
}
