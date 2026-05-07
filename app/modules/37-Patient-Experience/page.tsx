"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus } from "lucide-react"

export default function PatientExperiencePage() {
  return (
    <div className="space-y-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <UserPlus className="w-12 h-12 text-rose-700" />
        <h1 className="text-3xl font-bold text-gray-800">نظام إدارة تجربة المريض الشخصية</h1>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-gray-800">قريباً...</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          سيتم إضافة مزايا إدارة تجربة المريض قريباً.
        </CardContent>
      </Card>
    </div>
  )
}

