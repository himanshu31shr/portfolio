import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/case-studies', () => ({
  getCaseStudyBySlug: vi.fn(),
  getCaseStudySlugs: vi.fn(),
  getAllCaseStudies: vi.fn(),
}))

vi.mock('next-mdx-remote/rsc', () => ({
  MDXRemote: ({
    source,
    components,
  }: {
    source: string
    components?: Record<string, React.ComponentType<React.ComponentPropsWithoutRef<'img'>>>
  }) => {
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

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
}))

const mockCaseStudies = vi.mocked(await import('@/lib/case-studies'))

const MOCK_STUDY = {
  meta: {
    slug: 'credit-ops-automation',
    title: 'Credit Ops Automation Platform',
    date: '2026-07-15',
    excerpt: 'A great case study',
    clientRole: 'Consumer credit operations',
    role: 'Senior Full Stack Engineer',
    techStack: ['Node.js', 'React', 'MySQL'],
    metrics: ['40% reduction in manual intervention'],
    readTime: '8 min read',
    coverImage: '/images/case.jpg',
    published: true,
    repoUrl: '',
    npmUrl: '',
  },
  content: '# Test Content\n\nThis is the case study body.',
}

const MOCK_OTHER = [
  {
    slug: 'procurement-performance-suite',
    title: 'Procurement Performance Suite',
    date: '2026-07-14',
    excerpt: 'Other excerpt',
    clientRole: 'Enterprise procurement',
    role: 'Senior Full Stack Engineer',
    techStack: ['React'],
    metrics: [],
    readTime: '7 min read',
    coverImage: '',
    published: true,
    repoUrl: '',
    npmUrl: '',
  },
]

describe('CaseStudyPage', () => {
  it('renders the case study title', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([MOCK_STUDY.meta, ...MOCK_OTHER])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    expect(
      screen.getByRole('heading', { name: /credit ops automation platform/i })
    ).toBeInTheDocument()
  })

  it('renders the MDX content', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
  })

  it('renders tech stack tags', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders key metrics', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    expect(screen.getByLabelText(/key metrics/i)).toBeInTheDocument()
    expect(screen.getByText('40% reduction in manual intervention')).toBeInTheDocument()
  })

  it('omits tech stack and metrics when empty', async () => {
    const emptyExtras = {
      ...MOCK_STUDY,
      meta: { ...MOCK_STUDY.meta, techStack: [], metrics: [], coverImage: '' },
    }
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(emptyExtras)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    expect(screen.queryByLabelText('Tech stack')).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/key metrics/i)).not.toBeInTheDocument()
  })

  it('renders read time and role', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    expect(screen.getByText('8 min read')).toBeInTheDocument()
    expect(screen.getByText('Senior Full Stack Engineer')).toBeInTheDocument()
  })

  it('renders back to all case studies link', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    expect(screen.getByRole('link', { name: /back to all case studies/i })).toBeInTheDocument()
  })

  it('renders cover image when provided', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    expect(
      screen.getByAltText(/cover image for credit ops automation platform/i)
    ).toBeInTheDocument()
  })

  it('renders more case studies when available', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([MOCK_STUDY.meta, ...MOCK_OTHER])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    const region = screen.getByRole('region', { name: /more case studies/i })
    expect(region).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /read case study: procurement performance suite/i })
    ).toBeInTheDocument()
  })

  it('calls notFound when case study does not exist', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(null)

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')

    await expect(
      CaseStudyPage({ params: Promise.resolve({ slug: 'nonexistent' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })

  it('generateStaticParams returns slugs', async () => {
    mockCaseStudies.getCaseStudySlugs.mockReturnValue(['a', 'b'])
    const { generateStaticParams } = await import('@/app/case-studies/[slug]/page')
    const params = await generateStaticParams()
    expect(params).toEqual([{ slug: 'a' }, { slug: 'b' }])
  })

  it('generateMetadata returns correct metadata', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    const { generateMetadata } = await import('@/app/case-studies/[slug]/page')
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'credit-ops-automation' }),
    })
    expect(metadata.title).toBe('Credit Ops Automation Platform')
    expect(metadata.description).toBe('A great case study')
    expect(metadata.openGraph?.title).toBe('Credit Ops Automation Platform')
  })

  it('generateMetadata returns Not Found when missing', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(null)
    const { generateMetadata } = await import('@/app/case-studies/[slug]/page')
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'nonexistent' }),
    })
    expect(metadata.title).toBe('Case Study Not Found')
  })

  it('generateMetadata returns empty images when cover missing', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue({
      ...MOCK_STUDY,
      meta: { ...MOCK_STUDY.meta, coverImage: '' },
    })
    const { generateMetadata } = await import('@/app/case-studies/[slug]/page')
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'credit-ops-automation' }),
    })
    expect(metadata.openGraph?.images).toEqual([])
  })

  it('renders custom image elements inside MDXRemote with correct paths', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])

    const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH
    process.env.NEXT_PUBLIC_BASE_PATH = '/portfolio'

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    const { container } = render(
      await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) })
    )

    expect(screen.getByAltText('test-image-alt-external')).toHaveAttribute(
      'src',
      'http://external.com/test-img.jpg'
    )
    expect(screen.getByAltText('test-image-alt')).toHaveAttribute('src', '/portfolio/test-img.jpg')
    expect(screen.getByAltText('no-src-image')).toHaveAttribute('src', '/portfolio/')
    const noAltImg = container.querySelector('img[src*="no-alt.jpg"]')
    expect(noAltImg).not.toBeNull()
    expect(noAltImg).toHaveAttribute('alt', '')

    process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath
  })

  it('renders share bar and author card', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    expect(screen.getByRole('link', { name: /share on twitter/i })).toBeInTheDocument()
    expect(screen.getByText('Himanshu Shrivastava')).toBeInTheDocument()
  })

  it('renders GitHub and npm links when provided', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue({
      ...MOCK_STUDY,
      meta: {
        ...MOCK_STUDY.meta,
        repoUrl: 'https://github.com/himanshu31shr/linkedin-mcp-server',
        npmUrl: 'https://www.npmjs.com/package/@himanshu31shr/linkedin-mcp-server',
      },
    })
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    expect(screen.getByRole('link', { name: /view .* on github/i })).toHaveAttribute(
      'href',
      'https://github.com/himanshu31shr/linkedin-mcp-server'
    )
    expect(screen.getByRole('link', { name: /view .* on npm/i })).toHaveAttribute(
      'href',
      'https://www.npmjs.com/package/@himanshu31shr/linkedin-mcp-server'
    )
  })

  it('omits project links when repo and npm urls are empty', async () => {
    mockCaseStudies.getCaseStudyBySlug.mockReturnValue(MOCK_STUDY)
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])

    const { default: CaseStudyPage } = await import('@/app/case-studies/[slug]/page')
    render(await CaseStudyPage({ params: Promise.resolve({ slug: 'credit-ops-automation' }) }))

    expect(screen.queryByLabelText('Project links')).not.toBeInTheDocument()
  })
})
