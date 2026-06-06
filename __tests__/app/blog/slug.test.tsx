import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock the blog module
vi.mock('@/lib/blog', () => ({
  getPostBySlug: vi.fn(),
  getPostSlugs: vi.fn(),
  getRelatedPosts: vi.fn(),
  getPostsInSeries: vi.fn(),
}))

// Mock next-mdx-remote/rsc
vi.mock('next-mdx-remote/rsc', () => ({
  MDXRemote: ({ source, components }: { source: string; components?: Record<string, React.ComponentType<React.ComponentPropsWithoutRef<'img'>>> }) => {
    if (components && components.img) {
      const ImgComponent = components.img
      return (
        <div data-testid="mdx-content">
          {source}
          <ImgComponent src="/test-img.jpg" alt="test-image-alt" />
          <ImgComponent src="http://external.com/test-img.jpg" alt="test-image-alt-external" />
          <ImgComponent alt="no-src-image" />
          <ImgComponent src="/no-alt.jpg" />
        </div>
      )
    }
    return <div data-testid="mdx-content">{source}</div>
  },
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
    series: '',
    seriesOrder: 0,
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
    coverImage: '/images/related.jpg',
    published: true,
    series: '',
    seriesOrder: 0,
  },
]

describe('BlogPostPage', () => {
  it('renders the post title', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getRelatedPosts.mockReturnValue(MOCK_RELATED)
    mockBlog.getPostsInSeries.mockReturnValue([])
    mockBlog.getPostSlugs.mockReturnValue(['test-post'])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByRole('heading', { name: /my test post/i })).toBeInTheDocument()
  })

  it('renders the MDX content', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getRelatedPosts.mockReturnValue(MOCK_RELATED)
    mockBlog.getPostsInSeries.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
  })

  it('renders the post tags', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getRelatedPosts.mockReturnValue([])
    mockBlog.getPostsInSeries.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByText('testing')).toBeInTheDocument()
    expect(screen.getByText('vitest')).toBeInTheDocument()
  })

  it('renders the read time', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getRelatedPosts.mockReturnValue([])
    mockBlog.getPostsInSeries.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('renders back to all posts link', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getRelatedPosts.mockReturnValue([])
    mockBlog.getPostsInSeries.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByRole('link', { name: /back to all blog posts/i })).toBeInTheDocument()
  })

  it('renders cover image when provided', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getRelatedPosts.mockReturnValue([])
    mockBlog.getPostsInSeries.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByAltText(/cover image for my test post/i)).toBeInTheDocument()
  })

  it('renders without cover image when not provided', async () => {
    const postWithoutCover = {
      ...MOCK_POST,
      meta: { ...MOCK_POST.meta, coverImage: '' },
    }
    mockBlog.getPostBySlug.mockReturnValue(postWithoutCover)
    mockBlog.getRelatedPosts.mockReturnValue([])
    mockBlog.getPostsInSeries.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.queryByAltText(/cover image for my test post/i)).not.toBeInTheDocument()
  })

  it('renders related posts when available', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getRelatedPosts.mockReturnValue(MOCK_RELATED)
    mockBlog.getPostsInSeries.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByRole('region', { name: /related posts/i })).toBeInTheDocument()
    expect(screen.getAllByText('Related Post')[0]).toBeInTheDocument()
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

  it('generateMetadata returns correct metadata for valid post', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    const { generateMetadata } = await import('@/app/blog/[slug]/page')
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'test-post' }) })
    expect(metadata.title).toBe('My Test Post')
    expect(metadata.description).toBe('A great post about testing')
    expect(metadata.openGraph?.title).toBe('My Test Post')
  })

  it('generateMetadata returns Not Found title when post does not exist', async () => {
    mockBlog.getPostBySlug.mockReturnValue(null)
    const { generateMetadata } = await import('@/app/blog/[slug]/page')
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'nonexistent' }) })
    expect(metadata.title).toBe('Post Not Found')
  })

  it('renders custom image elements inside MDXRemote with correct paths', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getRelatedPosts.mockReturnValue([])
    mockBlog.getPostsInSeries.mockReturnValue([])

    // Set process.env.NEXT_PUBLIC_BASE_PATH to test the base path logic
    const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH
    process.env.NEXT_PUBLIC_BASE_PATH = '/portfolio'

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    const { container } = render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    // External image should preserve its src
    const externalImg = screen.getByAltText('test-image-alt-external')
    expect(externalImg).toHaveAttribute('src', 'http://external.com/test-img.jpg')

    // Internal image should have the base path prepended
    const internalImg = screen.getByAltText('test-image-alt')
    expect(internalImg).toHaveAttribute('src', '/portfolio/test-img.jpg')

    // No-src image should have base path prepended to empty string
    const noSrcImg = screen.getByAltText('no-src-image')
    expect(noSrcImg).toHaveAttribute('src', '/portfolio/')

    // No-alt image should have fallback alt of empty string (queried directly as it has no implicit img role)
    const noAltImg = container.querySelector('img[src*="no-alt.jpg"]')
    expect(noAltImg).not.toBeNull()
    expect(noAltImg).toHaveAttribute('alt', '')

    // Restore environment
    process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath
  })

  it('generateMetadata returns empty images array when coverImage is not present', async () => {
    const postWithoutCover = {
      ...MOCK_POST,
      meta: {
        ...MOCK_POST.meta,
        coverImage: '',
      },
    }
    mockBlog.getPostBySlug.mockReturnValue(postWithoutCover)
    const { generateMetadata } = await import('@/app/blog/[slug]/page')
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'test-post' }) })
    expect(metadata.openGraph?.images).toEqual([])
  })

  it('renders author card at the bottom', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getRelatedPosts.mockReturnValue([])
    mockBlog.getPostsInSeries.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    // AuthorCard renders the author name
    expect(screen.getByText('Himanshu Shrivastava')).toBeInTheDocument()
  })

  it('renders share bar', async () => {
    mockBlog.getPostBySlug.mockReturnValue(MOCK_POST)
    mockBlog.getRelatedPosts.mockReturnValue([])
    mockBlog.getPostsInSeries.mockReturnValue([])

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByRole('link', { name: /share on twitter/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /share on linkedin/i })).toBeInTheDocument()
  })

  it('renders series navigation when post is part of a series', async () => {
    const seriesPost = {
      ...MOCK_POST,
      meta: { ...MOCK_POST.meta, series: 'Test Series', seriesOrder: 1 },
    }
    const seriesPosts = [
      { ...MOCK_POST.meta, slug: 'prev-post', series: 'Test Series', seriesOrder: 0 },
      { ...MOCK_POST.meta, slug: 'test-post', series: 'Test Series', seriesOrder: 1 },
      { ...MOCK_POST.meta, slug: 'next-post', series: 'Test Series', seriesOrder: 2 },
    ]
    mockBlog.getPostBySlug.mockReturnValue(seriesPost)
    mockBlog.getRelatedPosts.mockReturnValue([])
    mockBlog.getPostsInSeries.mockReturnValue(seriesPosts)

    const { default: BlogPostPage } = await import('@/app/blog/[slug]/page')
    render(await BlogPostPage({ params: Promise.resolve({ slug: 'test-post' }) }))

    expect(screen.getByText(/part 2 of 3/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /previous in series/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /next in series/i })).toBeInTheDocument()
  })
})
