'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Image from 'next/image'

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
        
        {/* Forgot Password Card */}
        <div className="bg-card rounded-2xl px-[66px] py-[67px]">
          <div className="text-center mb-[47px]">
            <h2 className="text-[45px] font-semibold leading-[45px] text-foreground mb-[23px]">Forgot Password</h2>
            <p className="text-[30px] leading-[39px] text-[rgb(139,133,174)]">
              Don&apos;t worry! It occurs.<br />
              Please enter the Phone or Email<br />
              linked with your account.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
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
                  placeholder="adrianhalim@gmail.com" 
                  {...register('email')} 
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            
            {/* Continue Button */}
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full btn-primary h-[80px] flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <span className="text-[26px] font-bold leading-[31.72px]">
                {isSubmitting ? 'Sending…' : 'Continue'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
