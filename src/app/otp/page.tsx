'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

const schema = z.object({
  code: z.string().min(4, 'Enter the code sent to you'),
})

type FormValues = z.infer<typeof schema>

export default function OtpPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Enter OTP</h2>
          <p className="text-muted-foreground">We have sent a code to your email</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="code">OTP Code</label>
            <input id="code" inputMode="numeric" className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="123456" {...register('code')} />
            {errors.code && <p className="text-sm text-destructive">{errors.code.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:opacity-90 disabled:opacity-50">
            {isSubmitting ? 'Verifying…' : 'Verify'}
          </button>
        </form>
        <div className="mt-4 text-sm">
          <Link href="/forgot-password" className="text-primary underline-offset-2 hover:underline">Resend OTP</Link>
        </div>
      </div>
    </div>
  )
}


