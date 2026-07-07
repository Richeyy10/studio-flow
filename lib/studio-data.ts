export const STUDIO = {
  name: 'StudioFlow',
  tagline: 'Book your next appointment in seconds',
  phone: '(415) 555-0192',
  email: 'hello@studioflow.beauty',
  address: '218 Rosewood Avenue, Suite 4, San Francisco, CA 94110',
  hours: [
    { day: 'Monday', time: 'Closed' },
    { day: 'Tuesday', time: '9:00 AM – 7:00 PM' },
    { day: 'Wednesday', time: '9:00 AM – 7:00 PM' },
    { day: 'Thursday', time: '9:00 AM – 8:00 PM' },
    { day: 'Friday', time: '9:00 AM – 8:00 PM' },
    { day: 'Saturday', time: '8:00 AM – 6:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 4:00 PM' },
  ],
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'TikTok', href: '#' },
    { label: 'Pinterest', href: '#' },
  ],
}

export type ServiceCategory = 'Hair' | 'Nails' | 'Skincare'

export type Service = {
  id: string
  name: string
  category: ServiceCategory
  description: string
  duration: string
  price: number
  image: string
}

export const SERVICES: Service[] = [
  {
    id: 'signature-cut',
    name: 'Signature Cut & Style',
    category: 'Hair',
    description: 'A personalized cut and blow-dry tailored to your face shape and lifestyle.',
    duration: '60 min',
    price: 85,
    image: '/images/service-haircut.png',
  },
  {
    id: 'balayage-color',
    name: 'Balayage & Color',
    category: 'Hair',
    description: 'Hand-painted, sun-kissed dimension for a soft, lived-in finish.',
    duration: '150 min',
    price: 210,
    image: '/images/service-color.png',
  },
  {
    id: 'protective-braiding',
    name: 'Protective Braiding',
    category: 'Hair',
    description: 'Intricate, scalp-friendly braided styles built to last for weeks.',
    duration: '180 min',
    price: 160,
    image: '/images/service-braiding.png',
  },
  {
    id: 'luxe-manicure',
    name: 'Luxe Manicure',
    category: 'Nails',
    description: 'Shaping, cuticle care, and a flawless gel or classic polish finish.',
    duration: '45 min',
    price: 48,
    image: '/images/service-manicure.png',
  },
  {
    id: 'spa-pedicure',
    name: 'Spa Pedicure',
    category: 'Nails',
    description: 'A soothing soak, exfoliation, and massage with a polished finish.',
    duration: '60 min',
    price: 65,
    image: '/images/service-pedicure.png',
  },
  {
    id: 'lash-brow',
    name: 'Lash & Brow Design',
    category: 'Nails',
    description: 'Custom lash extensions and brow shaping to frame your eyes.',
    duration: '90 min',
    price: 120,
    image: '/images/service-lash.png',
  },
  {
    id: 'glow-facial',
    name: 'Signature Glow Facial',
    category: 'Skincare',
    description: 'A deep-cleansing, hydrating facial customized to your skin goals.',
    duration: '75 min',
    price: 135,
    image: '/images/service-facial.png',
  },
  {
    id: 'smooth-waxing',
    name: 'Smooth Waxing',
    category: 'Skincare',
    description: 'Gentle, precise waxing for silky-smooth, cared-for skin.',
    duration: '30 min',
    price: 42,
    image: '/images/service-waxing.png',
  },
]

export const CATEGORIES: { label: ServiceCategory; blurb: string }[] = [
  { label: 'Hair', blurb: 'Cuts, color, and braiding by expert stylists.' },
  { label: 'Nails', blurb: 'Manicures, pedicures, and lash & brow artistry.' },
  { label: 'Skincare', blurb: 'Facials and waxing for a healthy, radiant glow.' },
]

export const TESTIMONIALS = [
  {
    name: 'Maya R.',
    service: 'Balayage & Color',
    image: '/images/client-1.png',
    quote:
      'I booked in under a minute and got a reminder text the day before. My color has never looked better — I already rebooked!',
  },
  {
    name: 'Priya S.',
    service: 'Signature Glow Facial',
    image: '/images/client-2.png',
    quote:
      'The whole experience felt so personal and calm. My skin is glowing and the online booking made it effortless.',
  },
  {
    name: 'Deborah L.',
    service: 'Luxe Manicure',
    image: '/images/client-3.png',
    quote:
      'They texted me right back when I missed them on a call. Warm, professional, and my nails lasted three weeks!',
  },
]

/* ---------- Owner dashboard mock data ---------- */

export type Lead = {
  id: string
  name: string
  phone: string
  source: string
  message: string
  time: string
  status: 'New' | 'Replied' | 'Booked'
}

export const LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Jasmine Carter',
    phone: '(415) 555-2287',
    source: 'Missed call',
    message: 'Looking for a balayage before my sister’s wedding.',
    time: '8 min ago',
    status: 'Replied',
  },
  {
    id: 'l2',
    name: 'Unknown Caller',
    phone: '(628) 555-9910',
    source: 'Missed call',
    message: '—',
    time: '42 min ago',
    status: 'New',
  },
  {
    id: 'l3',
    name: 'Renée Adams',
    phone: '(415) 555-7741',
    source: 'Website chat',
    message: 'Any lash fill openings this week?',
    time: '2 hrs ago',
    status: 'Booked',
  },
]

export type Booking = {
  id: string
  client: string
  service: string
  date: string
  time: string
  deposit: 'Paid' | 'Pending'
  amount: number
}

export const BOOKINGS: Booking[] = [
  {
    id: 'b1',
    client: 'Maya Robinson',
    service: 'Balayage & Color',
    date: 'Thu, Jul 9',
    time: '10:00 AM',
    deposit: 'Paid',
    amount: 20,
  },
  {
    id: 'b2',
    client: 'Sophie Nguyen',
    service: 'Luxe Manicure',
    date: 'Thu, Jul 9',
    time: '1:30 PM',
    deposit: 'Paid',
    amount: 20,
  },
  {
    id: 'b3',
    client: 'Alexis Turner',
    service: 'Signature Glow Facial',
    date: 'Fri, Jul 10',
    time: '3:00 PM',
    deposit: 'Pending',
    amount: 20,
  },
  {
    id: 'b4',
    client: 'Bianca Flores',
    service: 'Signature Cut & Style',
    date: 'Sat, Jul 11',
    time: '11:00 AM',
    deposit: 'Paid',
    amount: 20,
  },
]

export type CompletedVisit = {
  id: string
  client: string
  service: string
  date: string
  reviewRequested: boolean
}

export const COMPLETED_VISITS: CompletedVisit[] = [
  { id: 'c1', client: 'Priya Shah', service: 'Signature Glow Facial', date: 'Jul 5', reviewRequested: true },
  { id: 'c2', client: 'Deborah Lang', service: 'Luxe Manicure', date: 'Jul 5', reviewRequested: false },
  { id: 'c3', client: 'Tara Osei', service: 'Protective Braiding', date: 'Jul 4', reviewRequested: false },
]

export const TIME_SLOTS = ['9:30 AM', '11:00 AM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM']

export const DEPOSIT_AMOUNT = 20
