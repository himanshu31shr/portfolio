import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BlogPageClient } from '@/components/BlogPageClient'
import type { PostMeta } from '@/lib/blog'

const MOCK_POSTS: PostMeta[] = [
  {
    slug: 'post-1',
    title: 'Post 1 Title',
    date: '2026-05-01',
    excerpt: 'Excerpt 1',
    tags: ['react', 'nextjs'],
    readTime: '5 min',
    coverImage: '/images/1.jpg',
    published: true,
    series: '',
    seriesOrder: 0,
  },
  {
    slug: 'post-2',
    title: 'Post 2 Title',
    date: '2026-04-01',
    excerpt: 'Excerpt 2',
    tags: ['aws', 'testing'],
    readTime: '3 min',
    coverImage: '',
    published: true,
    series: '',
    seriesOrder: 0,
  },
]

describe('BlogPageClient', () => {
  it('renders all posts initially', () => {
    render(<BlogPageClient posts={MOCK_POSTS} allTags={['react', 'nextjs', 'aws', 'testing']} />)
    expect(screen.getByText('Post 1 Title')).toBeInTheDocument()
    expect(screen.getByText('Post 2 Title')).toBeInTheDocument()
    expect(screen.getByText(/2 articles/i)).toBeInTheDocument()
  })

  it('toggles tag off when clicked twice', () => {
    render(<BlogPageClient posts={MOCK_POSTS} allTags={['react']} />)
    const btn = screen.getByRole('button', { name: 'react' })
    fireEvent.click(btn)
    expect(screen.queryByText('Post 2 Title')).not.toBeInTheDocument()
    fireEvent.click(btn)
    expect(screen.getByText('Post 2 Title')).toBeInTheDocument()
  })

  it('renders tag filter buttons', () => {
    render(<BlogPageClient posts={MOCK_POSTS} allTags={['react', 'aws']} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'react' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'aws' })).toBeInTheDocument()
  })

  it('filters posts when a tag is clicked', () => {
    render(<BlogPageClient posts={MOCK_POSTS} allTags={['react', 'aws']} />)
    
    // Click 'react'
    fireEvent.click(screen.getByRole('button', { name: 'react' }))
    
    expect(screen.getByText('Post 1 Title')).toBeInTheDocument()
    expect(screen.queryByText('Post 2 Title')).not.toBeInTheDocument()
    expect(screen.getByText(/1 article/i)).toBeInTheDocument()
    expect(screen.getByText(/tagged/i)).toBeInTheDocument()
    expect(screen.getByText('react', { selector: 'span.text-accent-blue' })).toBeInTheDocument()
  })

  it('shows empty state if no posts match tag (edge case)', () => {
    render(<BlogPageClient posts={MOCK_POSTS} allTags={['react', 'nonexistent']} />)
    
    fireEvent.click(screen.getByRole('button', { name: 'nonexistent' }))
    
    expect(screen.getByText(/No posts tagged "nonexistent"/i)).toBeInTheDocument()
    
    const clearBtn = screen.getByRole('button', { name: /clear tag filter/i })
    fireEvent.click(clearBtn)
    
    // Should show all posts again
    expect(screen.getByText('Post 1 Title')).toBeInTheDocument()
  })

  it('clears filter when All button is clicked', () => {
    render(<BlogPageClient posts={MOCK_POSTS} allTags={['react', 'aws']} />)
    
    fireEvent.click(screen.getByRole('button', { name: 'react' }))
    expect(screen.queryByText('Post 2 Title')).not.toBeInTheDocument()
    
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(screen.getByText('Post 2 Title')).toBeInTheDocument()
  })

  it('shows generic empty state if no posts at all', () => {
    render(<BlogPageClient posts={[]} allTags={[]} />)
    expect(screen.getByText(/No posts yet/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })
})
