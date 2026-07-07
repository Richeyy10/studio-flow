import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, MapPin, Heart, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/page-hero'
import { STUDIO } from '@/lib/studio-data'

export const metadata: Metadata = {
  title: 'About — StudioFlow',
  description:
    'Meet the team behind StudioFlow — an elegant beauty studio built on genuine care, artistry, and effortless booking.',
}

const VALUES = [
  { icon: Heart, title: 'Genuine care', text: 'We take time to understand your goals and make every visit feel personal.' },
  { icon: Award, title: 'Skilled artistry', text: 'Our stylists and estheticians train continuously in the latest techniques.' },
  { icon: Users, title: 'A warm community', text: 'More than a salon — a welcoming space where everyone belongs.' },
]

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our story"
        title="Beauty, made personal"
        subtitle={`${STUDIO.name} was founded on a simple idea: exceptional care should feel effortless — from the moment you book to the moment you leave glowing.`}
      />

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img
            src="/images/about-studio.png"
            alt="The welcoming interior of the StudioFlow studio"
            className="aspect-[4/3] w-full rounded-[2rem] border border-border object-cover shadow-sm"
          />
          <div>
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">Where it all began</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We opened our doors to create a studio that felt less like a salon and more like a
              retreat — calm, unhurried, and centered entirely on you. What started as a single
              styling chair has grown into a full-service beauty destination for hair, nails, and
              skincare.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Along the way we fell in love with technology that removes the friction: instant
              online booking, gentle reminders, and thoughtful follow-ups so you never miss a moment
              of self-care. Behind every polished detail is a team that genuinely loves what they do.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-serif text-xl text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">Meet the team</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our stylists, nail artists, and estheticians bring years of experience and a shared
              passion for making people feel their best. Every member of our team is here because
              they truly love the craft of beauty and self-care.
            </p>
            <Button
              size="lg"
              className="mt-6 rounded-full"
              render={<Link href="/booking">Book with our team</Link>}
            />
          </div>
          <img
            src="/images/about-team.png"
            alt="The StudioFlow team of stylists and estheticians"
            className="order-1 aspect-[4/3] w-full rounded-[2rem] border border-border object-cover shadow-sm md:order-2"
          />
        </div>
      </section>

      {/* Hours & location */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-10 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Clock className="size-5" />
              <h3 className="font-serif text-2xl text-foreground">Studio hours</h3>
            </div>
            <ul className="mt-5 divide-y divide-border">
              {STUDIO.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="font-medium text-foreground">{h.day}</span>
                  <span className="text-muted-foreground">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="size-5" />
              <h3 className="font-serif text-2xl text-foreground">Find us</h3>
            </div>
            <p className="mt-5 leading-relaxed text-muted-foreground">{STUDIO.address}</p>
            <div className="mt-4 flex aspect-video items-center justify-center rounded-2xl border border-border bg-muted text-center text-sm text-muted-foreground">
              <span className="flex flex-col items-center gap-2">
                <MapPin className="size-6 text-primary" />
                Map preview
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
