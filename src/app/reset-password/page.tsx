'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const schema = z.object({
  password: z.string()
    .min(8, 'Must be at least 8 characters')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain one special character'),
  confirmPassword: z.string().min(8, 'Must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export default function ResetPasswordPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const password = watch('password', '')
  
  // Password validation checks
  const hasMinLength = password.length >= 8
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  function onSubmit(values: z.infer<typeof schema>) {
    console.log('New password:', values.password)
    router.push('/success')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[726px]">
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-12 md:mb-[70px]">
          <Image
            src="/logo.png"
            alt="Logo"
            width={300}
            height={118}
            className="mx-auto w-[200px] h-auto sm:w-[250px] md:w-[300px]"
            priority
          />
        </div>

        {/* Reset Password Form Card */}
        <div className="bg-card rounded-2xl px-6 py-8 sm:px-10 sm:py-12 md:px-[66px] md:py-[62px]">
          <div className="mb-8 sm:mb-12 md:mb-[62px] text-center">
            <h2 className="text-3xl sm:text-4xl md:text-[45px] font-semibold leading-tight md:leading-[45px] text-card-foreground mb-3 md:mb-[18px]">
              Set New Password
            </h2>
            <p className="text-xl sm:text-2xl md:text-[30px] text-muted-foreground leading-tight md:leading-[39px]">
              Your new password must be different to previously used Password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
            {/* New Password Field */}
            <div className="space-y-2 md:space-y-3">
              <label className="text-lg sm:text-xl md:text-[25px] font-semibold text-card-foreground leading-tight md:leading-[32.5px] block" htmlFor="password">
                New Password<span className="text-[#F20000]">*</span>
              </label>
              <input
                id="password"
                type="password"
                className="w-full h-14 sm:h-16 md:h-[88px] rounded-xl bg-[rgb(43,37,74)] px-4 text-lg sm:text-xl md:text-[24px] leading-tight md:leading-[24px] font-medium text-foreground placeholder:text-foreground focus:outline-none focus:ring-2 focus:ring-ring border-0"
                placeholder="Create a password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2 md:space-y-3">
              <label className="text-lg sm:text-xl md:text-[25px] font-semibold text-card-foreground leading-tight md:leading-[32.5px] block" htmlFor="confirmPassword">
                Confirm Password<span className="text-[#F20000]">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full h-14 sm:h-16 md:h-[88px] rounded-xl bg-[rgb(43,37,74)] px-4 text-lg sm:text-xl md:text-[24px] leading-tight md:leading-[24px] font-medium text-foreground placeholder:text-foreground focus:outline-none focus:ring-2 focus:ring-ring border-0"
                placeholder="Create a password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="space-y-3">
              {/* Min Length Check */}
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded flex items-center justify-center ${hasMinLength ? 'btn-primary' : 'bg-[rgb(43,37,74)]'}`}>
                  {hasMinLength && (
                    <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 0.5L2 4L0.5 2.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-sm sm:text-base md:text-[18px] font-medium text-foreground leading-tight md:leading-[21.96px]">
                  Must be at list 8 chractes
                </span>
              </div>

              {/* Special Character Check */}
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded flex items-center justify-center ${hasSpecialChar ? 'btn-primary' : 'bg-[rgb(43,37,74)]'}`}>
                  {hasSpecialChar && (
                    <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 0.5L2 4L0.5 2.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-sm sm:text-base md:text-[18px] font-medium text-foreground leading-tight md:leading-[21.96px]">
                  Must contain one special character
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary h-14 sm:h-16 md:h-[80px] flex items-center justify-center transition-opacity hover:opacity-90 mt-6 md:mt-8"
            >
              <span className="text-xl sm:text-2xl md:text-[26px] font-bold leading-tight md:leading-[31.72px]">
                Submit
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}