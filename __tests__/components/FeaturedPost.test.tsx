import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { FeaturedPost } from '@/components/FeaturedPost'

vi.mock('@/lib/blog', () => ({
  getLatestPost: vi.fn(),
}))

const mockGetLatestPost = vi.mocked(await import('@/lib/blog')).getLatestPost

const MOCK_POST = {
  slug: 'latest-post',
  title: 'Latest Post Title',
  date: '2026-05-15',
  excerpt: 'This is the latest post excerpt.',
  tags: ['ai', 'engineering', 'ci-cd', 'testing'],
  readTime: '8 min read',
  coverImage: '/images/blog/latest.jpg',
  published: true,
  series: '',
  seriesOrder: 0,
}

describe('FeaturedPost', () => {
  it('renders nothing when there are no posts', () => {
    mockGetLatestPost.mockReturnValue(null)
    const { container } = render(<FeaturedPost />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the Latest Article heading', () => {
    mockGetLatestPost.mockReturnValue(MOCK_POST)
    render(<FeaturedPost />)
    expect(screen.getByText('Latest Article')).toBeInTheDocument()
  })

  it('renders the post title', () => {
    mockGetLatestPost.mockReturnValue(MOCK_POST)
    render(<FeaturedPost />)
    expect(screen.getByText('Latest Post Title')).toBeInTheDocument()
  })

  it('renders the post excerpt', () => {
    mockGetLatestPost.mockReturnValue(MOCK_POST)
    render(<FeaturedPost />)
    expect(screen.getByText('This is the latest post excerpt.')).toBeInTheDocument()
  })

  it('renders the cover image', () => {
    mockGetLatestPost.mockReturnValue(MOCK_POST)
    render(<FeaturedPost />)
    expect(screen.getByAltText(/cover image for latest post title/i)).toBeInTheDocument()
  })

  it('renders up to 4 tags', () => {
    mockGetLatestPost.mockReturnValue(MOCK_POST)
    render(<FeaturedPost />)
    expect(screen.getByText('ai')).toBeInTheDocument()
    expect(screen.getByText('engineering')).toBeInTheDocument()
    expect(screen.getByText('ci-cd')).toBeInTheDocument()
    expect(screen.getByText('testing')).toBeInTheDocument()
  })

  it('links to the correct post', () => {
    mockGetLatestPost.mockReturnValue(MOCK_POST)
    render(<FeaturedPost />)
    const link = screen.getByRole('link', { name: /read featured article/i })
    expect(link).toHaveAttribute('href', '/blog/latest-post')
  })

  it('renders read time', () => {
    mockGetLatestPost.mockReturnValue(MOCK_POST)
    render(<FeaturedPost />)
    expect(screen.getByText('8 min read')).toBeInTheDocument()
  })

  it('renders Read Article CTA', () => {
    mockGetLatestPost.mockReturnValue(MOCK_POST)
    render(<FeaturedPost />)
    expect(screen.getByText('Read Article')).toBeInTheDocument()
  })

  it('renders without cover image', () => {
    mockGetLatestPost.mockReturnValue({ ...MOCK_POST, coverImage: '' })
    render(<FeaturedPost />)
    expect(screen.getByText('Latest Post Title')).toBeInTheDocument()
    expect(screen.queryByAltText(/cover image/i)).not.toBeInTheDocument()
  })
})
