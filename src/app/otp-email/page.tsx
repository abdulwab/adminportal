'use client'
import Link from 'next/link'

export default function OtpEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm text-center space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Check your email</h2>
        <p className="text-muted-foreground">We sent a verification code to your email address.</p>
        <Link href="/otp" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:opacity-90">Enter Code</Link>
      </div>
    </div>
  )
}


