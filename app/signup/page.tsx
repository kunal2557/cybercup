"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
 
export default function SignupPage() {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [signupComplete, setSignupComplete] = useState(false)
 
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send an OTP to the provided phone number here
    console.log('Sending OTP...')
    setOtpSent(true)
  }
 
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd verify the OTP and complete the signup process here
    console.log('Signing up...')
    setSignupComplete(true)
  }
 
  if (signupComplete) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#034c81] mb-4">Welcome aboard!</h1>
          <p className="text-[#7f858c] mb-4">You have successfully signed up.</p>
          <Link href="/login">
            <Button className="bg-[#2ca3fa] hover:bg-[#5ba2f4] text-white">
              Proceed to Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }
 
  return (
    <div className="flex h-screen bg-white">
      <div className="hidden lg:flex lg:w-1/2 bg-[#034c81] items-center justify-center">
        <img 
          src="/placeholder.svg?height=400&width=400" 
          alt="IoT Health" 
          className="max-w-md rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <h1 className="text-3xl font-bold text-[#034c81] mb-6">Sign Up</h1>
          <form onSubmit={otpSent ? handleSignup : handleSendOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-[#7f858c] focus:border-[#2ca3fa]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border-[#7f858c] focus:border-[#2ca3fa]"
                required
              />
            </div>
            {otpSent && (
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input 
                  id="otp"
                  type="text"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border-[#7f858c] focus:border-[#2ca3fa]"
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full bg-[#2ca3fa] hover:bg-[#5ba2f4] text-white">
              {otpSent ? 'Verify OTP' : 'Send OTP'}
            </Button>
          </form>
          <p className="mt-4 text-center text-[#7f858c]">
            Already have an account? 
            <Link href="/login" className="text-[#2ca3fa] hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}