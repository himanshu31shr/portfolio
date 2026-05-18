import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { GlassCard } from '@/components/GlassCard'

describe('GlassCard', () => {
  it('renders children', () => {
    render(<GlassCard>Hello World</GlassCard>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('applies glass class by default', () => {
    const { container } = render(<GlassCard>content</GlassCard>)
    expect(container.firstChild).toHaveClass('glass')
  })

  it('applies glass-lg class when large=true', () => {
    const { container } = render(<GlassCard large>content</GlassCard>)
    expect(container.firstChild).toHaveClass('glass-lg')
  })

  it('applies hover transition class when hover=true', () => {
    const { container } = render(<GlassCard hover>content</GlassCard>)
    expect(container.firstChild).toHaveClass('transition-all')
    expect(container.firstChild).toHaveClass('cursor-pointer')
  })

  it('does not apply hover class when hover=false', () => {
    const { container } = render(<GlassCard>content</GlassCard>)
    expect(container.firstChild).not.toHaveClass('cursor-pointer')
  })

  it('merges custom className', () => {
    const { container } = render(<GlassCard className="p-8">content</GlassCard>)
    expect(container.firstChild).toHaveClass('p-8')
  })

  it('renders as div by default', () => {
    const { container } = render(<GlassCard>content</GlassCard>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('renders as article when as="article"', () => {
    const { container } = render(<GlassCard as="article">content</GlassCard>)
    expect(container.firstChild?.nodeName).toBe('ARTICLE')
  })

  it('renders as li when as="li"', () => {
    const { container } = render(<GlassCard as="li">item</GlassCard>)
    expect(container.firstChild?.nodeName).toBe('LI')
  })

  it('renders complex children', () => {
    render(
      <GlassCard>
        <h2>Title</h2>
        <p>Description</p>
      </GlassCard>
    )
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })
})
