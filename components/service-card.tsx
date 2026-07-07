import Link from 'next/link'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Service } from '@/lib/studio-data'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image || '/placeholder.svg'}
          alt={service.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary">
          {service.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl text-foreground">{service.name}</h3>
          <span className="shrink-0 font-serif text-xl text-primary">${service.price}</span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-4 text-primary" />
          {service.duration}
        </div>
        <Button
          size="lg"
          className="mt-4 w-full rounded-full"
          render={<Link href={`/booking?service=${service.id}`}>Book this service</Link>}
        />
      </div>
    </article>
  )
}
