import { NextRequest, NextResponse } from 'next/server'

// This is the number the call forwards to (the studio owner's real phone)
const OWNER_PHONE_NUMBER = process.env.OWNER_PHONE_NUMBER || '+1XXXXXXXXXX'

export async function POST(req: NextRequest) {
  // Build the URL for the status callback (must be a public URL, e.g. your Vercel deployment)
  const statusCallbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/call-status`

  const twiml = `
    <Response>
      <Dial timeout="20" action="${statusCallbackUrl}">
        ${OWNER_PHONE_NUMBER}
      </Dial>
    </Response>
  `

  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' },
  })
}