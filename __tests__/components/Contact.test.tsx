import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Contact } from '@/components/Contact'

describe('Contact', () => {
  it('renders the Get In Touch heading', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('renders an email link', () => {
    render(<Contact />)
    const emailLink = screen.getByRole('link', { name: /email/i })
    expect(emailLink).toHaveAttribute('href', expect.stringContaining('mailto:'))
  })

  it('renders a LinkedIn link', () => {
    render(<Contact />)
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'))
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders a GitHub link', () => {
    render(<Contact />)
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com'))
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders a phone link', () => {
    render(<Contact />)
    const phoneLink = screen.getByRole('link', { name: /phone/i })
    expect(phoneLink).toHaveAttribute('href', expect.stringContaining('tel:'))
  })

  it('renders location information', () => {
    render(<Contact />)
    expect(screen.getByText(/based in india/i)).toBeInTheDocument()
  })

  it('renders contact list with accessible label', () => {
    render(<Contact />)
    const list = screen.getByRole('list', { name: /contact information/i })
    expect(list).toBeInTheDocument()
  })

  it('all external links have aria-labels indicating new tab', () => {
    render(<Contact />)
    const externalLinks = screen.getAllByRole('link', { name: /opens in new tab/i })
    expect(externalLinks.length).toBeGreaterThan(0)
  })

  it('has correct section id', () => {
    render(<Contact />)
    expect(document.querySelector('section#contact')).toBeInTheDocument()
  })
})
