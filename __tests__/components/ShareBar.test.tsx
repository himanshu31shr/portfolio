import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ShareBar } from '@/components/ShareBar'

describe('ShareBar', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { origin: 'https://example.com' },
      writable: true,
    })
  })

  it('renders Share label', () => {
    render(<ShareBar title="Test Post" slug="test-post" />)
    expect(screen.getByText('Share')).toBeInTheDocument()
  })

  it('renders Twitter share link', () => {
    render(<ShareBar title="Test Post" slug="test-post" />)
    const link = screen.getByRole('link', { name: /share on twitter/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('href')).toContain('twitter.com/intent/tweet')
  })

  it('renders LinkedIn share link', () => {
    render(<ShareBar title="Test Post" slug="test-post" />)
    const link = screen.getByRole('link', { name: /share on linkedin/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('href')).toContain('linkedin.com/sharing')
  })

  it('renders Copy Link button', () => {
    render(<ShareBar title="Test Post" slug="test-post" />)
    expect(screen.getByRole('button', { name: /copy link/i })).toBeInTheDocument()
  })

  it('copies link to clipboard on click', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    render(<ShareBar title="Test Post" slug="test-post" />)
    fireEvent.click(screen.getByRole('button', { name: /copy link/i }))

    expect(writeText).toHaveBeenCalledWith('https://example.com/blog/test-post')
  })

  it('shows Copied! after clicking copy', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    render(<ShareBar title="Test Post" slug="test-post" />)
    fireEvent.click(screen.getByRole('button', { name: /copy link/i }))

    // Wait for state update
    await screen.findByText('Copied!')
  })

  it('encodes title and URL in share links', () => {
    render(<ShareBar title="My Post & More" slug="test-post" />)
    const twitterLink = screen.getByRole('link', { name: /share on twitter/i })
    expect(twitterLink.getAttribute('href')).toContain(encodeURIComponent('My Post & More'))
    expect(twitterLink).toHaveAttribute('href', expect.stringContaining(encodeURIComponent('test-post')))
  })

  it('handles clipboard error gracefully', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('Clipboard error'))
    Object.assign(navigator, { clipboard: { writeText } })
    render(<ShareBar title="Test Post" slug="test-post" />)
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /copy link/i }))
    })
    
    // Should not throw, should handle error gracefully
    expect(screen.queryByText('Copied!')).not.toBeInTheDocument()
  })

  it('resets copied state after 2 seconds', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    
    render(<ShareBar title="Test" slug="test" />)
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /copy link/i }))
    })
    
    expect(screen.getByText('Copied!')).toBeInTheDocument()
    
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    
    expect(screen.getByText('Copy Link')).toBeInTheDocument()
    vi.useRealTimers()
  })
})
