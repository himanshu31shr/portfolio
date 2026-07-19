import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CASE_STUDIES_DIR = path.join(process.cwd(), 'content', 'case-studies')

export interface CaseStudyMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  clientRole: string
  role: string
  techStack: string[]
  metrics: string[]
  readTime: string
  coverImage: string
  published: boolean
}

export interface CaseStudy {
  meta: CaseStudyMeta
  content: string
}

function parseMeta(slug: string, data: Record<string, unknown>): CaseStudyMeta {
  return {
    slug,
    title: (data.title as string) ?? '',
    date: (data.date as string) ?? '',
    excerpt: (data.excerpt as string) ?? '',
    clientRole: (data.clientRole as string) ?? '',
    role: (data.role as string) ?? '',
    techStack: (data.techStack as string[]) ?? [],
    metrics: (data.metrics as string[]) ?? [],
    readTime: (data.readTime as string) ?? '',
    coverImage: (data.coverImage as string) ?? '',
    published: (data.published as boolean) ?? false,
  }
}

/**
 * Returns all published case studies sorted by date descending.
 */
export function getAllCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return []

  const files = fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith('.mdx'))

  const studies = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const filePath = path.join(CASE_STUDIES_DIR, filename)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)
      return parseMeta(slug, data)
    })
    .filter((study) => study.published)
    .sort((a, b) => b.date.localeCompare(a.date))

  return studies
}

/**
 * Returns a single case study's metadata and raw MDX content by slug.
 * Returns null if the file does not exist.
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    meta: parseMeta(slug, data),
    content,
  }
}

/**
 * Returns all case study slugs for use in generateStaticParams().
 */
export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return []

  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
