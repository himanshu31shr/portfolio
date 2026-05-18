import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock all section components so this test only checks composition
vi.mock('@/components/Hero', () => ({
  Hero: () => <div data-testid="hero-section">Hero</div>,
}))
vi.mock('@/components/About', () => ({
  About: () => <div data-testid="about-section">About</div>,
}))
vi.mock('@/components/Experience', () => ({
  Experience: () => <div data-testid="experience-section">Experience</div>,
}))
vi.mock('@/components/Skills', () => ({
  Skills: () => <div data-testid="skills-section">Skills</div>,
}))
vi.mock('@/components/Projects', () => ({
  Projects: () => <div data-testid="projects-section">Projects</div>,
}))
vi.mock('@/components/BlogPreview', () => ({
  BlogPreview: () => <div data-testid="blog-preview-section">BlogPreview</div>,
}))
vi.mock('@/components/Contact', () => ({
  Contact: () => <div data-testid="contact-section">Contact</div>,
}))

describe('HomePage', () => {
  it('renders all sections', async () => {
    const { default: HomePage } = await import('@/app/page')
    render(<HomePage />)

    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('about-section')).toBeInTheDocument()
    expect(screen.getByTestId('experience-section')).toBeInTheDocument()
    expect(screen.getByTestId('skills-section')).toBeInTheDocument()
    expect(screen.getByTestId('projects-section')).toBeInTheDocument()
    expect(screen.getByTestId('blog-preview-section')).toBeInTheDocument()
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
  })

  it('renders sections in correct order', async () => {
    const { default: HomePage } = await import('@/app/page')
    const { container } = render(<HomePage />)

    const sections = container.querySelectorAll('[data-testid]')
    const sectionIds = Array.from(sections).map((s) => s.getAttribute('data-testid'))

    expect(sectionIds).toEqual([
      'hero-section',
      'about-section',
      'experience-section',
      'skills-section',
      'projects-section',
      'blog-preview-section',
      'contact-section',
    ])
  })
})
