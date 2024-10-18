"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User, FileText, UserMinus, Pill, MapPin, Activity, ExternalLink } from 'lucide-react'

// Previous mock data remains the same...
const mockScanResults = {
  isIll: true,
  possibleAilments: ['Common Cold', 'Influenza', 'COVID-19'],
}

const profileData = {
  name: "John Doe",
  dob: "1990-05-15",
  contact: "+1 (555) 123-4567",
  address: "123 Health St, Medical City, MC 12345",
  previousAilments: [
    "Seasonal Allergies (2018)",
    "Fractured Wrist (2015)",
    "Appendicitis (2010)"
  ]
}

const doctorData = {
  name: "Dr. Jane Smith",
  specialization: "General Practitioner",
  contact: "+1 (555) 987-6543",
  hospital: "City General Hospital"
}

const prescriptionData = {
  date: "2023-06-15",
  doctorName: "Dr. Jane Smith",
  patientName: "John Doe",
  content: `Rx

1. Amoxicillin 500mg
Take 1 capsule by mouth 3 times daily for 7 days

2. Ibuprofen 400mg
Take 1 tablet by mouth every 6 hours as needed for pain

3. Loratadine 10mg
Take 1 tablet by mouth once daily for allergies

Follow up in 10 days if symptoms persist.

- Dr. Jane Smith`
}

const medicationsData = [
  { name: "Amoxicillin 500mg", schedule: "3 times daily", instructions: "Take with or without food" },
  { name: "Ibuprofen 400mg", schedule: "Every 6 hours as needed", instructions: "Take with food" },
  { name: "Loratadine 10mg", schedule: "Once daily", instructions: "Take in the morning" }
]

// New mock data for medical stores
const storesData = [
  { name: "HealthMart Pharmacy", address: "456 Wellness Ave, Medical City, MC 12345", price: 45.99, mapLink: "https://maps.google.com/?q=HealthMart+Pharmacy" },
  { name: "CureAll Drugstore", address: "789 Remedy Rd, Medical City, MC 12345", price: 42.50, mapLink: "https://maps.google.com/?q=CureAll+Drugstore" },
  { name: "QuickRx Pharmacy", address: "101 Fast Lane, Medical City, MC 12345", price: 47.25, mapLink: "https://maps.google.com/?q=QuickRx+Pharmacy" },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('scanResults')

  const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const openMap = (url) => {
    window.open(url, '_blank')
  }

  const renderContent = () => {
    switch (activeTab) {
      // Previous cases remain the same...
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-900">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-semibold">Name</Label>
                <p>{profileData.name}</p>
              </div>
              <div>
                <Label className="font-semibold">Age</Label>
                <p>{calculateAge(profileData.dob)} years old</p>
              </div>
              <div>
                <Label className="font-semibold">Contact Information</Label>
                <p>{profileData.contact}</p>
              </div>
              <div>
                <Label className="font-semibold">Address</Label>
                <p>{profileData.address}</p>
              </div>
              <div>
                <Label className="font-semibold">History of Previous Ailments</Label>
                <ul className="list-disc pl-5">
                  {profileData.previousAilments.map((ailment, index) => (
                    <li key={index}>{ailment}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )
      case 'scanResults':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Scan Results</CardTitle>
              <CardDescription>Your latest health scan results</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Health Status: <span className={mockScanResults.isIll ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
                  {mockScanResults.isIll ? "Potentially Ill" : "Healthy"}
                </span>
              </p>
              {mockScanResults.isIll && (
                <>
                  <p className="mb-2 font-semibold">Possible Ailments:</p>
                  <ul className="list-disc pl-5 mb-4">
                    {mockScanResults.possibleAilments.map((ailment, index) => (
                      <li key={index}>{ailment}</li>
                    ))}
                  </ul>
                  <div className="space-y-2">
                    <p className="text-red-500 font-bold">Please visit the nearest doctor.</p>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      Connect to Online Doctor
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )
      case 'prescribedDoctor':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-900">Prescribed Doctor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-semibold">Name</Label>
                <p>{doctorData.name}</p>
              </div>
              <div>
                <Label className="font-semibold">Specialization</Label>
                <p>{doctorData.specialization}</p>
              </div>
              <div>
                <Label className="font-semibold">Contact Information</Label>
                <p>{doctorData.contact}</p>
              </div>
              <div>
                <Label className="font-semibold">Hospital</Label>
                <p>{doctorData.hospital}</p>
              </div>
            </CardContent>
          </Card>
        )
      case 'prescription':
        return (
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#034c81]">Prescription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p><strong>Date:</strong> {prescriptionData.date}</p>
                <p><strong>Doctor:</strong> {prescriptionData.doctorName}</p>
                <p><strong>Patient:</strong> {prescriptionData.patientName}</p>
                <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-4 rounded">
                  {prescriptionData.content}
                </pre>
              </div>
            </CardContent>
          </Card>
        )
      case 'medsAndSchedule':
        return (
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#034c81]">Medications and Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Instructions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicationsData.map((med, index) => (
                    <TableRow key={index}>
                      <TableCell>{med.name}</TableCell>
                      <TableCell>{med.schedule}</TableCell>
                      <TableCell>{med.instructions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      case 'nearestMedicalStore':
        return (
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#034c81]">Nearest Medical Stores</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Map</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {storesData.map((store, index) => (
                    <TableRow key={index}>
                      <TableCell>{store.name}</TableCell>
                      <TableCell>{store.address}</TableCell>
                      <TableCell>${store.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => openMap(store.mapLink)}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open in Maps
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="mt-4 text-sm text-gray-500">
                * Prices are estimates for all prescribed medications. Actual prices may vary.
              </p>
            </CardContent>
          </Card>
        )
      default:
        return <div>Select a tab</div>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Navigation Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarImage src="/placeholder.svg" alt="Profile Picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold text-center text-blue-900 mb-4">John Doe</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <nav className="space-y-2 p-2">
            <Button
              variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('profile')}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button
              variant={activeTab === 'scanResults' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('scanResults')}
            >
              <Activity className="mr-2 h-4 w-4" />
              Scan Results
            </Button>
            <Button
              variant={activeTab === 'prescribedDoctor' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('prescribedDoctor')}
            >
              <UserMinus className="mr-2 h-4 w-4" />
              Prescribed Doctor
            </Button>
            <Button
              variant={activeTab === 'prescription' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('prescription')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Prescription
            </Button>
            <Button
              variant={activeTab === 'medsAndSchedule' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('medsAndSchedule')}
            >
              <Pill className="mr-2 h-4 w-4" />
              Meds and Schedule
            </Button>
            <Button
              variant={activeTab === 'nearestMedicalStore' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('nearestMedicalStore')}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Nearest Medical Store
            </Button>
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}