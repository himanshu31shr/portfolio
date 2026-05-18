import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components/Footer'

describe('Footer', () => {
  it('renders the owner name', () => {
    render(<Footer />)
    const elements = screen.getAllByText(/Himanshu Shrivastava/i)
    expect(elements.length).toBeGreaterThan(0)
  })

  it('renders a contentinfo landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<Footer />)
    const githubLink = screen.getByRole('link', { name: /github profile/i })
    expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com'))
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders LinkedIn link', () => {
    render(<Footer />)
    const linkedinLink = screen.getByRole('link', { name: /linkedin profile/i })
    expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'))
  })

  it('renders email link', () => {
    render(<Footer />)
    const emailLink = screen.getByRole('link', { name: /send email/i })
    expect(emailLink).toHaveAttribute('href', expect.stringContaining('mailto:'))
  })

  it('renders social media nav landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('navigation', { name: /social media/i })).toBeInTheDocument()
  })

  it('renders current year in copyright', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders Next.js credit link', () => {
    render(<Footer />)
    const nextLink = screen.getByRole('link', { name: /next\.js/i })
    expect(nextLink).toHaveAttribute('href', 'https://nextjs.org')
  })

  it('renders Tailwind CSS credit link', () => {
    render(<Footer />)
    const tailwindLink = screen.getByRole('link', { name: /tailwind css/i })
    expect(tailwindLink).toHaveAttribute('href', 'https://tailwindcss.com')
  })

  it('renders home link with logo', () => {
    render(<Footer />)
    const homeLink = screen.getByRole('link', { name: /himanshu shrivastava — back to home/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
