import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BlogPreview } from '@/components/BlogPreview'

// Mock the blog module
vi.mock('@/lib/blog', () => ({
  getAllPosts: vi.fn(),
}))

const mockGetAllPosts = vi.mocked(await import('@/lib/blog')).getAllPosts

const MOCK_POSTS = [
  {
    slug: 'post-one',
    title: 'Post One Title',
    date: '2026-05-01',
    excerpt: 'First post excerpt',
    tags: ['nextjs', 'react'],
    readTime: '5 min read',
    coverImage: '/images/blog/post-one.jpg',
    published: true,
  },
  {
    slug: 'post-two',
    title: 'Post Two Title',
    date: '2026-04-01',
    excerpt: 'Second post excerpt',
    tags: ['typescript'],
    readTime: '7 min read',
    coverImage: '',
    published: true,
  },
  {
    slug: 'post-three',
    title: 'Post Three Title',
    date: '2026-03-01',
    excerpt: 'Third post excerpt',
    tags: ['aws'],
    readTime: '9 min read',
    coverImage: '/images/blog/post-three.jpg',
    published: true,
  },
]

describe('BlogPreview', () => {
  it('renders nothing when there are no posts', () => {
    mockGetAllPosts.mockReturnValue([])
    const { container } = render(<BlogPreview />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the From the Blog heading when posts exist', () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    render(<BlogPreview />)
    expect(screen.getByRole('heading', { name: /from the blog/i })).toBeInTheDocument()
  })

  it('renders up to 3 posts', () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    render(<BlogPreview />)
    expect(screen.getByText('Post One Title')).toBeInTheDocument()
    expect(screen.getByText('Post Two Title')).toBeInTheDocument()
    expect(screen.getByText('Post Three Title')).toBeInTheDocument()
  })

  it('renders post excerpts', () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    render(<BlogPreview />)
    expect(screen.getByText('First post excerpt')).toBeInTheDocument()
  })

  it('renders post tags', () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    render(<BlogPreview />)
    expect(screen.getByText('nextjs')).toBeInTheDocument()
    expect(screen.getByText('react')).toBeInTheDocument()
  })

  it('renders cover images for posts that have them', () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    render(<BlogPreview />)
    const coverImages = screen.getAllByAltText(/cover image for/i)
    expect(coverImages.length).toBeGreaterThan(0)
  })

  it('renders View All Posts link', () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    render(<BlogPreview />)
    expect(screen.getByRole('link', { name: /view all blog posts/i })).toBeInTheDocument()
  })

  it('each post card links to the correct slug', () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    render(<BlogPreview />)
    const postLinks = screen.getAllByRole('link', { name: /read:/i })
    expect(postLinks[0]).toHaveAttribute('href', '/blog/post-one')
  })

  it('renders read times', () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    render(<BlogPreview />)
    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('limits to 3 posts even when more are available', () => {
    const manyPosts = [...MOCK_POSTS, ...MOCK_POSTS, ...MOCK_POSTS]
    mockGetAllPosts.mockReturnValue(manyPosts)
    render(<BlogPreview />)
    // Only 3 "Read:" links should appear
    const postLinks = screen.getAllByRole('link', { name: /read:/i })
    expect(postLinks).toHaveLength(3)
  })
})
