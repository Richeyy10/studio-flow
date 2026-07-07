import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { BookingFlow } from '@/components/booking-flow'

export const metadata: Metadata = {
  title: 'Book an Appointment — StudioFlow',
  description: 'Book your next hair, nail, or skincare appointment at StudioFlow in just a few taps.',
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>
}) {
  const { service } = await searchParams
  return (
    <div>
      <PageHero
        eyebrow="Booking"
        title="Book your appointment"
        subtitle="Choose a service, pick a time, and confirm with a small deposit — all in under a minute."
      />
      <BookingFlow initialServiceId={service} />
    </div>
  )
}
