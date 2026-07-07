import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ServiceCard } from '@/components/service-card'
import { SERVICES, CATEGORIES } from '@/lib/studio-data'

export const metadata: Metadata = {
  title: 'Services — StudioFlow',
  description:
    'Explore hair, nail, lash, and skincare services at StudioFlow. Every service includes pricing, duration, and instant online booking.',
}

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our menu"
        title="Services & pricing"
        subtitle="Browse our full menu of hair, nail, and skincare treatments. Book any service in just a few taps."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {CATEGORIES.map((cat) => {
          const items = SERVICES.filter((s) => s.category === cat.label)
          return (
            <section key={cat.label} className="mb-16 last:mb-0 scroll-mt-24" id={cat.label.toLowerCase()}>
              <div className="mb-8 border-b border-border pb-4">
                <h2 className="font-serif text-3xl text-foreground">{cat.label}</h2>
                <p className="mt-1 text-muted-foreground">{cat.blurb}</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
