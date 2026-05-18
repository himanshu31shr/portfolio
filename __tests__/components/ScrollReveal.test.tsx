import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ScrollReveal } from '@/components/ScrollReveal'

// framer-motion is mocked in vitest.setup.ts to render passthrough divs

describe('ScrollReveal', () => {
  it('renders children', () => {
    render(<ScrollReveal>Visible Content</ScrollReveal>)
    expect(screen.getByText('Visible Content')).toBeInTheDocument()
  })

  it('renders complex children', () => {
    render(
      <ScrollReveal>
        <h2>Title</h2>
        <p>Body text</p>
      </ScrollReveal>
    )
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument()
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('passes className to wrapper', () => {
    const { container } = render(
      <ScrollReveal className="custom-class">content</ScrollReveal>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with default props without errors', () => {
    expect(() => render(<ScrollReveal>content</ScrollReveal>)).not.toThrow()
  })

  it('renders with direction="left" without errors', () => {
    expect(() =>
      render(<ScrollReveal direction="left">content</ScrollReveal>)
    ).not.toThrow()
  })

  it('renders with direction="right" without errors', () => {
    expect(() =>
      render(<ScrollReveal direction="right">content</ScrollReveal>)
    ).not.toThrow()
  })

  it('renders with direction="down" without errors', () => {
    expect(() =>
      render(<ScrollReveal direction="down">content</ScrollReveal>)
    ).not.toThrow()
  })

  it('renders with delay without errors', () => {
    expect(() =>
      render(<ScrollReveal delay={0.3}>content</ScrollReveal>)
    ).not.toThrow()
  })

  it('renders with once=false without errors', () => {
    expect(() =>
      render(<ScrollReveal once={false}>content</ScrollReveal>)
    ).not.toThrow()
  })
})
