'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { login } from '../../store/slices/authSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
    try {
      await dispatch(login(values)).unwrap()
      router.push('/dashboard')
    } catch {
      // error state is handled in the slice and rendered below
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <Image
            src="/logo.png"
            alt="Logo"
            width={300}
            height={118}
            className="mx-auto"
            priority
          />
        </div>
        
        {/* Login Form Card */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-card-foreground">Login</h2>
            <p className="text-muted-foreground mt-2">Enter your credentials to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground" htmlFor="email">Email</label>
              <input 
                id="email" 
                type="email" 
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="you@example.com" 
                {...register('email')} 
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground" htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="••••••••" 
                {...register('password')} 
              />
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
              className="w-full btn-primary h-20 flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {auth.status === 'loading' ? 'Signing in…' : 'Login'}
            </button>
          </form>
          
          <div className="mt-6 text-right">
            <Link 
              className="text-muted-foreground text-lg font-semibold hover:text-foreground transition-colors" 
              href="/forgot-password"
            >
              Forgot Password ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


