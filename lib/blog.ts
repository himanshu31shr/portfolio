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
