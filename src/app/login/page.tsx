'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { login } from '../../store/slices/authSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'At least 6 characters'),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const auth = useAppSelector((s) => s.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    const res = await dispatch(login(values))
    if ((res as any).type.endsWith('/fulfilled')) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex bg-muted items-center justify-center p-10">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to continue to Admin Portal</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">Login</h2>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <input id="email" type="email" className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@example.com" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">Password</label>
              <input id="password" type="password" className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••" {...register('password')} />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            {auth.error && (
              <p className="text-sm text-destructive">{auth.error}</p>
            )}
            <button
              type="submit"
              disabled={auth.status === 'loading'}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:opacity-90 disabled:opacity-50"
            >
              {auth.status === 'loading' ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <div className="mt-4 text-sm text-muted-foreground">
            <span>Don&apos;t have an account? </span>
            <Link className="text-primary underline-offset-2 hover:underline" href="#">Contact admin</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


