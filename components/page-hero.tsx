export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <section className="border-b border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 md:py-20 lg:px-8">
        {eyebrow && <p className="font-medium text-primary">{eyebrow}</p>}
        <h1 className="mt-2 font-serif text-4xl text-foreground text-balance sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
