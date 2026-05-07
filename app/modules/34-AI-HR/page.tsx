"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function AIHRPage() {
  return (
    <div className="space-y-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <Users className="w-12 h-12 text-teal-700" />
        <h1 className="text-3xl font-bold text-gray-800">إدارة الموارد البشرية بالذكاء الاصطناعي</h1>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-gray-800">قريباً...</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          سيتم إضافة مزايا إدارة الموارد البشرية بالذكاء الاصطناعي قريباً.
        </CardContent>
      </Card>
    </div>
  )
}

