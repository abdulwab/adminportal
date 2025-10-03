'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
})

type FormValues = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Forgot password</h2>
          <p className="text-muted-foreground">We will send you an OTP to reset your password</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input id="email" type="email" className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:opacity-90 disabled:opacity-50">
            {isSubmitting ? 'Sending…' : 'Send OTP'}
          </button>
        </form>
        <div className="mt-4 text-sm">
          <Link href="/login" className="text-primary underline-offset-2 hover:underline">Back to login</Link>
        </div>
      </div>
    </div>
  )
}


