import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skills } from '@/components/Skills'

describe('Skills', () => {
  it('renders the Skills heading', () => {
    render(<Skills />)
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
  })

  it('renders Languages category', () => {
    render(<Skills />)
    expect(screen.getByText('Languages')).toBeInTheDocument()
  })

  it('renders Frontend category', () => {
    render(<Skills />)
    expect(screen.getByText('Frontend')).toBeInTheDocument()
  })

  it('renders Backend category', () => {
    render(<Skills />)
    expect(screen.getByText('Backend')).toBeInTheDocument()
  })

  it('renders Cloud & DevOps category', () => {
    render(<Skills />)
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument()
  })

  it('renders AI Engineering category', () => {
    render(<Skills />)
    expect(screen.getByText('AI Engineering')).toBeInTheDocument()
  })

  it('renders TypeScript skill', () => {
    render(<Skills />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders AWS skill', () => {
    render(<Skills />)
    expect(screen.getByText('AWS')).toBeInTheDocument()
  })

  it('renders React.js skill', () => {
    render(<Skills />)
    expect(screen.getByText('React.js')).toBeInTheDocument()
  })

  it('renders Claude Code skill', () => {
    render(<Skills />)
    expect(screen.getByText('Claude Code')).toBeInTheDocument()
  })

  it('renders all 7 skill category headings', () => {
    render(<Skills />)
    const h3s = screen.getAllByRole('heading', { level: 3 })
    // 7 category headings
    expect(h3s.length).toBeGreaterThanOrEqual(7)
  })

  it('has aria-labels on skill lists', () => {
    render(<Skills />)
    const labelledLists = document.querySelectorAll('[aria-label$="skills"]')
    expect(labelledLists.length).toBeGreaterThan(0)
  })

  it('has correct section id', () => {
    render(<Skills />)
    expect(document.querySelector('section#skills')).toBeInTheDocument()
  })
})
