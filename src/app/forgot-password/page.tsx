'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const schema = z.object({
  phoneNumber: z.string().min(10, 'Enter a valid phone number'),
})

export default function ForgotPasswordPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
    router.push('/otp')
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

        {/* Forgot Password Form Card */}
        <div className="bg-card rounded-2xl px-6 py-8 sm:px-10 sm:py-12 md:px-[66px] md:py-[62px]">
          <div className="mb-8 sm:mb-12 md:mb-[62px] text-center">
            <h2 className="text-3xl sm:text-4xl md:text-[45px] font-semibold leading-tight md:leading-[45px] text-card-foreground mb-3 md:mb-[18px]">
              Forgot Password
            </h2>
            <p className="text-xl sm:text-2xl md:text-[30px] text-muted-foreground leading-tight md:leading-[39px]">
              Don&apos;t worry! It occurs. Please enter the Phone or Email linked with your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <label className="text-lg sm:text-xl md:text-[25px] font-semibold text-card-foreground leading-tight md:leading-[32.5px] block" htmlFor="phoneNumber">
                Phone Number
              </label>
              <div className="flex gap-2 md:gap-3">
                <input
                  id="countryCode"
                  type="text"
                  className="w-20 sm:w-24 md:w-32 rounded-lg md:rounded-xl border border-border bg-input px-3 md:px-4 py-3 h-14 sm:h-16 md:h-[88px] text-lg sm:text-xl md:text-[24px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-bold text-center"
                  defaultValue="+971"
                  readOnly
                />
                <input
                  id="phoneNumber"
                  type="text"
                  className="flex-1 rounded-lg md:rounded-xl border border-border bg-input px-3 md:px-4 py-3 h-14 sm:h-16 md:h-[88px] text-lg sm:text-xl md:text-[24px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="1234 5678 90"
                  {...register('phoneNumber')}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-primary h-14 sm:h-16 md:h-[80px] flex items-center justify-center transition-opacity hover:opacity-90"
            >
              <span className="text-xl sm:text-2xl md:text-[26px] font-bold leading-tight md:leading-[31.72px]">
                Continue
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}