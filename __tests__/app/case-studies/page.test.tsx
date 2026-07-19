import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/case-studies', () => ({
  getAllCaseStudies: vi.fn(),
}))

const mockCaseStudies = vi.mocked(await import('@/lib/case-studies'))

const MOCK_STUDIES = [
  {
    slug: 'credit-ops-automation',
    title: 'Credit Ops Automation Platform',
    date: '2026-07-15',
    excerpt: 'A test excerpt about credit ops',
    clientRole: 'Consumer credit operations',
    role: 'Senior Full Stack Engineer',
    techStack: ['Node.js', 'React'],
    metrics: ['40% reduction in manual intervention', '60% increase in client handling capacity'],
    readTime: '8 min read',
    coverImage: '',
    published: true,
    repoUrl: '',
    npmUrl: '',
  },
]

describe('CaseStudiesPage', () => {
  it('renders the Case Studies heading', async () => {
    mockCaseStudies.getAllCaseStudies.mockReturnValue(MOCK_STUDIES)
    const { default: CaseStudiesPage } = await import('@/app/case-studies/page')
    render(<CaseStudiesPage />)
    expect(screen.getByRole('heading', { name: /case studies/i })).toBeInTheDocument()
  })

  it('renders study titles from getAllCaseStudies', async () => {
    mockCaseStudies.getAllCaseStudies.mockReturnValue(MOCK_STUDIES)
    const { default: CaseStudiesPage } = await import('@/app/case-studies/page')
    render(<CaseStudiesPage />)
    expect(screen.getByText('Credit Ops Automation Platform')).toBeInTheDocument()
  })

  it('renders empty state when no studies', async () => {
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])
    const { default: CaseStudiesPage } = await import('@/app/case-studies/page')
    render(<CaseStudiesPage />)
    expect(screen.getByText(/no case studies published yet/i)).toBeInTheDocument()
  })

  it('renders Back to Home link in empty state', async () => {
    mockCaseStudies.getAllCaseStudies.mockReturnValue([])
    const { default: CaseStudiesPage } = await import('@/app/case-studies/page')
    render(<CaseStudiesPage />)
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })

  it('renders study links when studies exist', async () => {
    mockCaseStudies.getAllCaseStudies.mockReturnValue(MOCK_STUDIES)
    const { default: CaseStudiesPage } = await import('@/app/case-studies/page')
    render(<CaseStudiesPage />)
    const link = screen.getByRole('link', { name: /read case study: credit ops automation platform/i })
    expect(link).toHaveAttribute('href', '/case-studies/credit-ops-automation')
  })

  it('renders read time', async () => {
    mockCaseStudies.getAllCaseStudies.mockReturnValue(MOCK_STUDIES)
    const { default: CaseStudiesPage } = await import('@/app/case-studies/page')
    render(<CaseStudiesPage />)
    expect(screen.getByText('8 min read')).toBeInTheDocument()
  })

  it('renders key metrics when present', async () => {
    mockCaseStudies.getAllCaseStudies.mockReturnValue(MOCK_STUDIES)
    const { default: CaseStudiesPage } = await import('@/app/case-studies/page')
    render(<CaseStudiesPage />)
    expect(screen.getByText('Key Metrics')).toBeInTheDocument()
    expect(screen.getByText('40% reduction in manual intervention')).toBeInTheDocument()
  })

  it('omits metrics section when metrics are empty', async () => {
    mockCaseStudies.getAllCaseStudies.mockReturnValue([
      { ...MOCK_STUDIES[0], metrics: [] },
    ])
    const { default: CaseStudiesPage } = await import('@/app/case-studies/page')
    render(<CaseStudiesPage />)
    expect(screen.queryByText('Key Metrics')).not.toBeInTheDocument()
  })
})
