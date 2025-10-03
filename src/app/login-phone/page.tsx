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
  countryCode: z.string().min(1, 'Required'),
  phoneNumber: z.string().min(10, 'Enter a valid phone number'),
  password: z.string().min(6, 'At least 6 characters'),
})

type FormValues = z.infer<typeof schema>

export default function LoginPhonePage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const auth = useAppSelector((s) => s.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      countryCode: '+971'
    }
  })

  const onSubmit = async (values: FormValues) => {
    try {
      // Convert phone to email format for mock auth
      await dispatch(login({ 
        email: `${values.phoneNumber}@phone.mock`, 
        password: values.password 
      })).unwrap()
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
            {/* Phone Number Field */}
            <div className="space-y-3">
              <label className="text-[25px] font-semibold leading-[32.5px] text-foreground block">
                Phone Number
              </label>
              <div className="flex gap-3">
                {/* Country Code Input */}
                <input 
                  type="text" 
                  className="w-[129px] h-[88px] rounded-xl bg-[rgb(43,37,74)] px-4 text-[24px] leading-[24px] font-bold text-foreground text-center focus:outline-none focus:ring-2 focus:ring-ring border-0"
                  {...register('countryCode')} 
                />
                {/* Phone Number Input */}
                <input 
                  type="tel" 
                  className="flex-1 h-[88px] rounded-xl bg-[rgb(43,37,74)] px-4 text-[24px] leading-[24px] font-medium text-foreground placeholder:text-foreground focus:outline-none focus:ring-2 focus:ring-ring border-0"
                  placeholder="1234 5678 90" 
                  {...register('phoneNumber')} 
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
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
              <div className="text-right pt-[12px]">
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
              <button 
                type="button"
                onClick={() => router.push('/login')}
                className="px-6 py-3 bg-[rgb(43,37,74)] rounded-xl text-foreground hover:bg-opacity-80 transition-colors"
              >
                Email
              </button>
              <button 
                type="button"
                className="px-6 py-3 bg-[rgb(43,37,74)] rounded-xl text-foreground hover:bg-opacity-80 transition-colors"
              >
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

