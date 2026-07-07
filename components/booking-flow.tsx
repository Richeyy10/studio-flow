'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Check,
  Clock,
  CalendarDays,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Home,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SERVICES, TIME_SLOTS, DEPOSIT_AMOUNT, type Service } from '@/lib/studio-data'

const STEPS = ['Service', 'Date & time', 'Your details', 'Deposit', 'Confirmed'] as const

/* Build a few upcoming days */
const DAYS = Array.from({ length: 6 }).map((_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i + 1)
  return {
    key: d.toISOString().slice(0, 10),
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
    day: d.toLocaleDateString('en-US', { day: 'numeric' }),
    month: d.toLocaleDateString('en-US', { month: 'short' }),
    label: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  }
})

export function BookingFlow({ initialServiceId }: { initialServiceId?: string }) {
  const [step, setStep] = useState(initialServiceId ? 1 : 0)
  const [service, setService] = useState<Service | null>(
    SERVICES.find((s) => s.id === initialServiceId) ?? null,
  )
  const [day, setDay] = useState<(typeof DAYS)[number] | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [details, setDetails] = useState({ name: '', phone: '', email: '' })

  const canContinue =
    (step === 0 && service) ||
    (step === 1 && day && slot) ||
    (step === 2 && details.name && details.phone && details.email) ||
    step === 3

  function nextStep() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  function prevStep() {
    setStep((s) => Math.max(s - 1, 0))
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Progress */}
      <ol className="mb-10 flex items-center justify-between gap-1">
        {STEPS.map((label, i) => {
          const done = i < step
          const active = i === step
          return (
            <li key={label} className="flex flex-1 items-center gap-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    'flex size-8 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                    done && 'border-primary bg-primary text-primary-foreground',
                    active && 'border-primary bg-secondary text-primary',
                    !done && !active && 'border-border bg-card text-muted-foreground',
                  )}
                >
                  {done ? <Check className="size-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    'hidden text-xs font-medium sm:block',
                    active ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span className={cn('h-0.5 flex-1 rounded-full', done ? 'bg-primary' : 'bg-border')} />
              )}
            </li>
          )
        })}
      </ol>

      <div className="rounded-[2rem] border border-border bg-card p-5 shadow-sm sm:p-8">
        {/* Step 0: Service */}
        {step === 0 && (
          <div>
            <h2 className="font-serif text-2xl text-foreground">Choose a service</h2>
            <p className="mt-1 text-sm text-muted-foreground">Select the treatment you&apos;d like to book.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const selected = service?.id === s.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setService(s)}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors',
                      selected ? 'border-primary bg-secondary' : 'border-border hover:border-primary/50',
                    )}
                  >
                    <img
                      src={s.image || '/placeholder.svg'}
                      alt={s.name}
                      className="size-14 shrink-0 rounded-xl object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-foreground">{s.name}</span>
                      <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {s.duration} · ${s.price}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 1: Date & time */}
        {step === 1 && (
          <div>
            <h2 className="font-serif text-2xl text-foreground">Pick a date & time</h2>
            <p className="mt-1 text-sm text-muted-foreground">Available slots for {service?.name}.</p>

            <div className="mt-6">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <CalendarDays className="size-4 text-primary" /> Select a day
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {DAYS.map((d) => {
                  const selected = day?.key === d.key
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setDay(d)}
                      className={cn(
                        'flex flex-col items-center rounded-2xl border py-3 transition-colors',
                        selected ? 'border-primary bg-secondary' : 'border-border hover:border-primary/50',
                      )}
                    >
                      <span className="text-xs text-muted-foreground">{d.weekday}</span>
                      <span className="text-lg font-semibold text-foreground">{d.day}</span>
                      <span className="text-xs text-muted-foreground">{d.month}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock className="size-4 text-primary" /> Select a time
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {TIME_SLOTS.map((t) => {
                  const selected = slot === t
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={!day}
                      onClick={() => setSlot(t)}
                      className={cn(
                        'rounded-xl border py-2.5 text-sm font-medium transition-colors disabled:opacity-40',
                        selected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-foreground hover:border-primary/50',
                      )}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
              {!day && <p className="mt-2 text-xs text-muted-foreground">Please choose a day first.</p>}
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-2xl text-foreground">Your details</h2>
            <p className="mt-1 text-sm text-muted-foreground">So we can confirm and send reminders.</p>
            <div className="mt-6 space-y-4">
              {(
                [
                  { key: 'name', label: 'Full name', type: 'text', placeholder: 'Your name' },
                  { key: 'phone', label: 'Phone', type: 'tel', placeholder: '(415) 555-0123' },
                  { key: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
                ] as const
              ).map((f) => (
                <div key={f.key}>
                  <label htmlFor={f.key} className="mb-1.5 block text-sm font-medium text-foreground">
                    {f.label}
                  </label>
                  <input
                    id={f.key}
                    type={f.type}
                    value={details[f.key]}
                    onChange={(e) => setDetails({ ...details, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Deposit */}
        {step === 3 && (
          <div>
            <h2 className="font-serif text-2xl text-foreground">Confirm with a deposit</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A small ${DEPOSIT_AMOUNT} deposit holds your spot and goes toward your service.
            </p>

            <div className="mt-6 rounded-2xl bg-secondary/50 p-4">
              <SummaryRow label="Service" value={service?.name ?? ''} />
              <SummaryRow label="When" value={`${day?.label ?? ''} · ${slot ?? ''}`} />
              <SummaryRow label="Name" value={details.name} />
              <div className="my-3 border-t border-border" />
              <SummaryRow label="Service total" value={`$${service?.price ?? 0}`} />
              <SummaryRow label="Deposit due now" value={`$${DEPOSIT_AMOUNT}`} strong />
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="card" className="mb-1.5 block text-sm font-medium text-foreground">
                  Card number
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5">
                  <CreditCard className="size-4 text-muted-foreground" />
                  <input
                    id="card"
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="exp" className="mb-1.5 block text-sm font-medium text-foreground">
                    Expiry
                  </label>
                  <input
                    id="exp"
                    placeholder="MM / YY"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="mb-1.5 block text-sm font-medium text-foreground">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    placeholder="123"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 text-primary" />
                Demo only — no real card is charged.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Confirmed */}
        {step === 4 && (
          <div className="py-6 text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
              <CheckCircle2 className="size-8" />
            </span>
            <h2 className="mt-5 font-serif text-3xl text-foreground">You&apos;re booked!</h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Thanks, {details.name || 'friend'}! We&apos;ve confirmed your appointment and sent the
              details to {details.email || 'your email'}. A reminder text will arrive the day before.
            </p>
            <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-border bg-secondary/50 p-4 text-left">
              <SummaryRow label="Service" value={service?.name ?? ''} />
              <SummaryRow label="When" value={`${day?.label ?? ''} · ${slot ?? ''}`} />
              <SummaryRow label="Deposit paid" value={`$${DEPOSIT_AMOUNT}`} strong />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full" render={<Link href="/"><Home className="size-4" /> Back home</Link>} />
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                render={<Link href="/services">Browse more services</Link>}
              />
            </div>
          </div>
        )}

        {/* Nav */}
        {step < 4 && (
          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full"
              disabled={step === 0}
              onClick={prevStep}
            >
              <ArrowLeft className="size-4" /> Back
            </Button>
            <Button
              size="lg"
              className="rounded-full px-6"
              disabled={!canContinue}
              onClick={nextStep}
            >
              {step === 3 ? `Pay $${DEPOSIT_AMOUNT} & confirm` : 'Continue'}
              {step !== 3 && <ArrowRight className="size-4" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn('text-right', strong ? 'font-semibold text-foreground' : 'text-foreground')}>
        {value}
      </span>
    </div>
  )
}
