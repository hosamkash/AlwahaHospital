"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, X, Printer } from "lucide-react"

type HospitalRoomStatus = {
  id?: number
  code: string
  name: string
  active: boolean
}

interface HospitalRoomStatusItemProps {
  selectedStatus?: HospitalRoomStatus | null
  isNew?: boolean
  onClose: () => void
  onSave?: (status: HospitalRoomStatus) => void
}

export default function HospitalRoomStatusItem({
  selectedStatus,
  isNew,
  onClose,
  onSave,
}: HospitalRoomStatusItemProps) {
  const [formData, setFormData] = useState<HospitalRoomStatus>(
    selectedStatus || { code: "", name: "", active: true }
  )

  const handleSave = () => {
    if (!formData.code || !formData.name) {
      alert("يرجى إدخال الكود والاسم")
      return
    }
    onSave?.(formData)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
        <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {isNew ? "إضافة حالة غرفة" : "إضافة/تعديل حالة غرفة"}
          </h2>
          <div className="flex items-center gap-2">
            <Button className="bg-primary" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
          <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 ml-2" />
              إغلاق
            </Button>
        </div>
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل حالة الغرفة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status-code">كود الحالة</Label>
              <Input 
                id="status-code" 
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="status-name">اسم الحالة</Label>
              <Input 
                id="status-name" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1" 
              />
            </div>
          </div>

            <div>
            <Label htmlFor="status-active">الحالة</Label>
            <div className="mt-1 flex items-center">
              <input
                type="checkbox"
                id="status-active"
                checked={formData.active}
                onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
              />
              <label htmlFor="status-active" className="mr-2 text-sm font-medium text-gray-700">
                نشط
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

        {/* Footer Action Buttons */}
      <div className="flex items-center justify-center gap-4">
          <Button className="bg-primary" onClick={handleSave}>
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
        <Button variant="outline">
            <Printer className="w-4 h-4 ml-2" />
            طباعة
          </Button>
        <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 ml-2" />
            إغلاق
          </Button>
        </div>
      </div>
  )
}
