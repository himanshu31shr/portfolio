import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockExistsSync = vi.fn()
const mockReaddirSync = vi.fn()
const mockReadFileSync = vi.fn()

vi.mock('fs', () => ({
  default: {
    existsSync: mockExistsSync,
    readdirSync: mockReaddirSync,
    readFileSync: mockReadFileSync,
  },
  existsSync: mockExistsSync,
  readdirSync: mockReaddirSync,
  readFileSync: mockReadFileSync,
}))

const MOCK_PUBLISHED = `---
title: "Credit Ops Automation Platform"
date: "2026-07-15"
excerpt: "A test excerpt"
clientRole: "Consumer credit operations"
role: "Senior Full Stack Engineer"
techStack: ["Node.js", "React"]
metrics:
  - "40% reduction in manual intervention"
published: true
readTime: "8 min read"
coverImage: ""
repoUrl: "https://github.com/example/repo"
npmUrl: "https://www.npmjs.com/package/example"
---

# Body content
`

const MOCK_DRAFT = `---
title: "Draft Study"
date: "2026-06-01"
excerpt: "Draft"
clientRole: "Other"
role: "Engineer"
techStack: []
metrics: []
published: false
readTime: "3 min read"
coverImage: ""
---

# Draft
`

const MOCK_OLDER = `---
title: "Older Study"
date: "2026-07-13"
excerpt: "Older excerpt"
clientRole: "Gaming"
role: "Senior Full Stack Engineer"
techStack: ["Node.js"]
metrics:
  - "Real-time communication"
published: true
readTime: "7 min read"
coverImage: "/images/case.jpg"
---

# Older
`

describe('case-studies utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('getAllCaseStudies', () => {
    it('returns empty array when directory does not exist', async () => {
      mockExistsSync.mockReturnValue(false)
      const { getAllCaseStudies } = await import('@/lib/case-studies')
      expect(getAllCaseStudies()).toEqual([])
    })

    it('returns only published case studies', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['published.mdx', 'draft.mdx'])
      mockReadFileSync.mockImplementation((p: string) => {
        if (String(p).includes('published')) return MOCK_PUBLISHED
        return MOCK_DRAFT
      })

      const { getAllCaseStudies } = await import('@/lib/case-studies')
      const studies = getAllCaseStudies()

      expect(studies).toHaveLength(1)
      expect(studies[0].title).toBe('Credit Ops Automation Platform')
      expect(studies[0].published).toBe(true)
      expect(studies[0].clientRole).toBe('Consumer credit operations')
      expect(studies[0].techStack).toContain('Node.js')
      expect(studies[0].metrics[0]).toContain('40%')
      expect(studies[0].repoUrl).toBe('https://github.com/example/repo')
      expect(studies[0].npmUrl).toBe('https://www.npmjs.com/package/example')
    })

    it('sorts by date descending', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['older.mdx', 'published.mdx'])
      mockReadFileSync.mockImplementation((p: string) => {
        if (String(p).includes('older')) return MOCK_OLDER
        return MOCK_PUBLISHED
      })

      const { getAllCaseStudies } = await import('@/lib/case-studies')
      const studies = getAllCaseStudies()

      expect(studies[0].slug).toBe('published')
      expect(studies[1].slug).toBe('older')
    })

    it('defaults missing frontmatter fields', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['minimal.mdx'])
      mockReadFileSync.mockReturnValue(`---
published: true
---

# Minimal
`)

      const { getAllCaseStudies } = await import('@/lib/case-studies')
      const [study] = getAllCaseStudies()

      expect(study.title).toBe('')
      expect(study.date).toBe('')
      expect(study.excerpt).toBe('')
      expect(study.clientRole).toBe('')
      expect(study.role).toBe('')
      expect(study.techStack).toEqual([])
      expect(study.metrics).toEqual([])
      expect(study.readTime).toBe('')
      expect(study.coverImage).toBe('')
      expect(study.repoUrl).toBe('')
      expect(study.npmUrl).toBe('')
    })

    it('filters non-mdx files', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['published.mdx', '.DS_Store', 'readme.txt'])
      mockReadFileSync.mockReturnValue(MOCK_PUBLISHED)

      const { getAllCaseStudies } = await import('@/lib/case-studies')
      expect(getAllCaseStudies()).toHaveLength(1)
    })
  })

  describe('getCaseStudyBySlug', () => {
    it('returns null when file does not exist', async () => {
      mockExistsSync.mockReturnValue(false)
      const { getCaseStudyBySlug } = await import('@/lib/case-studies')
      expect(getCaseStudyBySlug('missing')).toBeNull()
    })

    it('returns meta and content for existing slug', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue(MOCK_PUBLISHED)

      const { getCaseStudyBySlug } = await import('@/lib/case-studies')
      const result = getCaseStudyBySlug('credit-ops-automation')

      expect(result?.meta.slug).toBe('credit-ops-automation')
      expect(result?.meta.title).toBe('Credit Ops Automation Platform')
      expect(result?.content).toContain('Body content')
    })

    it('defaults published to false when omitted', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue(`---
title: "No Published Flag"
---

# Body
`)

      const { getCaseStudyBySlug } = await import('@/lib/case-studies')
      const result = getCaseStudyBySlug('no-flag')

      expect(result?.meta.published).toBe(false)
      expect(result?.meta.title).toBe('No Published Flag')
    })
  })

  describe('getCaseStudySlugs', () => {
    it('returns empty array when directory does not exist', async () => {
      mockExistsSync.mockReturnValue(false)
      const { getCaseStudySlugs } = await import('@/lib/case-studies')
      expect(getCaseStudySlugs()).toEqual([])
    })

    it('returns slugs derived from filenames', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue([
        'credit-ops-automation.mdx',
        'procurement-performance-suite.mdx',
        '.DS_Store',
      ])

      const { getCaseStudySlugs } = await import('@/lib/case-studies')
      const slugs = getCaseStudySlugs()

      expect(slugs).toContain('credit-ops-automation')
      expect(slugs).toContain('procurement-performance-suite')
      expect(slugs).not.toContain('.DS_Store')
      expect(slugs).toHaveLength(2)
    })
  })
})
