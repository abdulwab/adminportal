'use client'
import { useState, useRef, KeyboardEvent } from 'react'
import Image from 'next/image'

export default function OtpPage() {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(0, 1)
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Move to next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 500))
    setIsSubmitting(false)
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
        
        {/* OTP Card */}
        <div className="bg-card rounded-2xl px-[118px] py-[67px]">
          <div className="text-center mb-[41px]">
            <h2 className="text-[45px] font-semibold leading-[45px] text-foreground mb-[28px]">Verify OTP</h2>
            <p className="text-[30px] leading-[39px] text-[rgb(139,133,174)]">
              One Time Verification Code is send<br />
              to <span className="font-semibold text-foreground">+971 123 4567 8900</span>
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-[72px]">
            {/* OTP Input Boxes */}
            <div className="flex gap-5 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-[100px] h-[100px] rounded-2xl bg-[rgb(43,37,74)] text-[36px] leading-[36px] font-medium text-[rgb(16,206,204)] text-center focus:outline-none focus:ring-2 focus:ring-[rgb(16,206,204)] border border-[rgb(16,206,204)]"
                  placeholder="0"
                />
              ))}
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting || otp.some(d => !d)}
              className="w-full btn-primary h-[80px] flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <span className="text-[26px] font-bold leading-[31.72px]">
                {isSubmitting ? 'Verifying…' : 'Submit'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
