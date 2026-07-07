'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { STUDIO, SERVICES, TIME_SLOTS, DEPOSIT_AMOUNT } from '@/lib/studio-data'

type Msg = { id: number; from: 'bot' | 'user'; text: string; chips?: string[] }

type Stage = 'service' | 'date' | 'slot' | 'name' | 'done'

const DATES = ['Tomorrow', 'This Friday', 'This Saturday']

let msgId = 0
const next = () => ++msgId

function greeting(): Msg {
  return {
    id: next(),
    from: 'bot',
    text: `Hi there! I'm the ${STUDIO.name} booking assistant. I'd love to help you find a time. What are you looking to book?`,
    chips: ['Manicure', 'Haircut', 'Facial', 'Something else'],
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(true)
  const [messages, setMessages] = useState<Msg[]>([greeting()])
  const [stage, setStage] = useState<Stage>('service')
  const [draft, setDraft] = useState({ service: '', date: '', slot: '' })
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function pushBot(msgs: Omit<Msg, 'id' | 'from'>[]) {
    setTyping(true)
    window.setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, ...msgs.map((m) => ({ ...m, id: next(), from: 'bot' as const }))])
      if (!open) setUnread(true)
    }, 750)
  }

  function handleReply(text: string) {
    const clean = text.trim()
    if (!clean) return
    setMessages((prev) => [...prev, { id: next(), from: 'user', text: clean }])
    setInput('')

    if (stage === 'service') {
      const matched =
        SERVICES.find((s) => clean.toLowerCase().includes(s.category.toLowerCase()))?.category ??
        (/(mani|nail)/i.test(clean)
          ? 'a manicure'
          : /(hair|cut|color|balayage)/i.test(clean)
            ? 'a haircut'
            : /(facial|skin|wax)/i.test(clean)
              ? 'a facial'
              : clean)
      setDraft((d) => ({ ...d, service: String(matched) }))
      setStage('date')
      pushBot([
        {
          text: `Wonderful — ${String(matched)} it is! What day works best for you?`,
          chips: DATES,
        },
      ])
      return
    }

    if (stage === 'date') {
      setDraft((d) => ({ ...d, date: clean }))
      setStage('slot')
      const offered = TIME_SLOTS.slice(0, 3)
      pushBot([
        {
          text: `Great, I have a few openings ${clean.toLowerCase()}. Which time would you like?`,
          chips: offered,
        },
      ])
      return
    }

    if (stage === 'slot') {
      setDraft((d) => ({ ...d, slot: clean }))
      setStage('name')
      pushBot([{ text: `Perfect — ${clean} it is. What name should I put the appointment under?` }])
      return
    }

    if (stage === 'name') {
      setStage('done')
      pushBot([
        {
          text: `You're all set, ${clean}! I've penciled in ${draft.service} for ${draft.date.toLowerCase()} at ${draft.slot}. To confirm, we ask for a small $${DEPOSIT_AMOUNT} deposit — it goes toward your service and just helps us hold your spot.`,
          chips: ['Pay deposit & confirm', 'Ask a question'],
        },
      ])
      return
    }

    // done / free chat
    pushBot([
      {
        text: `Happy to help with that! You can always finish booking on our booking page, and our team will follow up personally. Is there anything else I can answer?`,
      },
    ])
  }

  function handleChip(chip: string) {
    if (chip === 'Pay deposit & confirm') {
      setMessages((prev) => [...prev, { id: next(), from: 'user', text: chip }])
      pushBot([
        {
          text: `Amazing — your deposit is confirmed and your appointment is booked. You'll get a text reminder the day before. We can't wait to see you! ✨`,
        },
      ])
      return
    }
    handleReply(chip)
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v)
          setUnread(false)
        }}
        aria-label={open ? 'Close chat' : 'Open booking assistant'}
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
        {unread && !open && (
          <span className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full border-2 border-background bg-gold" />
        )}
      </button>

      {/* Panel */}
      <div
        className={cn(
          'fixed bottom-24 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all duration-200',
          open ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
        )}
        style={{ height: 'min(32rem, calc(100vh - 8rem))' }}
      >
        <div className="flex items-center gap-3 bg-primary px-4 py-3.5 text-primary-foreground">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/15">
            <Sparkles className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-serif text-base font-semibold leading-tight">
              {STUDIO.name} Assistant
            </p>
            <p className="text-xs text-primary-foreground/80">Typically replies instantly</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/40 px-4 py-4">
          {messages.map((m) => (
            <div key={m.id} className={cn('flex flex-col', m.from === 'user' ? 'items-end' : 'items-start')}>
              <div
                className={cn(
                  'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  m.from === 'user'
                    ? 'rounded-br-md bg-primary text-primary-foreground'
                    : 'rounded-bl-md bg-card text-card-foreground shadow-sm',
                )}
              >
                {m.text}
              </div>
              {m.chips && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {m.chips.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleChip(c)}
                      className="rounded-full border border-primary/30 bg-background px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-sm w-fit">
              <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
              <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
              <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50" />
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleReply(input)
          }}
          className="flex items-center gap-2 border-t border-border bg-card px-3 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                e.preventDefault()
                handleReply(input)
              }
            }}
            placeholder="Type your message…"
            className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <Button type="submit" size="icon" className="size-10 rounded-full" aria-label="Send message">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </>
  )
}
