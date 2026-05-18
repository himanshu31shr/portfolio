import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SectionHeading } from '@/components/SectionHeading'

describe('SectionHeading', () => {
  it('renders the title text', () => {
    render(<SectionHeading title="About Me" />)
    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument()
  })

  it('renders as an h2 element', () => {
    render(<SectionHeading title="Skills" />)
    const heading = screen.getByRole('heading', { level: 2, name: 'Skills' })
    expect(heading).toBeInTheDocument()
  })

  it('applies gradient-text class to title', () => {
    render(<SectionHeading title="Experience" />)
    const heading = screen.getByRole('heading', { name: 'Experience' })
    expect(heading).toHaveClass('gradient-text')
  })

  it('renders subtitle when provided', () => {
    render(<SectionHeading title="Skills" subtitle="Technologies I work with" />)
    expect(screen.getByText('Technologies I work with')).toBeInTheDocument()
  })

  it('does not render subtitle element when omitted', () => {
    render(<SectionHeading title="Skills" />)
    const subtitle = screen.queryByRole('paragraph')
    // subtitle is a <p> tag
    expect(subtitle).not.toBeInTheDocument()
  })

  it('applies center alignment class by default', () => {
    const { container } = render(<SectionHeading title="Test" />)
    expect(container.firstChild).toHaveClass('text-center')
  })

  it('applies left alignment class when align="left"', () => {
    const { container } = render(<SectionHeading title="Test" align="left" />)
    expect(container.firstChild).toHaveClass('text-left')
  })

  it('applies id attribute when provided', () => {
    const { container } = render(<SectionHeading title="Test" id="about-heading" />)
    expect(container.firstChild).toHaveAttribute('id', 'about-heading')
  })

  it('renders decorative divider element', () => {
    const { container } = render(<SectionHeading title="Test" />)
    const divider = container.querySelector('[aria-hidden="true"]')
    expect(divider).toBeInTheDocument()
  })

  it('centers divider when align is center', () => {
    const { container } = render(<SectionHeading title="Test" align="center" />)
    const divider = container.querySelector('[aria-hidden="true"]')
    expect(divider).toHaveClass('mx-auto')
  })

  it('does not center divider when align is left', () => {
    const { container } = render(<SectionHeading title="Test" align="left" />)
    const divider = container.querySelector('[aria-hidden="true"]')
    expect(divider).not.toHaveClass('mx-auto')
  })
})
