import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AuthorCard } from '@/components/AuthorCard'

describe('AuthorCard', () => {
  it('renders the author name', () => {
    render(<AuthorCard />)
    expect(screen.getByText('Himanshu Shrivastava')).toBeInTheDocument()
  })

  it('renders the author title', () => {
    render(<AuthorCard />)
    expect(screen.getByText(/senior full stack engineer/i)).toBeInTheDocument()
  })

  it('renders the avatar image', () => {
    render(<AuthorCard />)
    expect(screen.getByAltText(/himanshu shrivastava avatar/i)).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<AuthorCard />)
    const link = screen.getByRole('link', { name: /github profile/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders LinkedIn link', () => {
    render(<AuthorCard />)
    const link = screen.getByRole('link', { name: /linkedin profile/i })
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders Email link', () => {
    render(<AuthorCard />)
    const link = screen.getByRole('link', { name: /email/i })
    expect(link).toHaveAttribute('href', 'mailto:himanshu31shr@gmail.com')
  })

  it('has correct aria-label on container', () => {
    render(<AuthorCard />)
    expect(document.querySelector('[aria-label="About the author"]')).toBeInTheDocument()
  })
})
