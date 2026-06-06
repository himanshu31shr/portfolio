import '@testing-library/jest-dom/vitest'
import React from 'react'
import { vi } from 'vitest'

// Mock env variables
process.env.NEXT_PUBLIC_BASE_PATH = ''

// Mock next/font/google - always returns className and style
vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'mock-inter', style: { fontFamily: 'Inter' } }),
  JetBrains_Mono: () => ({ className: 'mock-jetbrains', style: { fontFamily: 'JetBrains Mono' } }),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), pathname: '/' }),
  usePathname: vi.fn(() => '/'),
  useSearchParams: () => new URLSearchParams(),
  notFound: vi.fn(() => { throw new Error('NEXT_NOT_FOUND') }),
}))

// Mock framer-motion — render passthrough HTML elements
vi.mock('framer-motion', () => {
  const createMotionComponent = (tag: string) => {
    const Component = ({
      children,
      // Strip framer-motion-specific props so React doesn't warn
      initial: _initial,
      animate: _animate,
      whileInView: _whileInView,
      whileHover: _whileHover,
      whileTap: _whileTap,
      viewport: _viewport,
      transition: _transition,
      variants: _variants,
      exit: _exit,
      ...rest
    }: Record<string, unknown> & { children?: React.ReactNode }) => React.createElement(tag, rest, children)
    Component.displayName = `motion.${tag}`
    return Component
  }

  const motion = new Proxy(
    {},
    {
      get(_target, prop: string) {
        return createMotionComponent(prop)
      },
    }
  )

  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useInView: () => true,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: (_v: unknown, _r: unknown, output: unknown[]) => output?.[0] ?? 0,
    useMotionValue: (initial: number) => ({ get: () => initial, set: vi.fn() }),
    useSpring: (value: number) => value,
  }
})

// Mock IntersectionObserver globally
const MockIntersectionObserver = class {
  constructor() {}
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
