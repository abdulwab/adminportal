import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-[726px]">
        {/* Success Card */}
        <div className="bg-card rounded-2xl px-[78px] py-[110px]">
          <div className="text-center space-y-[51.36px]">
            {/* Green Checkmark Icon */}
            <div className="mx-auto w-[172.73px] h-[172.73px] rounded-full bg-[rgb(24,192,122)] flex items-center justify-center">
              <svg width="81.14" height="62.96" viewBox="0 0 82 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 34.0588L26.1176 57.9626L79 3" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Text Content */}
            <div className="space-y-[16px]">
              <h2 className="text-[42px] font-bold leading-[51.24px] text-foreground">
                Password Changed!
              </h2>
              <p className="text-[24px] leading-[36px] text-[rgb(152,162,179)]">
                Your password has been changed successfully.
              </p>
            </div>
            
            {/* Back to Login Button */}
            <Link 
              href="/login"
              className="w-full btn-primary h-[96.73px] flex items-center justify-center transition-opacity hover:opacity-90"
            >
              <span className="text-[32px] font-bold leading-[39.04px]">
                Back to Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
