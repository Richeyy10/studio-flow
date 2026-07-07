'use client'

import { useState } from 'react'
import { PhoneMissed, Bot, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { STUDIO } from '@/lib/studio-data'

type Bubble = { id: number; from: 'studio' | 'customer' | 'system'; text: string }

const SCRIPT: Omit<Bubble, 'id'>[] = [
  { from: 'system', text: 'Missed call from (628) 555-9910 · 42 min ago' },
  {
    from: 'studio',
    text: `Hi! Sorry we missed your call, this is ${STUDIO.name}. Are you looking to book an appointment or have a question? Reply here anytime.`,
  },
  { from: 'customer', text: 'Hi! Yes, do you have any openings for a manicure this week?' },
  {
    from: 'studio',
    text: 'Absolutely! We have Thursday at 1:30 PM or Saturday at 11:00 AM. Would either of those work?',
  },
  { from: 'customer', text: 'Thursday at 1:30 is perfect 😊' },
  {
    from: 'studio',
    text: 'Wonderful! I can hold that for you. We ask for a small $20 deposit to confirm — I\u2019ll text you a secure link now. See you Thursday!',
  },
]

let bid = 0

export function MissedCallSim() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [running, setRunning] = useState(false)

  function play() {
    setBubbles([])
    setRunning(true)
    SCRIPT.forEach((b, i) => {
      window.setTimeout(() => {
        setBubbles((prev) => [...prev, { ...b, id: ++bid }])
        if (i === SCRIPT.length - 1) setRunning(false)
      }, i * 1100)
    })
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 font-serif text-xl text-foreground">
            <PhoneMissed className="size-5 text-primary" />
            Missed-call text-back
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Never lose a lead. When a call goes unanswered, StudioFlow texts back instantly.
          </p>
        </div>
        <Button
          size="sm"
          variant={bubbles.length ? 'outline' : 'default'}
          className="shrink-0 rounded-full"
          disabled={running}
          onClick={play}
        >
          {bubbles.length ? <RotateCcw className="size-4" /> : null}
          {bubbles.length ? 'Replay' : 'Simulate missed call'}
        </Button>
      </div>

      <div className="mt-5 min-h-64 space-y-3 rounded-2xl bg-muted/40 p-4">
        {bubbles.length === 0 && (
          <p className="flex h-56 items-center justify-center px-6 text-center text-sm text-muted-foreground">
            Press &ldquo;Simulate missed call&rdquo; to watch the automated conversation unfold.
          </p>
        )}
        {bubbles.map((b) =>
          b.from === 'system' ? (
            <p key={b.id} className="text-center text-xs font-medium text-muted-foreground">
              {b.text}
            </p>
          ) : (
            <div
              key={b.id}
              className={cn('flex', b.from === 'customer' ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  b.from === 'customer'
                    ? 'rounded-br-md bg-primary text-primary-foreground'
                    : 'rounded-bl-md bg-card text-card-foreground shadow-sm',
                )}
              >
                {b.from === 'studio' && (
                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-primary">
                    <Bot className="size-3.5" /> {STUDIO.name} (auto)
                  </span>
                )}
                {b.text}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
