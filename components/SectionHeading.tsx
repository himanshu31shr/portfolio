interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  id,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`mb-12 ${alignClass}`} id={id}>
      <h2 className="gradient-text text-4xl md:text-5xl font-bold mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-0.5 w-16 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink rounded-full ${align === 'center' ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />
    </div>
  )
}
