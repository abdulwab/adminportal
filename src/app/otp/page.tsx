'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OtpPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to OTP email by default
    router.push('/otp-email')
  }, [router])

  return null
}