"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PriceListsFormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    startDate: "",
    active: true,
  })

  const handleSave = () => {
    console.log("Saving price list:", formData)
    router.push('/modules/03-MedicalDefinition/PriceLists/list')
  }

  const handleCancel = () => {
    router.push('/modules/03-MedicalDefinition/PriceLists/list')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">إضافة/تعديل قائمة أسعار</h2>
        <div className="flex items-center gap-2">
          <Button className="bg-primary" onClick={handleSave}>
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4 ml-2" />
            إلغاء
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تفاصيل قائمة الأسعار</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price-list-code">كود القائمة</Label>
              <Input 
                id="price-list-code" 
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="price-list-name">اسم القائمة</Label>
              <Input 
                id="price-list-name" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price-list-start-date">تاريخ البداية</Label>
              <Input 
                id="price-list-start-date" 
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="price-list-status">الحالة</Label>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="price-list-status"
                  checked={formData.active}
                  onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="price-list-status" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-4">
        <Button className="bg-primary" onClick={handleSave}>
          <Save className="w-4 h-4 ml-2" />
          حفظ
        </Button>
        <Button variant="outline" onClick={handleCancel}>
          <X className="w-4 h-4 ml-2" />
          إلغاء
        </Button>
      </div>
    </div>
  )
}

