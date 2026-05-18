import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AnimatedBackground } from '@/components/AnimatedBackground'

describe('AnimatedBackground', () => {
  it('renders without throwing', () => {
    expect(() => render(<AnimatedBackground />)).not.toThrow()
  })

  it('has aria-hidden attribute for accessibility', () => {
    render(<AnimatedBackground />)
    const bg = screen.getByTestId('animated-background')
    expect(bg).toHaveAttribute('aria-hidden', 'true')
  })

  it('has pointer-events-none class to avoid blocking interactions', () => {
    render(<AnimatedBackground />)
    const bg = screen.getByTestId('animated-background')
    expect(bg).toHaveClass('pointer-events-none')
  })

  it('is positioned fixed to stay behind content', () => {
    render(<AnimatedBackground />)
    const bg = screen.getByTestId('animated-background')
    expect(bg).toHaveClass('fixed')
  })

  it('renders 3 gradient orb elements', () => {
    const { container } = render(<AnimatedBackground />)
    // Each orb has 'rounded-full blur-3xl opacity-' prefix
    const orbs = container.querySelectorAll('.rounded-full.blur-3xl')
    expect(orbs).toHaveLength(3)
  })
})
