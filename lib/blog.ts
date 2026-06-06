import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readTime: string
  coverImage: string
  published: boolean
  series: string
  seriesOrder: number
}

export interface Post {
  meta: PostMeta
  content: string
}

/**
 * Returns all published blog posts sorted by date descending.
 */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const filePath = path.join(BLOG_DIR, filename)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)

      return {
        slug,
        title: data.title ?? '',
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        tags: data.tags ?? [],
        readTime: data.readTime ?? '',
        coverImage: data.coverImage ?? '',
        published: data.published ?? false,
        series: data.series ?? '',
        seriesOrder: data.seriesOrder ?? 0,
      } satisfies PostMeta
    })
    .filter((post) => post.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts
}

/**
 * Returns a single post's metadata and raw MDX content by slug.
 * Returns null if the post does not exist.
 */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const meta: PostMeta = {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    tags: data.tags ?? [],
    readTime: data.readTime ?? '',
    coverImage: data.coverImage ?? '',
    published: data.published ?? false,
    series: data.series ?? '',
    seriesOrder: data.seriesOrder ?? 0,
  }

  return { meta, content }
}

/**
 * Returns all slugs for use in generateStaticParams().
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

/**
 * Returns the most recent published blog post.
 */
export function getLatestPost(): PostMeta | null {
  const posts = getAllPosts()
  return posts.length > 0 ? posts[0] : null
}

/**
 * Returns all published posts matching a given tag.
 */
export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

/**
 * Returns a sorted, unique list of all tags across published posts.
 */
export function getAllTags(): string[] {
  const tags = new Set<string>()
  getAllPosts().forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
  return Array.from(tags).sort()
}

/**
 * Returns related posts based on shared tags, excluding the current post.
 */
export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== currentSlug)

  const scored = all.map((post) => {
    const sharedTags = post.tags.filter((t) => tags.includes(t)).length
    return { post, score: sharedTags }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post)
}

/**
 * Returns all posts in a given series, sorted by seriesOrder.
 */
export function getPostsInSeries(seriesName: string): PostMeta[] {
  if (!seriesName) return []
  return getAllPosts()
    .filter((p) => p.series === seriesName)
    .sort((a, b) => a.seriesOrder - b.seriesOrder)
}
