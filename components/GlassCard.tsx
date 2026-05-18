interface GlassCardProps {
  children: React.ReactNode
  className?: string
  large?: boolean
  hover?: boolean
  as?: keyof React.JSX.IntrinsicElements
}

export function GlassCard({
  children,
  className = '',
  large = false,
  hover = false,
  as: Tag = 'div',
}: GlassCardProps) {
  const base = large ? 'glass-lg' : 'glass'
  const hoverClass = hover ? 'transition-all duration-300 hover:border-glass-border-hover cursor-pointer' : ''

  return (
    <Tag className={`${base} ${hoverClass} ${className}`}>
      {children}
    </Tag>
  )
}
