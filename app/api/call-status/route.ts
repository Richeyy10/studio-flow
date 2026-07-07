import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const dialCallStatus = formData.get('DialCallStatus') as string
  const fromNumber = formData.get('From') as string

  const missedStatuses = ['no-answer', 'busy', 'failed']

  if (missedStatuses.includes(dialCallStatus)) {
    try {
      await client.messages.create({
        body:
          "Hi! Sorry we missed your call — this is Bright Studio. " +
          "Are you looking to book an appointment or have a question? " +
          "Reply here anytime and we'll help you right away.",
        from: process.env.TWILIO_PHONE_NUMBER,
        to: fromNumber,
      })
      console.log(`Missed call text sent to ${fromNumber}`)
    } catch (err) {
      console.error('Failed to send missed-call text:', err)
    }
  }

  return new NextResponse('<Response></Response>', {
    headers: { 'Content-Type': 'text/xml' },
  })
}