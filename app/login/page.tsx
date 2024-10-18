"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
 
export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
 
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // This is a mock check. In a real app, you'd verify this against your backend.
    if (phoneNumber !== '1234567890') {
      setError('This number is not registered.')
    } else {
      setError('')
      // Proceed with login
      console.log('Logging in...')
    }
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
          <h1 className="text-3xl font-bold text-[#034c81] mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border-[#7f858c] focus:border-[#2ca3fa]"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">
                {error} 
                <Link href="/signup" className="text-[#2ca3fa] hover:underline ml-1">
                  Sign up here.
                </Link>
              </p>
            )}
            <Button type="submit" className="w-full bg-[#2ca3fa] hover:bg-[#5ba2f4] text-white">
              Login
            </Button>
          </form>
          <p className="mt-4 text-center text-[#7f858c]">
            Don't have an account? 
            <Link href="/signup" className="text-[#2ca3fa] hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
