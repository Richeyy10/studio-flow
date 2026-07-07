import Link from 'next/link'
import { Flower2, Phone, Mail, MapPin } from 'lucide-react'
import { STUDIO } from '@/lib/studio-data'

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Flower2 className="size-5" />
            </span>
            <span className="font-serif text-xl font-semibold text-foreground">{STUDIO.name}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Elegant beauty & self-care, booked in seconds. Hair, nails, lashes, and skincare all in
            one calm, welcoming studio.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg text-foreground">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link href="/booking" className="hover:text-foreground">Book an appointment</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-foreground">Visit us</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{STUDIO.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-primary" />
              <a href={`tel:${STUDIO.phone}`} className="hover:text-foreground">{STUDIO.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-primary" />
              <a href={`mailto:${STUDIO.email}`} className="hover:text-foreground">{STUDIO.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-foreground">Follow along</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {STUDIO.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-foreground">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70 py-6">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {STUDIO.name}. A demo experience — no real bookings or
          payments are processed.
        </p>
      </div>
    </footer>
  )
}
