'use client'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[726px]">
        {/* Success Card */}
        <div className="bg-card rounded-2xl px-6 py-12 sm:px-10 sm:py-16 md:px-[66px] md:py-[62px] text-center">
          {/* Success Icon */}
          <div className="mb-8 sm:mb-10 md:mb-12 flex items-center justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-[172.73px] md:h-[172.73px] bg-[#18C07A] rounded-full flex items-center justify-center">
              <svg 
                className="w-16 h-12 sm:w-20 sm:h-16 md:w-[82px] md:h-[63px]" 
                viewBox="0 0 82 63" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M79.9999 3.00001L27.9999 55L1.99994 29.0001" 
                  stroke="white" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Text Content */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-tight md:leading-[51.24px] text-card-foreground mb-2 md:mb-3">
              Password Changed!
            </h2>
            <p className="text-lg sm:text-xl md:text-[24px] text-muted-foreground leading-tight md:leading-[36px]">
              Your password has been changed successfully.
            </p>
          </div>

          {/* Back to Login Button */}
          <Link
            href="/login"
            className="w-full btn-primary h-16 sm:h-20 md:h-[96.73px] flex items-center justify-center transition-opacity hover:opacity-90"
          >
            <span className="text-2xl sm:text-3xl md:text-[32px] font-bold leading-tight md:leading-[39.04px]">
              Back to Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}