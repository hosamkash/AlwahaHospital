"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function WasteManagementPage() {
  return (
    <div className="space-y-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <AlertTriangle className="w-12 h-12 text-yellow-600" />
        <h1 className="text-3xl font-bold text-gray-800">قسم النفايات والإدارة الصحة</h1>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-gray-800">قريباً...</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          سيتم إضافة مزايا قسم النفايات والإدارة الصحة قريباً.
        </CardContent>
      </Card>
    </div>
  )
}

