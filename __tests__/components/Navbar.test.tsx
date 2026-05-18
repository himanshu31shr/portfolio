import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Navbar } from '@/components/Navbar'
import { usePathname } from 'next/navigation'

// next/link is handled automatically by the test environment
describe('Navbar', () => {
  it('renders the logo with HS text', () => {
    render(<Navbar />)
    expect(screen.getByText('HS')).toBeInTheDocument()
  })

  it('renders the main navigation landmark', () => {
    render(<Navbar />)
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    const aboutLink = screen.getAllByRole('link', { name: /about/i })
    expect(aboutLink.length).toBeGreaterThan(0)
  })

  it('renders a Blog link', () => {
    render(<Navbar />)
    const blogLinks = screen.getAllByRole('link', { name: /blog/i })
    expect(blogLinks.length).toBeGreaterThan(0)
  })

  it('renders mobile menu toggle button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })

  it('opens mobile menu when toggle is clicked', () => {
    render(<Navbar />)
    const toggleButton = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(toggleButton)
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
  })

  it('mobile menu shows nav links when open', () => {
    render(<Navbar />)
    const toggleButton = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(toggleButton)
    // Mobile menu should now be visible — check that the mobile menu id exists
    expect(document.getElementById('mobile-menu')).toBeInTheDocument()
  })

  it('closes mobile menu when a link is clicked', () => {
    render(<Navbar />)
    const toggleButton = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(toggleButton)
    
    // Click a link in the mobile menu
    const mobileMenu = document.getElementById('mobile-menu')
    const link = mobileMenu?.querySelector('a')
    if (link) fireEvent.click(link)
    
    // Menu should be closed
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument()
  })

  it('renders scroll progress bar', () => {
    render(<Navbar />)
    const progressBar = screen.getByRole('progressbar', { name: /page scroll progress/i })
    expect(progressBar).toBeInTheDocument()
  })

  it('renders header with banner role', () => {
    render(<Navbar />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('updates scroll progress on scroll events', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })

    render(<Navbar />)
    
    Object.defineProperty(window, 'scrollY', { value: 600, configurable: true })
    fireEvent.scroll(window)
    
    const progressBar = screen.getByRole('progressbar')
    // scrollY=600, scrollHeight-innerHeight=1200, progress = 50%
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
  })

  it('handles scroll progress when scrollHeight equals innerHeight (totalHeight is 0)', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 800, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })

    render(<Navbar />)
    
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
    fireEvent.scroll(window)
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '0')
  })

  it('hides hash links when on the blog page', () => {
    vi.mocked(usePathname).mockReturnValue('/blog')
    
    render(<Navbar />)
    
    // About link should not be present (it uses href="#about")
    const aboutLinks = screen.queryAllByRole('link', { name: /about/i })
    expect(aboutLinks.length).toBe(0)
    
    // Blog link should still be present
    const blogLinks = screen.getAllByRole('link', { name: /blog/i })
    expect(blogLinks.length).toBeGreaterThan(0)
    vi.mocked(usePathname).mockRestore()
  })

  it('hides hash links in mobile menu when on the blog page', () => {
    vi.mocked(usePathname).mockReturnValue('/blog/some-post')
    
    render(<Navbar />)
    
    // Open mobile menu
    const toggleButton = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(toggleButton)
    
    // About link should not be present in mobile menu either
    const aboutLinks = screen.queryAllByRole('link', { name: /about/i })
    expect(aboutLinks.length).toBe(0)
    vi.mocked(usePathname).mockRestore()
  })
})
