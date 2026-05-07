"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bed } from "lucide-react"

export default function InpatientPage() {
  return (
    <div className="space-y-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <Bed className="w-12 h-12 text-sky-600" />
        <h1 className="text-3xl font-bold text-gray-800">قسم الداخلي (الإقامات)</h1>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-gray-800">قريباً...</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          سيتم إضافة مزايا قسم الداخلي قريباً.
        </CardContent>
      </Card>
    </div>
  )
}

