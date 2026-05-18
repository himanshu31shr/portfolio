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

  it('renders the hero section with aria-label', () => {
    render(<Hero />)
    expect(screen.getByRole('region', { name: /hero section/i })).toBeInTheDocument()
  })

  it('renders download resume link', () => {
    render(<Hero />)
    const downloadLink = screen.getByRole('link', { name: /download resume/i })
    expect(downloadLink).toBeInTheDocument()
    expect(downloadLink).toHaveAttribute('download')
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
})

