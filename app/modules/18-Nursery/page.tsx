"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Baby } from "lucide-react"

export default function NurseryPage() {
  return (
    <div className="space-y-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <Baby className="w-12 h-12 text-pink-600" />
        <h1 className="text-3xl font-bold text-gray-800">قسم الحضانة</h1>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-gray-800">قريباً...</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          سيتم إضافة مزايا قسم الحضانة قريباً.
        </CardContent>
      </Card>
    </div>
  )
}

