'use client'

import { useState } from 'react'
import {
  Users,
  CalendarCheck,
  DollarSign,
  Star,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/page-hero'
import { MissedCallSim } from '@/components/missed-call-sim'
import { cn } from '@/lib/utils'
import { LEADS, BOOKINGS, COMPLETED_VISITS, STUDIO } from '@/lib/studio-data'

export default function DashboardPage() {
  const [visits, setVisits] = useState(COMPLETED_VISITS)
  const [toast, setToast] = useState<string | null>(null)

  const reviewsRequested = visits.filter((v) => v.reviewRequested).length
  const depositsPaid = BOOKINGS.filter((b) => b.deposit === 'Paid').length

  const STATS = [
    { icon: Users, label: 'Leads this week', value: '14', sub: '+3 today' },
    { icon: CalendarCheck, label: 'Bookings confirmed', value: String(BOOKINGS.length), sub: 'Next 7 days' },
    { icon: DollarSign, label: 'Deposits collected', value: `$${depositsPaid * 20}`, sub: `${depositsPaid} paid` },
    { icon: Star, label: 'Reviews requested', value: String(reviewsRequested), sub: 'This week' },
  ]

  function requestReview(id: string, client: string) {
    setVisits((prev) => prev.map((v) => (v.id === id ? { ...v, reviewRequested: true } : v)))
    setToast(`Review request sent to ${client}`)
    window.setTimeout(() => setToast(null), 3200)
  }

  return (
    <div>
      <PageHero
        eyebrow="For studio owners"
        title="Owner dashboard"
        subtitle="Your lead & booking inbox — see missed-call leads, upcoming appointments, and automated review requests in one place."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <s.icon className="size-5" />
                </span>
                <span className="text-xs font-medium text-muted-foreground">{s.sub}</span>
              </div>
              <p className="mt-4 font-serif text-3xl text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Missed-call simulation */}
          <MissedCallSim />

          {/* Leads inbox */}
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h3 className="flex items-center gap-2 font-serif text-xl text-foreground">
              <MessageSquare className="size-5 text-primary" />
              Lead inbox
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">New leads from missed calls and website chat.</p>
            <ul className="mt-5 space-y-3">
              {LEADS.map((l) => (
                <li key={l.id} className="rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground">{l.name}</span>
                    <StatusPill status={l.status} />
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="size-3" /> {l.phone}
                    <span>·</span>
                    <span>{l.source}</span>
                    <span>·</span>
                    <span>{l.time}</span>
                  </div>
                  {l.message !== '—' && (
                    <p className="mt-2 text-sm text-muted-foreground">&ldquo;{l.message}&rdquo;</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upcoming bookings */}
        <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h3 className="flex items-center gap-2 font-serif text-xl text-foreground">
            <CalendarCheck className="size-5 text-primary" />
            Upcoming bookings
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-md text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Client</th>
                  <th className="py-2 pr-4 font-medium">Service</th>
                  <th className="py-2 pr-4 font-medium">When</th>
                  <th className="py-2 font-medium">Deposit</th>
                </tr>
              </thead>
              <tbody>
                {BOOKINGS.map((b) => (
                  <tr key={b.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3 pr-4 font-medium text-foreground">{b.client}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{b.service}</td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {b.date} · {b.time}
                    </td>
                    <td className="py-3">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
                          b.deposit === 'Paid'
                            ? 'bg-secondary text-primary'
                            : 'bg-muted text-muted-foreground',
                        )}
                      >
                        {b.deposit === 'Paid' ? <CheckCircle2 className="size-3" /> : <Clock className="size-3" />}
                        {b.deposit}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Completed visits / review automation */}
        <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h3 className="flex items-center gap-2 font-serif text-xl text-foreground">
            <Star className="size-5 text-primary" />
            Completed visits — review requests
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Mark a visit complete to auto-send a friendly review request.
          </p>
          <ul className="mt-5 space-y-3">
            {visits.map((v) => (
              <li
                key={v.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4"
              >
                <div>
                  <span className="font-medium text-foreground">{v.client}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {v.service} · {v.date}
                  </span>
                </div>
                {v.reviewRequested ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-primary">
                    <CheckCircle2 className="size-3.5" /> Review requested
                  </span>
                ) : (
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={() => requestReview(v.id, v.client)}
                  >
                    <Send className="size-3.5" /> Mark complete & request review
                  </Button>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-2xl bg-muted/50 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Auto follow-up message</p>
            <p className="mt-1 italic">
              &ldquo;Thanks for visiting {STUDIO.name} today! We&apos;d love a quick review:
              studioflow.beauty/review&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}

function StatusPill({ status }: { status: 'New' | 'Replied' | 'Booked' }) {
  const styles = {
    New: 'bg-gold/25 text-gold-foreground',
    Replied: 'bg-secondary text-primary',
    Booked: 'bg-primary text-primary-foreground',
  }
  return (
    <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', styles[status])}>{status}</span>
  )
}
