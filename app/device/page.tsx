"use client"
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Dynamically import QRCode component to avoid SSR issues
const QRCode = dynamic(() => import('qrcode.react'), { ssr: false });

export default function IoTDeviceInterface() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    address: '',
    bloodType: '',
  })
  const [age, setAge] = useState<number | null>(null)
  const [scanComplete, setScanComplete] = useState(false)
  const [websiteLink, setWebsiteLink] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'dob') {
      const birthDate = new Date(value)
      const today = new Date()
      let calculatedAge = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--
      }
      setAge(calculatedAge)
    }
  }

  const handleStartScan = () => {
    // Simulate scan process
    setTimeout(() => {
      setScanComplete(true)
      setWebsiteLink('https://iothealth.example.com/results/' + Math.random().toString(36).substring(7))
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      {!scanComplete ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-blue-600">IoT Health Scan</h1>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-700">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border-gray-300 text-gray-800"
              />
            </div>
            <div>
              <Label htmlFor="dob" className="text-gray-700">Date of Birth</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full border-gray-300 text-gray-800"
              />
              {age !== null && (
                <p className="mt-1 text-sm text-blue-600">Age: {age} years</p>
              )}
            </div>
            <div>
              <Label htmlFor="contact" className="text-gray-700">Contact Info</Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full border-gray-300 text-gray-800"
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-gray-700">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border-gray-300 text-gray-800"
              />
            </div>
            <div>
              <Label htmlFor="bloodType" className="text-gray-700">Blood Type</Label>
              <Input
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                className="w-full border-gray-300 text-gray-800"
              />
            </div>
            <Button
              onClick={handleStartScan}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Scan
            </Button>
          </form>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-6 text-blue-600">Scan Complete</h1>
          <p className="mb-4 text-gray-700">Your scan has been completed successfully.</p>
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Access your results here:</p>
            <a href={websiteLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {websiteLink}
            </a>
          </div>
          <div className="flex justify-center">
            <QRCode value={websiteLink} size={200} bgColor="#ffffff" fgColor="#000000" />
          </div>
        </div>
      )}
    </div>
  )
}
