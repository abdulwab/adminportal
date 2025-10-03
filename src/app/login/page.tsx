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
      <div className="w-full max-w-[726px]">
        {/* Logo */}
        <div className="text-center mb-[70px]">
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
        <div className="bg-card rounded-2xl px-[66px] py-[62px]">
          <div className="text-center mb-[62px]">
            <h2 className="text-[45px] font-semibold leading-[45px] text-foreground mb-[18px]">Login</h2>
            <p className="text-[26px] leading-[33.8px] text-[rgb(139,133,174)]">
              Your camels, your stats, your glory await inside.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Email Field */}
            <div className="space-y-3">
              <label className="text-[25px] font-semibold leading-[32.5px] text-foreground block" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input 
                  id="email" 
                  type="email" 
                  className="w-full h-[88px] rounded-xl bg-[rgb(43,37,74)] px-4 text-[30px] leading-[30px] font-medium text-foreground placeholder:text-[rgb(111,123,145)] focus:outline-none focus:ring-2 focus:ring-ring border-0"
                  placeholder="adrianhalim@email.com" 
                  {...register('email')} 
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            {/* Password Field */}
            <div className="space-y-3">
              <label className="text-[25px] font-semibold leading-[32.5px] text-foreground block" htmlFor="password">
                Password
              </label>
              <input 
                id="password" 
                type="password" 
                className="w-full h-[88px] rounded-xl bg-[rgb(43,37,74)] px-4 text-[30px] leading-[30px] font-medium text-foreground placeholder:text-[rgb(111,123,145)] focus:outline-none focus:ring-2 focus:ring-ring border-0"
                placeholder="••••••••" 
                {...register('password')} 
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
              <div className="text-right pt-[14px]">
                <Link 
                  className="text-[20px] font-semibold leading-[26px] text-[rgb(111,123,145)] hover:text-foreground transition-colors" 
                  href="/forgot-password"
                >
                  Forget Password ?
                </Link>
              </div>
            </div>
            
            {auth.error && (
              <p className="text-sm text-destructive">{auth.error}</p>
            )}
            
            {/* Login Button */}
            <button
              type="submit"
              disabled={auth.status === 'loading'}
              className="w-full btn-primary h-[80px] flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <span className="text-[26px] font-bold leading-[31.72px]">
                {auth.status === 'loading' ? 'Signing in…' : 'Login'}
              </span>
            </button>
          </form>
          
          {/* Or Login With Section */}
          <div className="mt-[31px]">
            <p className="text-[20px] font-semibold leading-[24.4px] text-foreground text-center mb-6">
              Or Login with
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-[rgb(43,37,74)] rounded-xl text-foreground hover:bg-opacity-80 transition-colors">
                Google
              </button>
              <button className="px-6 py-3 bg-[rgb(43,37,74)] rounded-xl text-foreground hover:bg-opacity-80 transition-colors">
                Phone Number
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
