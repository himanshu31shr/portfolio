import { describe, it, expect, beforeEach, vi } from 'vitest'

// Set up fs mocks BEFORE importing the module under test
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

// Sample MDX files for testing
const MOCK_MDX_PUBLISHED = `---
title: "Test Post"
date: "2026-05-01"
excerpt: "A test post excerpt"
tags: ["nextjs", "test"]
readTime: "5 min read"
coverImage: "/images/blog/test.jpg"
published: true
---

# Test Post Content
`

const MOCK_MDX_DRAFT = `---
title: "Draft Post"
date: "2026-04-01"
excerpt: "A draft post"
tags: ["draft"]
readTime: "3 min read"
coverImage: "/images/blog/draft.jpg"
published: false
---

# Draft Content
`

const MOCK_MDX_OLDER = `---
title: "Older Post"
date: "2026-03-01"
excerpt: "An older post"
tags: ["aws"]
readTime: "7 min read"
coverImage: "/images/blog/older.jpg"
published: true
---

# Older Content
`

describe('blog utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('getAllPosts', () => {
    it('returns empty array when blog directory does not exist', async () => {
      mockExistsSync.mockReturnValue(false)
      const { getAllPosts } = await import('@/lib/blog')
      const posts = getAllPosts()
      expect(posts).toEqual([])
    })

    it('returns only published posts', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['published.mdx', 'draft.mdx'])
      mockReadFileSync.mockImplementation((p: string) => {
        if (String(p).includes('published')) return MOCK_MDX_PUBLISHED
        return MOCK_MDX_DRAFT
      })

      const { getAllPosts } = await import('@/lib/blog')
      const posts = getAllPosts()

      expect(posts).toHaveLength(1)
      expect(posts[0].title).toBe('Test Post')
      expect(posts[0].published).toBe(true)
    })

    it('sorts posts by date descending', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['older.mdx', 'test.mdx'])
      mockReadFileSync.mockImplementation((p: string) => {
        if (String(p).includes('older')) return MOCK_MDX_OLDER
        return MOCK_MDX_PUBLISHED
      })

      const { getAllPosts } = await import('@/lib/blog')
      const posts = getAllPosts()

      expect(posts).toHaveLength(2)
      expect(posts[0].date).toBe('2026-05-01') // newer first
      expect(posts[1].date).toBe('2026-03-01')
    })

    it('includes all required PostMeta fields', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['test.mdx'])
      mockReadFileSync.mockReturnValue(MOCK_MDX_PUBLISHED)

      const { getAllPosts } = await import('@/lib/blog')
      const posts = getAllPosts()
      const post = posts[0]

      expect(post.slug).toBe('test')
      expect(post.title).toBe('Test Post')
      expect(post.date).toBe('2026-05-01')
      expect(post.excerpt).toBe('A test post excerpt')
      expect(post.tags).toEqual(['nextjs', 'test'])
      expect(post.readTime).toBe('5 min read')
      expect(post.coverImage).toBe('/images/blog/test.jpg')
      expect(post.published).toBe(true)
    })

    it('filters out non-mdx files', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['test.mdx', '.DS_Store', 'readme.txt'])
      mockReadFileSync.mockReturnValue(MOCK_MDX_PUBLISHED)

      const { getAllPosts } = await import('@/lib/blog')
      const posts = getAllPosts()
      expect(posts).toHaveLength(1)
    })

    it('sets defaults for missing frontmatter fields in getAllPosts', async () => {
      const minimalMdx = `---
published: true
---
Content`
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['minimal.mdx'])
      mockReadFileSync.mockReturnValue(minimalMdx)

      const { getAllPosts } = await import('@/lib/blog')
      const posts = getAllPosts()

      expect(posts).toHaveLength(1)
      expect(posts[0].title).toBe('')
      expect(posts[0].date).toBe('')
      expect(posts[0].excerpt).toBe('')
      expect(posts[0].tags).toEqual([])
      expect(posts[0].readTime).toBe('')
      expect(posts[0].coverImage).toBe('')
      expect(posts[0].published).toBe(true)
    })

    it('handles sorting when posts are in different initial readdirSync orders', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['test.mdx', 'older.mdx'])
      mockReadFileSync.mockImplementation((p: string) => {
        if (String(p).includes('older')) return MOCK_MDX_OLDER
        return MOCK_MDX_PUBLISHED
      })

      const { getAllPosts } = await import('@/lib/blog')
      const posts = getAllPosts()
      expect(posts).toHaveLength(2)
      expect(posts[0].date).toBe('2026-05-01')
      expect(posts[1].date).toBe('2026-03-01')
    })

    it('handles missing published field in getAllPosts by defaulting to false and filtering it out', async () => {
      const missingPublishedMdx = `---
title: "No Published Field"
---
Content`
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['nopub.mdx'])
      mockReadFileSync.mockReturnValue(missingPublishedMdx)

      const { getAllPosts } = await import('@/lib/blog')
      const posts = getAllPosts()
      expect(posts).toHaveLength(0)
    })
  })

  describe('getPostBySlug', () => {
    it('returns null when file does not exist', async () => {
      mockExistsSync.mockReturnValue(false)
      const { getPostBySlug } = await import('@/lib/blog')
      const post = getPostBySlug('nonexistent')
      expect(post).toBeNull()
    })

    it('returns post meta and content for existing slug', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue(MOCK_MDX_PUBLISHED)

      const { getPostBySlug } = await import('@/lib/blog')
      const result = getPostBySlug('test')

      expect(result).not.toBeNull()
      expect(result?.meta.title).toBe('Test Post')
      expect(result?.meta.slug).toBe('test')
      expect(result?.content).toContain('# Test Post Content')
    })

    it('sets defaults for missing frontmatter fields', async () => {
      const minimalMdx = `---
title: "Minimal"
published: true
---
Content
`
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue(minimalMdx)

      const { getPostBySlug } = await import('@/lib/blog')
      const result = getPostBySlug('minimal')

      expect(result?.meta.date).toBe('')
      expect(result?.meta.excerpt).toBe('')
      expect(result?.meta.tags).toEqual([])
      expect(result?.meta.readTime).toBe('')
      expect(result?.meta.coverImage).toBe('')
    })

    it('sets all defaults when frontmatter is completely empty', async () => {
      const emptyMdx = `---
---
Content`
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue(emptyMdx)

      const { getPostBySlug } = await import('@/lib/blog')
      const result = getPostBySlug('empty')

      expect(result?.meta.title).toBe('')
      expect(result?.meta.date).toBe('')
      expect(result?.meta.excerpt).toBe('')
      expect(result?.meta.tags).toEqual([])
      expect(result?.meta.readTime).toBe('')
      expect(result?.meta.coverImage).toBe('')
      expect(result?.meta.published).toBe(false)
    })
  })

  describe('getPostSlugs', () => {
    it('returns empty array when blog directory does not exist', async () => {
      mockExistsSync.mockReturnValue(false)
      const { getPostSlugs } = await import('@/lib/blog')
      expect(getPostSlugs()).toEqual([])
    })

    it('returns slugs derived from filenames', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReaddirSync.mockReturnValue(['my-post.mdx', 'another-post.mdx', '.DS_Store'])

      const { getPostSlugs } = await import('@/lib/blog')
      const slugs = getPostSlugs()

      expect(slugs).toContain('my-post')
      expect(slugs).toContain('another-post')
      expect(slugs).not.toContain('.DS_Store')
      expect(slugs).toHaveLength(2)
    })
  })
})
