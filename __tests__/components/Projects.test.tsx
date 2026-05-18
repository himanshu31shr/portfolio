import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Projects } from '@/components/Projects'

describe('Projects', () => {
  it('renders the Projects heading', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument()
  })

  it('renders Credit Repair CRM project', () => {
    render(<Projects />)
    expect(screen.getByText('Credit Repair CRM')).toBeInTheDocument()
  })

  it('renders MarketDojo project', () => {
    render(<Projects />)
    expect(screen.getByText('MarketDojo')).toBeInTheDocument()
  })

  it('renders TourneyBot / Manager project', () => {
    render(<Projects />)
    expect(screen.getByText('TourneyBot / Manager')).toBeInTheDocument()
  })

  it('renders project taglines', () => {
    render(<Projects />)
    expect(screen.getByText(/Automated credit bureau monitoring/i)).toBeInTheDocument()
  })

  it('renders project descriptions', () => {
    render(<Projects />)
    expect(screen.getByText(/monitor credit reports of users/i)).toBeInTheDocument()
  })

  it('renders key metrics section', () => {
    render(<Projects />)
    expect(screen.getAllByText('Key Metrics').length).toBeGreaterThan(0)
  })

  it('renders tech stack tags', () => {
    render(<Projects />)
    expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0)
  })

  it('renders highlight lists with aria-labels', () => {
    render(<Projects />)
    const highlightLists = document.querySelectorAll('[aria-label$="highlights"]')
    expect(highlightLists.length).toBeGreaterThan(0)
  })

  it('renders tech stack with aria-labels', () => {
    render(<Projects />)
    const techLists = document.querySelectorAll('[aria-label$="tech stack"]')
    expect(techLists.length).toBeGreaterThan(0)
  })

  it('has correct section id', () => {
    render(<Projects />)
    expect(document.querySelector('section#projects')).toBeInTheDocument()
  })
})
