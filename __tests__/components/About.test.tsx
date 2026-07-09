import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { About } from '@/components/About'

describe('About', () => {
  it('renders the About Me heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
  })

  it('has correct section aria-labelledby', () => {
    render(<About />)
    const section = document.querySelector('section#about')
    expect(section).toHaveAttribute('aria-labelledby', 'about-heading')
  })

  it('renders the summary text', () => {
    render(<About />)
    expect(screen.getByText(/9\+ years of experience/i)).toBeInTheDocument()
  })

  it('renders "9+" years stat', () => {
    render(<About />)
    expect(screen.getByText('9+')).toBeInTheDocument()
  })

  it('renders "400K+" users stat', () => {
    render(<About />)
    expect(screen.getByText('400K+')).toBeInTheDocument()
  })

  it('renders "99.9%" uptime stat', () => {
    render(<About />)
    expect(screen.getByText('99.9%')).toBeInTheDocument()
  })

  it('renders WCAG 2.1 AA stat', () => {
    render(<About />)
    expect(screen.getByText('WCAG 2.1 AA')).toBeInTheDocument()
  })

  it('renders TypeScript skill tag', () => {
    render(<About />)
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0)
  })

  it('renders AWS skill tag', () => {
    render(<About />)
    expect(screen.getAllByText('AWS').length).toBeGreaterThan(0)
  })

  it('renders Technical Toolkit heading', () => {
    render(<About />)
    expect(screen.getByText('Technical Toolkit')).toBeInTheDocument()
  })

  it('renders category cards for skills', () => {
    render(<About />)
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
  })
})
