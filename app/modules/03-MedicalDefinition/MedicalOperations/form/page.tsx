"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MedicalOperationsFormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    active: true,
  })

  const handleSave = () => {
    console.log("Saving medical operation:", formData)
    router.push('/modules/03-MedicalDefinition/MedicalOperations/list')
  }

  const handleCancel = () => {
    router.push('/modules/03-MedicalDefinition/MedicalOperations/list')
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">إضافة/تعديل عملية طبية</h2>
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

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل العملية الطبية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="operation-code">كود العملية</Label>
              <Input 
                id="operation-code" 
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="operation-name">اسم العملية</Label>
              <Input 
                id="operation-name" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="operation-price">السعر</Label>
              <Input 
                id="operation-price" 
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="operation-status">الحالة</Label>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="operation-status"
                  checked={formData.active}
                  onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="operation-status" className="mr-2 text-sm font-medium text-gray-700">
                  نشط
                </label>
              </div>
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
        <Button variant="outline" onClick={handleCancel}>
          <X className="w-4 h-4 ml-2" />
          إلغاء
        </Button>
      </div>
    </div>
  )
}

