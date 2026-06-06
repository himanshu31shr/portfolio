import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { LatestPosts } from '@/components/LatestPosts'

vi.mock('@/lib/blog', () => ({
  getAllPosts: vi.fn(),
}))

const mockGetAllPosts = vi.mocked(await import('@/lib/blog')).getAllPosts

const makePosts = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    slug: `post-${i}`,
    title: `Post ${i} Title`,
    date: `2026-0${Math.min(i + 1, 9)}-01`,
    excerpt: `Excerpt for post ${i}`,
    tags: ['tag-a'],
    readTime: `${i + 3} min read`,
    coverImage: i % 2 === 0 ? `/images/blog/post-${i}.jpg` : '',
    published: true,
    series: '',
    seriesOrder: 0,
  }))

describe('LatestPosts', () => {
  it('renders nothing when 0-1 posts exist (only featured)', () => {
    mockGetAllPosts.mockReturnValue(makePosts(1))
    const { container } = render(<LatestPosts />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the Latest Writing heading', () => {
    mockGetAllPosts.mockReturnValue(makePosts(4))
    render(<LatestPosts />)
    expect(screen.getByRole('heading', { name: /latest writing/i })).toBeInTheDocument()
  })

  it('skips the first post (featured) and shows the rest', () => {
    mockGetAllPosts.mockReturnValue(makePosts(4))
    render(<LatestPosts />)
    // First post (index 0) should NOT appear
    expect(screen.queryByText('Post 0 Title')).not.toBeInTheDocument()
    // Posts 1-3 should appear
    expect(screen.getByText('Post 1 Title')).toBeInTheDocument()
    expect(screen.getByText('Post 2 Title')).toBeInTheDocument()
    expect(screen.getByText('Post 3 Title')).toBeInTheDocument()
  })

  it('limits to 6 posts max (excluding featured)', () => {
    mockGetAllPosts.mockReturnValue(makePosts(10))
    render(<LatestPosts />)
    const postLinks = screen.getAllByRole('link', { name: /read:/i })
    expect(postLinks).toHaveLength(6)
  })

  it('renders View Archive CTA', () => {
    mockGetAllPosts.mockReturnValue(makePosts(4))
    render(<LatestPosts />)
    expect(screen.getByRole('link', { name: /view all blog posts/i })).toBeInTheDocument()
  })

  it('renders post excerpts', () => {
    mockGetAllPosts.mockReturnValue(makePosts(3))
    render(<LatestPosts />)
    expect(screen.getByText('Excerpt for post 1')).toBeInTheDocument()
  })

  it('renders tags', () => {
    mockGetAllPosts.mockReturnValue(makePosts(3))
    render(<LatestPosts />)
    expect(screen.getAllByText('tag-a').length).toBeGreaterThan(0)
  })

  it('renders cover images when available', () => {
    mockGetAllPosts.mockReturnValue(makePosts(4))
    render(<LatestPosts />)
    // Post 2 has a cover image (even index, but we skip post 0)
    expect(screen.getByAltText(/cover image for post 2/i)).toBeInTheDocument()
  })
})
