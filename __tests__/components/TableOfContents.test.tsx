import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { TableOfContents } from '@/components/TableOfContents'

describe('TableOfContents', () => {
  beforeEach(() => {
    // Setup a fake article with headings in the document body
    document.body.innerHTML = `
      <article>
        <h2 id="heading-1">Heading 1</h2>
        <h3 id="subheading-1">Subheading 1</h3>
        <h2 id="heading-2">Heading 2</h2>
      </article>
    `
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  it('renders nothing if less than 2 headings', () => {
    document.body.innerHTML = `<article><h2 id="heading-1">Only One</h2></article>`
    const { container } = render(<TableOfContents />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders headings from the article', () => {
    render(<TableOfContents />)
    expect(screen.getAllByText('Heading 1').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Subheading 1').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Heading 2').length).toBeGreaterThan(0)
  })

  it('adds auto-generated ids if missing', () => {
    document.body.innerHTML = `
      <article>
        <h2>No ID Heading</h2>
        <h3>Another One</h3>
      </article>
    `
    render(<TableOfContents />)
    
    // Check if the DOM was mutated to add IDs
    const h2 = document.querySelector('h2')
    expect(h2).toHaveAttribute('id', 'no-id-heading')
  })

  it('renders mobile toggle button', () => {
    render(<TableOfContents />)
    expect(screen.getByRole('button', { name: /show table of contents/i })).toBeInTheDocument()
  })

  it('toggles TOC on mobile', () => {
    render(<TableOfContents />)
    const button = screen.getByRole('button', { name: /show table of contents/i })
    
    // Initially closed on mobile (hidden class present)
    const nav = screen.getByRole('navigation', { name: /table of contents/i })
    expect(nav.className).toContain('hidden')

    // Click to open
    act(() => {
      button.click()
    })
    
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(nav.className).toContain('block')
  })

  it('scrolls to element when clicked', () => {
    const scrollIntoViewMock = vi.fn()
    const heading = document.getElementById('heading-1')
    if (heading) heading.scrollIntoView = scrollIntoViewMock

    render(<TableOfContents />)
    const button = screen.getAllByText('Heading 1')[1] // The button is the second one, or use getAllByRole
    act(() => {
      button.click()
    })

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('updates active id when observer triggers', () => {
    let observerCallback: IntersectionObserverCallback = () => {}
    const MockObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback
      }
      observe = vi.fn()
      disconnect = vi.fn()
      unobserve = vi.fn()
    }
    vi.stubGlobal('IntersectionObserver', MockObserver)

    render(<TableOfContents />)
    
    act(() => {
      if (observerCallback) {
        observerCallback(
          [
            { isIntersecting: true, target: { id: 'heading-2' } },
            { isIntersecting: false, target: { id: 'heading-1' } }
          ] as unknown as IntersectionObserverEntry[],
          {} as IntersectionObserver
        )
      }
    })

    const activeLink = screen.getAllByRole('button').find(b => b.getAttribute('aria-current') === 'location')
    expect(activeLink).toHaveTextContent('Heading 2')
  })
})
