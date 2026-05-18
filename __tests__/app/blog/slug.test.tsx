import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock the blog module
vi.mock('@/lib/blog', () => ({
  getPostBySlug: vi.fn(),
  getPostSlugs: vi.fn(),
  getAllPosts: vi.fn(),
}))

// Mock next-mdx-remote/rsc
vi.mock('next-mdx-remote/rsc', () => ({
  MDXRemote: ({ source }: { source: string }) => (
    <div data-testid="mdx-content">{source}</div>
  ),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => { throw new Error('NEXT_NOT_FOUND') }),
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
}))

const mockBlog = vi.mocked(await import('@/lib/blog'))

const MOCK_POST = {
  meta: {
    slug: 'test-post',
    title: 'My Test Post',
    date: '2026-05-01',
    excerpt: 'A great post about testing',
    tags: ['testing', 'vitest'],
    readTime: '5 min read',
    coverImage: '/images/blog/test.jpg',
    published: true,
  },
  content: '# Test Content\n\nThis is the post body.',
}

const MOCK_RELATED = [
  {
    slug: 'related-post',
    title: 'Related Post',
    date: '2026-04-01',
    excerpt: 'Related excerpt',
    tags: ['related'],
    readTime: '3 min read',
    coverImage: '',
    published: true,
  },
]

describe('BlogPostPage', () => {
  it('renders the post title', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getAllPosts.mockReturnValue(MOCK_RELATED)
    mockBlog.getPostSlugs.mockReturnValue(['test-post'])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByRole('heading', { name: /my test post/i })).toBeInTheDocument()
  })

  it('renders the MDX content', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getAllPosts.mockReturnValue(MOCK_RELATED)

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
  })

  it('renders the post tags', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getAllPosts.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByText('testing')).toBeInTheDocument()
    expect(screen.getByText('vitest')).toBeInTheDocument()
  })

  it('renders the read time', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getAllPosts.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('renders back to all posts link', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getAllPosts.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByRole('link', { name: /back to all blog posts/i })).toBeInTheDocument()
  })

  it('renders cover image when provided', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getAllPosts.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByAltText(/cover image for my test post/i)).toBeInTheDocument()
  })

  it('renders related posts when available', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getAllPosts.mockReturnValue(MOCK_RELATED)

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByRole('region', { name: /related posts/i })).toBeInTheDocument()
    expect(screen.getByText('Related Post')).toBeInTheDocument()
  })

  it('calls notFound when post does not exist', async () => {
    mockBlog.getPostBySlug.mockReturnValue(null)

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')

    await expect(
      BlogPostPage({ params: Promise.resolve({ slug: 'nonexistent' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })

  it('generateStaticParams returns slugs from getPostSlugs', async () => {
    mockBlog.getPostSlugs.mockReturnValue(['post-a', 'post-b'])
    const { generateStaticParams } = await import('@/app/blog/[slug]/page')
    const params = await generateStaticParams()
    expect(params).toEqual([{ slug: 'post-a' }, { slug: 'post-b' }])
  })
})
