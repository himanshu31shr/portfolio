import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Projects } from '@/components/Projects'

describe('Projects', () => {
  it('renders the Projects heading', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument()
  })

  it('renders Credit Ops Automation Platform project', () => {
    render(<Projects />)
    expect(screen.getByText('Credit Ops Automation Platform')).toBeInTheDocument()
  })

  it('renders Procurement Performance Suite project', () => {
    render(<Projects />)
    expect(screen.getByText('Procurement Performance Suite')).toBeInTheDocument()
  })

  it('renders Multi-Channel Tournament Bot project', () => {
    render(<Projects />)
    expect(screen.getByText('Multi-Channel Tournament Bot')).toBeInTheDocument()
  })

  it('renders LinkedIn MCP Server project', () => {
    render(<Projects />)
    expect(screen.getByText('LinkedIn MCP Server')).toBeInTheDocument()
  })

  it('renders project taglines', () => {
    render(<Projects />)
    expect(screen.getByText(/Automated credit bureau monitoring/i)).toBeInTheDocument()
  })

  it('renders project descriptions', () => {
    render(<Projects />)
    expect(screen.getByText(/monitor credit reports across bureaus/i)).toBeInTheDocument()
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

  it('links each project card to its case study', () => {
    render(<Projects />)
    const link = screen.getByRole('link', {
      name: /read case study: credit ops automation platform/i,
    })
    expect(link).toHaveAttribute('href', '/case-studies/credit-ops-automation')
  })

  it('links to the case studies listing', () => {
    render(<Projects />)
    expect(screen.getByRole('link', { name: /view all case studies/i })).toHaveAttribute(
      'href',
      '/case-studies'
    )
  })
})
