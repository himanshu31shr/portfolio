import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock the blog module
vi.mock('@/lib/blog', () => ({
  getAllPosts: vi.fn(),
}))

const mockGetAllPosts = vi.mocked(await import('@/lib/blog')).getAllPosts

const MOCK_POSTS = [
  {
    slug: 'test-post',
    title: 'Test Post Title',
    date: '2026-05-01',
    excerpt: 'A test excerpt',
    tags: ['nextjs', 'react'],
    readTime: '5 min read',
    coverImage: '/images/blog/test.jpg',
    published: true,
  },
]

describe('BlogPage', () => {
  it('renders the Blog heading', async () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByRole('heading', { name: /blog/i })).toBeInTheDocument()
  })

  it('renders post titles from getAllPosts', async () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByText('Test Post Title')).toBeInTheDocument()
  })

  it('renders empty state when no posts', async () => {
    mockGetAllPosts.mockReturnValue([])
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByText(/no posts yet/i)).toBeInTheDocument()
  })

  it('renders Back to Home link in empty state', async () => {
    mockGetAllPosts.mockReturnValue([])
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })

  it('renders post links when posts exist', async () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    const postLink = screen.getByRole('link', { name: /read: test post title/i })
    expect(postLink).toHaveAttribute('href', '/blog/test-post')
  })

  it('renders post read time', async () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('renders post tags', async () => {
    mockGetAllPosts.mockReturnValue(MOCK_POSTS)
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByText('nextjs')).toBeInTheDocument()
  })
})
