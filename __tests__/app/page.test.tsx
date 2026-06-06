import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock all section components so this test only checks composition
vi.mock('@/components/Hero', () => ({
  Hero: ({ latestPost }: { latestPost?: unknown }) => (
    <div data-testid="hero-section">Hero{latestPost ? ' with latest' : ''}</div>
  ),
}))
vi.mock('@/components/FeaturedPost', () => ({
  FeaturedPost: () => <div data-testid="featured-post-section">FeaturedPost</div>,
}))
vi.mock('@/components/LatestPosts', () => ({
  LatestPosts: () => <div data-testid="latest-posts-section">LatestPosts</div>,
}))
vi.mock('@/components/About', () => ({
  About: () => <div data-testid="about-section">About</div>,
}))
vi.mock('@/components/Experience', () => ({
  Experience: () => <div data-testid="experience-section">Experience</div>,
}))
vi.mock('@/components/Projects', () => ({
  Projects: () => <div data-testid="projects-section">Projects</div>,
}))
vi.mock('@/components/Contact', () => ({
  Contact: () => <div data-testid="contact-section">Contact</div>,
}))
vi.mock('@/lib/blog', () => ({
  getLatestPost: vi.fn(() => ({
    slug: 'test',
    title: 'Test',
    date: '2026-01-01',
    excerpt: '',
    tags: [],
    readTime: '5 min',
    coverImage: '',
    published: true,
    series: '',
    seriesOrder: 0,
  })),
}))

describe('HomePage', () => {
  it('renders all sections', async () => {
    const { default: HomePage } = await import('@/app/page')
    render(<HomePage />)

    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('featured-post-section')).toBeInTheDocument()
    expect(screen.getByTestId('latest-posts-section')).toBeInTheDocument()
    expect(screen.getByTestId('about-section')).toBeInTheDocument()
    expect(screen.getByTestId('experience-section')).toBeInTheDocument()
    expect(screen.getByTestId('projects-section')).toBeInTheDocument()
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
  })

  it('renders sections in correct order', async () => {
    const { default: HomePage } = await import('@/app/page')
    const { container } = render(<HomePage />)

    const sections = container.querySelectorAll('[data-testid]')
    const sectionIds = Array.from(sections).map((s) => s.getAttribute('data-testid'))

    expect(sectionIds).toEqual([
      'hero-section',
      'featured-post-section',
      'latest-posts-section',
      'about-section',
      'experience-section',
      'projects-section',
      'contact-section',
    ])
  })
})
