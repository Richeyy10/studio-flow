import Link from 'next/link'
import { Star, Calendar, Sparkles, Heart, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServiceCard } from '@/components/service-card'
import { SERVICES, TESTIMONIALS, STUDIO } from '@/lib/studio-data'

const HIGHLIGHTS = SERVICES.filter((s) =>
  ['balayage-color', 'luxe-manicure', 'glow-facial'].includes(s.id),
)

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <Sparkles className="size-4 text-primary" />
              Hair · Nails · Skincare
            </span>
            <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
              {STUDIO.tagline}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
              {STUDIO.name} is your neighborhood beauty studio for effortless online booking,
              friendly reminders, and treatments you&apos;ll look forward to.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="h-12 rounded-full px-7 text-base" render={<Link href="/booking">Book Now</Link>} />
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full px-7 text-base"
                render={<Link href="/services">View services</Link>}
              />
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {TESTIMONIALS.map((t) => (
                  <img
                    key={t.name}
                    src={t.image || '/placeholder.svg'}
                    alt={t.name}
                    className="size-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground">Loved by 1,200+ happy clients</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-xl">
              <img
                src="/images/hero-salon.png"
                alt="Elegant interior of the StudioFlow beauty studio"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg sm:flex">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Calendar className="size-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-foreground">Book in seconds</p>
                <p className="text-muted-foreground">Instant confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 rounded-[2rem] border border-border bg-secondary/40 p-6 sm:p-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <h2 className="font-serif text-3xl text-foreground text-balance sm:text-4xl">
              A calm, welcoming space for the whole you
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From fresh color to a restoring facial, our talented team blends artistry with genuine
              care. Every visit is unhurried, personal, and designed around you — and our smart
              booking keeps everything running beautifully behind the scenes.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Heart, label: 'Personalized care' },
                { icon: Calendar, label: 'Easy rescheduling' },
                { icon: Sparkles, label: 'Premium products' },
              ].map((f) => (
                <li key={f.label} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <f.icon className="size-4 text-primary" />
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <img
              src="/images/intro-detail.png"
              alt="A styled corner of the studio with fresh flowers"
              className="aspect-square w-full rounded-3xl border border-border object-cover"
            />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-medium text-primary">Client favorites</p>
            <h2 className="mt-1 font-serif text-3xl text-foreground sm:text-4xl">Our top services</h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View all services <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-medium text-primary">Kind words</p>
            <h2 className="mt-1 font-serif text-3xl text-foreground sm:text-4xl">
              Loved by our clients
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img
                    src={t.image || '/placeholder.svg'}
                    alt={t.name}
                    className="size-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.service}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground sm:px-10">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl text-balance sm:text-4xl">
            Ready to treat yourself? Book your next appointment in seconds.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-primary-foreground/85">
            Choose your service, pick a time that works, and we&apos;ll take care of the rest.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 h-12 rounded-full px-8 text-base"
            render={<Link href="/booking">Book Now</Link>}
          />
        </div>
      </section>
    </div>
  )
}
