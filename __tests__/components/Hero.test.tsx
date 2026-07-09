import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Hero } from '@/components/Hero'

describe('Hero', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('renders the name', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: /Himanshu Shrivastava/i })).toBeInTheDocument()
  })

  it('renders latest post link if provided', () => {
    const mockPost = { slug: 'test', title: 'Test Post' } as unknown as import('@/lib/blog').PostMeta
    render(<Hero latestPost={mockPost} />)
    expect(screen.getByRole('link', { name: /Latest article: Test Post/i })).toBeInTheDocument()
  })

  it('renders the hero section with aria-label', () => {
    render(<Hero />)
    expect(screen.getByRole('region', { name: /hero section/i })).toBeInTheDocument()
  })

  it('renders download resume menu button', () => {
    render(<Hero />)
    const downloadButton = screen.getByRole('button', { name: /download resume — choose role level/i })
    expect(downloadButton).toBeInTheDocument()
    expect(downloadButton).toHaveAttribute('aria-haspopup', 'menu')
    expect(downloadButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens resume menu with four role-level downloads', () => {
    render(<Hero />)
    fireEvent.click(screen.getByRole('button', { name: /download resume — choose role level/i }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /download software engineer resume pdf/i })).toHaveAttribute(
      'download'
    )
    expect(screen.getByRole('menuitem', { name: /download senior software engineer resume pdf/i })).toHaveAttribute(
      'href',
      '/resumes/senior-software-engineer.pdf'
    )
    expect(screen.getByRole('menuitem', { name: /download staff engineer resume pdf/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /download lead engineer resume pdf/i })).toBeInTheDocument()
  })

  it('closes resume menu on escape', () => {
    render(<Hero />)
    fireEvent.click(screen.getByRole('button', { name: /download resume — choose role level/i }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes resume menu on outside click', () => {
    render(<Hero />)
    fireEvent.click(screen.getByRole('button', { name: /download resume — choose role level/i }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    fireEvent.mouseDown(document.body)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes resume menu when a menu item is clicked', () => {
    render(<Hero />)
    fireEvent.click(screen.getByRole('button', { name: /download resume — choose role level/i }))
    fireEvent.click(screen.getByRole('menuitem', { name: /download software engineer resume pdf/i }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('toggles resume menu closed when download button is clicked while open', () => {
    render(<Hero />)
    const downloadButton = screen.getByRole('button', { name: /download resume — choose role level/i })
    fireEvent.click(downloadButton)
    expect(screen.getByRole('menu')).toBeInTheDocument()
    fireEvent.click(downloadButton)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(downloadButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps resume menu open when clicking inside the menu', () => {
    render(<Hero />)
    fireEvent.click(screen.getByRole('button', { name: /download resume — choose role level/i }))
    const menu = screen.getByRole('menu')
    fireEvent.mouseDown(menu)
    expect(menu).toBeInTheDocument()
  })

  it('keeps resume menu open when a non-escape key is pressed', () => {
    render(<Hero />)
    fireEvent.click(screen.getByRole('button', { name: /download resume — choose role level/i }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('renders LinkedIn link', () => {
    render(<Hero />)
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders View My Work button', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /view my work/i })).toBeInTheDocument()
  })

  it('renders scroll down button', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /scroll down to about section/i })).toBeInTheDocument()
  })

  it('renders avatar image with alt text', () => {
    render(<Hero />)
    const avatar = screen.getByAltText(/Himanshu Shrivastava avatar/i)
    expect(avatar).toBeInTheDocument()
  })

  it('renders aria-live region for typewriter text', () => {
    render(<Hero />)
    const typewriterRegion = document.querySelector('[aria-live="polite"]')
    expect(typewriterRegion).toBeInTheDocument()
  })

  it('scrolls to about section when View My Work is clicked', () => {
    const scrollIntoViewMock = vi.fn()
    const aboutElement = document.createElement('div')
    aboutElement.id = 'about'
    aboutElement.scrollIntoView = scrollIntoViewMock
    document.body.appendChild(aboutElement)

    render(<Hero />)
    fireEvent.click(screen.getByRole('button', { name: /view my work/i }))
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })

    document.body.removeChild(aboutElement)
  })

  it('renders summary text', () => {
    render(<Hero />)
    expect(screen.getByText(/9\+ years/i)).toBeInTheDocument()
  })

  it('renders greeting text', () => {
    render(<Hero />)
    expect(screen.getByText(/hello, i'm/i)).toBeInTheDocument()
  })

  it('updates typewriter text over time', () => {
    render(<Hero />)
    
    // First role is 'Senior Full Stack Engineer' (26 characters)
    // Advance timers step-by-step to type it
    for (let i = 0; i < 26; i++) {
      act(() => {
        vi.advanceTimersByTime(80)
      })
    }
    expect(screen.getByLabelText('Current role: Senior Full Stack Engineer')).toBeInTheDocument()
    
    // Pause of 2000ms at completion
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    
    // Deleting starts (40ms per char)
    for (let i = 0; i < 26; i++) {
      act(() => {
        vi.advanceTimersByTime(40)
      })
    }
    expect(screen.getByLabelText('Current role:')).toBeInTheDocument()
    
    // Switch to the next role (500ms pause)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    
    // Let's type a few chars of next role 'Startup Technology Leader'
    act(() => {
      vi.advanceTimersByTime(80)
    })
    expect(screen.getByLabelText('Current role: S')).toBeInTheDocument()
  })

  it('renders without latest post', () => {
    render(<Hero latestPost={undefined} />)
    expect(screen.queryByText(/latest article/i)).not.toBeInTheDocument()
  })
})
