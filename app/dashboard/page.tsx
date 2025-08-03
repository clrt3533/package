import { redirect } from 'next/navigation'

// Force dynamic rendering for authentication-protected pages
export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  redirect('/dashboard/overview')
}