import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock the blog module
vi.mock('@/lib/blog', () => ({
  getAllPosts: vi.fn(),
  getAllTags: vi.fn(),
}))

const mockBlog = vi.mocked(await import('@/lib/blog'))

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
    series: '',
    seriesOrder: 0,
  },
]

describe('BlogPage', () => {
  it('renders the Writing heading', async () => {
    mockBlog.getAllPosts.mockReturnValue(MOCK_POSTS)
    mockBlog.getAllTags.mockReturnValue(['nextjs', 'react'])
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByRole('heading', { name: /writing/i })).toBeInTheDocument()
  })

  it('renders post titles from getAllPosts', async () => {
    mockBlog.getAllPosts.mockReturnValue(MOCK_POSTS)
    mockBlog.getAllTags.mockReturnValue(['nextjs', 'react'])
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByText('Test Post Title')).toBeInTheDocument()
  })

  it('renders empty state when no posts', async () => {
    mockBlog.getAllPosts.mockReturnValue([])
    mockBlog.getAllTags.mockReturnValue([])
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByText(/no posts yet/i)).toBeInTheDocument()
  })

  it('renders Back to Home link in empty state', async () => {
    mockBlog.getAllPosts.mockReturnValue([])
    mockBlog.getAllTags.mockReturnValue([])
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })

  it('renders post links when posts exist', async () => {
    mockBlog.getAllPosts.mockReturnValue(MOCK_POSTS)
    mockBlog.getAllTags.mockReturnValue(['nextjs', 'react'])
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    const postLink = screen.getByRole('link', { name: /read: test post title/i })
    expect(postLink).toHaveAttribute('href', '/blog/test-post')
  })

  it('renders post read time', async () => {
    mockBlog.getAllPosts.mockReturnValue(MOCK_POSTS)
    mockBlog.getAllTags.mockReturnValue(['nextjs', 'react'])
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('renders post tags', async () => {
    mockBlog.getAllPosts.mockReturnValue(MOCK_POSTS)
    mockBlog.getAllTags.mockReturnValue(['nextjs', 'react'])
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    const elements = screen.getAllByText('nextjs')
    expect(elements.length).toBeGreaterThan(0)
  })

  it('renders tag filter buttons', async () => {
    mockBlog.getAllPosts.mockReturnValue(MOCK_POSTS)
    mockBlog.getAllTags.mockReturnValue(['nextjs', 'react'])
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
  })

  it('renders article count', async () => {
    mockBlog.getAllPosts.mockReturnValue(MOCK_POSTS)
    mockBlog.getAllTags.mockReturnValue(['nextjs', 'react'])
    const { default: BlogPage } = await import('@/app/blog/page')
    render(<BlogPage />)
    expect(screen.getByText(/1 article/i)).toBeInTheDocument()
  })
})
