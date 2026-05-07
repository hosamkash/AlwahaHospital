"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi } from "lucide-react"

export default function RemoteMonitoringPage() {
  return (
    <div className="space-y-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <Wifi className="w-12 h-12 text-cyan-700" />
        <h1 className="text-3xl font-bold text-gray-800">مراقبة الحالة الصحية عن بُعد باستخدام أجهزة ذكية</h1>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-gray-800">قريباً...</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          سيتم إضافة مزايا مراقبة الحالة الصحية قريباً.
        </CardContent>
      </Card>
    </div>
  )
}

