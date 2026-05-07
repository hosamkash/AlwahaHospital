"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"

export default function RemoteConsultationPage() {
  return (
    <div className="space-y-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <Video className="w-12 h-12 text-violet-700" />
        <h1 className="text-3xl font-bold text-gray-800">خدمة الاستشارات الطبية عن بُعد</h1>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-gray-800">قريباً...</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          سيتم إضافة مزايا خدمة الاستشارات الطبية عن بُعد قريباً.
        </CardContent>
      </Card>
    </div>
  )
}

