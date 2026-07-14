import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Experience } from '@/components/Experience'

describe('Experience', () => {
  it('renders the Experience heading', () => {
    render(<Experience />)
    expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument()
  })

  it('renders Incubyte as first company', () => {
    render(<Experience />)
    expect(screen.getByText('Incubyte')).toBeInTheDocument()
  })

  it('renders ByajBook company', () => {
    render(<Experience />)
    expect(screen.getByText('ByajBook')).toBeInTheDocument()
  })

  it('renders CyberInfraStructure company', () => {
    render(<Experience />)
    expect(screen.getByText('CyberInfraStructure')).toBeInTheDocument()
  })

  it('renders Senior Software Engineer role', () => {
    render(<Experience />)
    const roles = screen.getAllByText(/Senior Software Engineer/i)
    expect(roles.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Current badge when no role is current', () => {
    render(<Experience />)
    expect(screen.queryByText('Current')).not.toBeInTheDocument()
  })

  it('renders Incubyte end period through May 2026', () => {
    render(<Experience />)
    expect(screen.getByText(/Sep 2024 – May 2026/)).toBeInTheDocument()
  })

  it('renders achievement lists with aria-label', () => {
    render(<Experience />)
    const achievementLists = screen.getAllByRole('list', { name: /achievements at/i })
    expect(achievementLists.length).toBeGreaterThan(0)
  })

  it('renders show more button when achievements exceed 2', () => {
    render(<Experience />)
    const showMoreButtons = screen.getAllByRole('button', { name: /show \d+ more/i })
    expect(showMoreButtons.length).toBeGreaterThan(0)
  })

  it('expands achievements when show more is clicked', () => {
    render(<Experience />)
    const showMoreButton = screen.getAllByRole('button', { name: /show \d+ more/i })[0]
    
    const initialAchievements = screen.getAllByText(/▸/).length
    fireEvent.click(showMoreButton)
    const expandedAchievements = screen.getAllByText(/▸/).length
    expect(expandedAchievements).toBeGreaterThan(initialAchievements)
  })

  it('shows "Show less" after expanding', () => {
    render(<Experience />)
    const showMoreButton = screen.getAllByRole('button', { name: /show \d+ more/i })[0]
    fireEvent.click(showMoreButton)
    expect(screen.getAllByRole('button', { name: /show less/i }).length).toBeGreaterThan(0)
  })

  it('renders summary badge with role count', () => {
    render(<Experience />)
    expect(screen.getByText(/roles across/i)).toBeInTheDocument()
  })

  it('has proper section id', () => {
    render(<Experience />)
    expect(document.querySelector('section#experience')).toBeInTheDocument()
  })
})
