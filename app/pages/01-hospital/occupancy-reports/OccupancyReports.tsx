"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer, Save, BarChart3 } from "lucide-react"

export default function OccupancyReports() {
  const handleButtonPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    if (target) {
      target.style.backgroundColor = "#dcfce7"
      setTimeout(() => {
        if (target && target.style) {
          target.style.backgroundColor = ""
        }
      }, 150)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">تقارير الإشغال</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-gray-50 active:bg-green-100 transition-colors bg-transparent"
            onMouseDown={handleButtonPress}
          >
            <Printer className="w-4 h-4 ml-2" />
            طباعة التقرير
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-gray-50 active:bg-green-100 transition-colors bg-transparent"
            onMouseDown={handleButtonPress}
          >
            <Save className="w-4 h-4 ml-2" />
            تصدير Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-600 mb-2">تقارير الإشغال</p>
            <p className="text-sm text-gray-500">عرض وتحليل إحصائيات إشغال المستشفى</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
