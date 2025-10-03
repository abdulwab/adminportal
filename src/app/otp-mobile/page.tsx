'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function OtpMobilePage() {
  const router = useRouter()
  const [otp, setOtp] = useState<string[]>(['', '', '', '', ''])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return

    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus()
    }
  }

  const handleSubmit = () => {
    console.log('OTP Submitted:', otp.join(''))
    router.push('/reset-password')
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

        {/* OTP Form Card */}
        <div className="bg-card rounded-2xl px-6 py-8 sm:px-10 sm:py-12 md:px-[66px] md:py-[62px]">
          <div className="mb-8 sm:mb-12 md:mb-[62px] text-center">
            <h2 className="text-3xl sm:text-4xl md:text-[45px] font-semibold leading-tight md:leading-[45px] text-card-foreground mb-3 md:mb-[18px]">
              Verify OTP
            </h2>
            <p className="text-xl sm:text-2xl md:text-[30px] text-muted-foreground leading-tight md:leading-[39px]">
              One Time Verification Code is send to{' '}
              <span className="text-foreground font-semibold">1231231231233</span>
            </p>
          </div>

          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-[100px] md:h-[100px] text-2xl sm:text-3xl md:text-[36px] text-center rounded-lg md:rounded-[16px] border border-primary bg-input text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-medium"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full btn-primary h-14 sm:h-16 md:h-[80px] flex items-center justify-center transition-opacity hover:opacity-90"
          >
            <span className="text-xl sm:text-2xl md:text-[26px] font-bold leading-tight md:leading-[31.72px]">
              Submit
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
