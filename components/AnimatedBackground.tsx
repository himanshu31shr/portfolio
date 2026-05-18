export function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      data-testid="animated-background"
    >
      {/* Orb 1 — Blue/Indigo */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-blue), transparent 70%)',
          top: '-15%',
          left: '-10%',
          animation: 'float 20s ease-in-out infinite',
        }}
      />

      {/* Orb 2 — Purple */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-purple), transparent 70%)',
          top: '40%',
          right: '-8%',
          animation: 'float-reverse 25s ease-in-out infinite',
        }}
      />

      {/* Orb 3 — Pink */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-pink), transparent 70%)',
          bottom: '10%',
          left: '30%',
          animation: 'float-slow 18s ease-in-out infinite',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--color-accent-blue) 30%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--color-accent-blue) 30%, transparent) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}
