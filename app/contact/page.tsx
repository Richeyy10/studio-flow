'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/page-hero'
import { STUDIO } from '@/lib/studio-data'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  return (
    <div>
      <PageHero
        eyebrow="Say hello"
        title="Get in touch"
        subtitle="Questions about a service, a group booking, or a special occasion? We'd love to hear from you."
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
        {/* Form */}
        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
          {sent ? (
            <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
                <CheckCircle2 className="size-7" />
              </span>
              <h2 className="mt-4 font-serif text-2xl text-foreground">Message sent!</h2>
              <p className="mt-2 max-w-xs text-muted-foreground">
                Thanks for reaching out, {form.name || 'friend'}. Our team will get back to you very
                soon.
              </p>
              <Button
                variant="outline"
                className="mt-6 rounded-full"
                onClick={() => {
                  setSent(false)
                  setForm({ name: '', email: '', message: '' })
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="space-y-5"
            >
              <h2 className="font-serif text-2xl text-foreground">Send us a message</h2>
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="How can we help?"
                />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full">
                <Send className="size-4" />
                Send message
              </Button>
            </form>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div className="space-y-4 rounded-[2rem] border border-border bg-secondary/40 p-6 sm:p-8">
            <a href={`tel:${STUDIO.phone}`} className="flex items-center gap-4 text-foreground">
              <span className="flex size-11 items-center justify-center rounded-full bg-card text-primary">
                <Phone className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Call us</span>
                <span className="font-medium">{STUDIO.phone}</span>
              </span>
            </a>
            <a href={`mailto:${STUDIO.email}`} className="flex items-center gap-4 text-foreground">
              <span className="flex size-11 items-center justify-center rounded-full bg-card text-primary">
                <Mail className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Email us</span>
                <span className="font-medium">{STUDIO.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 text-foreground">
              <span className="flex size-11 items-center justify-center rounded-full bg-card text-primary">
                <MapPin className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Visit us</span>
                <span className="font-medium">{STUDIO.address}</span>
              </span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              {STUDIO.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {s.label === 'Facebook' ? <FaFacebook className="size-5" /> : <FaInstagram className="size-5" />}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center rounded-[2rem] border border-border bg-muted p-6 text-center text-sm text-muted-foreground">
            <span className="flex flex-col items-center gap-2">
              <MapPin className="size-7 text-primary" />
              Interactive map preview
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
