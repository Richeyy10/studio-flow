import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const callStatus = formData.get('CallStatus') as string
  const fromNumber = formData.get('From') as string

  // Only fire the text-back if the call was missed
  const missedStatuses = ['no-answer', 'busy', 'failed']

  if (missedStatuses.includes(callStatus)) {
    try {
      await client.messages.create({
        body:
          "Hi! Sorry we missed your call — this is Bright Studio. " +
          "Are you looking to book an appointment or have a question? " +
          "Reply here anytime and we'll help you right away.",
        from: process.env.TWILIO_PHONE_NUMBER,
        to: fromNumber,
      })

      // TODO: also save this lead to your database/dashboard here
      console.log(`Missed call text sent to ${fromNumber}`)
    } catch (err) {
      console.error('Failed to send missed-call text:', err)
    }
  }

  // Twilio expects a valid response, even an empty one
  return new NextResponse('<Response></Response>', {
    headers: { 'Content-Type': 'text/xml' },
  })
}