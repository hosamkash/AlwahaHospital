"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database } from "lucide-react"

export default function BigDataPage() {
  return (
    <div className="space-y-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <Database className="w-12 h-12 text-blue-700" />
        <h1 className="text-3xl font-bold text-gray-800">تحليل البيانات الضخمة لتوقع احتياجات المستشفى</h1>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-gray-800">قريباً...</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          سيتم إضافة مزايا تحليل البيانات الضخمة قريباً.
        </CardContent>
      </Card>
    </div>
  )
}

